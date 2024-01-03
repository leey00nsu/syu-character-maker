import Konva from 'konva';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useEventListener } from 'usehooks-ts';

import { useCanvasStore } from '@/store/canvasStore';

import {
  IMMUTABLE_OBJECTS,
  MOBILE_MIN_WIDTH,
  MUTABLE_OBJECTS,
} from '@/features/canvas/constants/canvas';
import useUpdateHistory from '@/features/canvas/hooks/useHistoryControll';
import useObjectControll from '@/features/canvas/hooks/useObjectControll';

interface UseCanvasProps {
  stageRef: RefObject<Konva.Stage>;
  layerRef: RefObject<Konva.Layer>;
  selectBoxRef: RefObject<Konva.Rect>;
  transformerRef: RefObject<Konva.Transformer>;
}

const useCanvas = ({
  stageRef,
  layerRef,
  selectBoxRef,
  transformerRef,
}: UseCanvasProps) => {
  const selectedObjectIds = useCanvasStore(state => state.selectedObjectIds);
  const setSelectedObjectIds = useCanvasStore(
    state => state.setSelectedObjectIds,
  );
  const canvasObjects = useCanvasStore(state => state.canvasObjects);
  const penSize = useCanvasStore(state => state.penSize);
  const penColor = useCanvasStore(state => state.penColor);
  const mode = useCanvasStore(state => state.mode);

  const setCanvasRef = useCanvasStore(state => state.setCanvasRef);

  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= MOBILE_MIN_WIDTH,
  );

  const drawRef = useRef(false);

  const { updateHistory } = useUpdateHistory();
  const { addLine, updateLine } = useObjectControll();

  // stageRef, layerRef, selectBoxRef, transformerRef를 canvasRef에 저장
  // 이를 통해 다른 컴포넌트에서도 커스텀 훅 접근 가능
  useEffect(() => {
    setCanvasRef({
      stageRef: stageRef,
      layerRef: layerRef,
      selectBoxRef: selectBoxRef,
      transformerRef: transformerRef,
    });
  }, []);

  // 한 번 클릭
  const clickHandler = (e: any) => {
    if (!selectBoxRef.current) return;
    if (!stageRef.current) return;

    if (mode === 'move') {
      // 움직일 수 없는 오브젝트를 클릭했을 때
      const clickedOnEmpty = IMMUTABLE_OBJECTS.includes(e.target.getName());

      if (clickedOnEmpty) {
        setSelectedObjectIds([]);

        const pos = stageRef.current.getRelativePointerPosition();

        selectBoxRef.current.setAttrs({
          x1: pos.x,
          y1: pos.y,
          x2: pos.x,
          y2: pos.y,
        });

        selectBoxRef.current.visible(true);
        selectBoxRef.current.width(0);
        selectBoxRef.current.height(0);

        updateSelection();
      } else {
        const isSelectable = MUTABLE_OBJECTS.includes(e.target.getName());
        const isSelected = selectedObjectIds.includes(e.target.getId());

        // 클릭한 대상이 선, 그림이고 , 현재 선택된 요소에 포함되어 있지 않을 때 해당 요소를 선택
        if (isSelectable && !isSelected) {
          setSelectedObjectIds([e.target.getId()]);
        }
      }
    }
    if (mode === 'draw') {
      drawRef.current = true;

      // 현재 마우스의 위치를 받아옴
      const pos = stageRef.current.getRelativePointerPosition();

      addLine({
        size: penSize,
        color: penColor.hex,
        opacity: penColor.alpha,
        points: [pos.x, pos.y, pos.x, pos.y],
      });
    }
  };

  // 드래그
  const dragHandler = (e: any) => {
    if (!stageRef.current) return;
    if (!selectBoxRef.current) return;

    if (mode === 'move') {
      if (!selectBoxRef.current.visible()) {
        return;
      }

      // 현재 마우스의 위치를 받아옴
      let pos = stageRef.current.getRelativePointerPosition();

      // getRelativePointerPosition로 캔버스 바깥 값을 구할 수 없을 때 직접 구함 : 데스크탑에서 캔버스 바깥으로 드래그할 때
      if (e.clientX) {
        const layer = stageRef.current.container();
        const transform = stageRef.current.getAbsoluteTransform().copy();
        transform.invert();
        const pos2 = layer.getBoundingClientRect();

        pos = transform.point({
          x: e.clientX - pos2.x,
          y: e.clientY - pos2.y,
        });
      }

      selectBoxRef.current.attrs.x2 = pos.x;
      selectBoxRef.current.attrs.y2 = pos.y;

      updateSelection();
    }

    if (mode === 'draw') {
      if (!drawRef.current) {
        return;
      }

      // 현재 마우스의 위치를 받아옴
      let pos = stageRef.current.getRelativePointerPosition();

      // getRelativePointerPosition로 캔버스 바깥 값을 구할 수 없을 때 직접 구함 : 데스크탑에서 캔버스 바깥으로 드래그할 때
      if (e.clientX) {
        const layer = stageRef.current.container();
        const transform = stageRef.current.getAbsoluteTransform().copy();
        transform.invert();
        const pos2 = layer.getBoundingClientRect();

        pos = transform.point({
          x: e.clientX - pos2.x,
          y: e.clientY - pos2.y,
        });
      }

      updateLine(pos.x, pos.y);
    }
  };

  // 드래그 한 부분
  const updateSelection = () => {
    if (!selectBoxRef.current) return;

    selectBoxRef.current.setAttrs({
      x: Math.min(selectBoxRef.current.attrs.x1, selectBoxRef.current.attrs.x2),
      y: Math.min(selectBoxRef.current.attrs.y1, selectBoxRef.current.attrs.y2),
      width: Math.abs(
        selectBoxRef.current.attrs.x1 - selectBoxRef.current.attrs.x2,
      ),
      height: Math.abs(
        selectBoxRef.current.attrs.y1 - selectBoxRef.current.attrs.y2,
      ),
    });

    selectBoxRef.current.getLayer()?.batchDraw();
  };

  // 드래그 종료
  const dragEndHandler = (e: any) => {
    if (!selectBoxRef.current) return;
    if (!stageRef.current) return;

    if (mode === 'move') {
      // 배경을 클릭했을 때
      if (!selectBoxRef.current.visible()) {
        return;
      }

      selectBoxRef.current.visible(false);

      let selectedImages = stageRef.current.find('.image')!;
      let selectedLines = stageRef.current.find('.line')!;

      let contents = [...selectedImages, ...selectedLines];

      let box = selectBoxRef.current.getClientRect();

      let selected = contents.filter((shape: any) =>
        Konva.Util.haveIntersection(box, shape.getClientRect()),
      );

      let selectedObjectIds = selected.map(child => child.attrs.id);

      setSelectedObjectIds(selectedObjectIds);
    }

    if (mode === 'draw') {
      if (!drawRef.current) return;

      drawRef.current = false;
      updateHistory(canvasObjects);
    }
  };

  // selectedObjectIds가 변경될 때마다 현재 선택된 요소를 Transformer에게 전달하여 표시
  useEffect(() => {
    if (!stageRef.current) return;
    if (!transformerRef.current) return;

    if (selectedObjectIds) {
      const selectedLines = stageRef.current.find('.line');
      const selectedImages = stageRef.current.find('.image');
      const selectedNodes = [...selectedLines, ...selectedImages].filter(
        child =>
          selectedObjectIds.includes(child.attrs.id) &&
          MUTABLE_OBJECTS.includes(child.attrs.name),
      );

      transformerRef.current.nodes(selectedNodes);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedObjectIds]);

  // mode가 변경될 때마다 selectedObjectIds를 초기화
  useEffect(() => {
    if (mode === 'draw') {
      setSelectedObjectIds([]);
    }
  }, [mode]);

  // 화면 크기 변경시 stage를 다시 렌더링
  useEffect(() => {
    if (!stageRef.current) return;

    stageRef.current.batchDraw();
  }, [isMobile]);

  // 오브젝트가 드래그 되거나 선택되면 , selectedObjectIds에 추가
  const objectSelectHandler = (objectId: string) => {
    if (!selectedObjectIds.includes(objectId)) {
      setSelectedObjectIds([objectId]);
    }
  };

  useEventListener('mousemove', dragHandler);
  useEventListener('mouseup', dragEndHandler);
  useEventListener('touchmove', dragHandler);
  useEventListener('touchend', dragEndHandler);
  useEventListener('resize', () =>
    setIsMobile(window.innerWidth < MOBILE_MIN_WIDTH),
  );

  return {
    clickHandler,
    objectSelectHandler,
    isMobile,
  };
};

export default useCanvas;
