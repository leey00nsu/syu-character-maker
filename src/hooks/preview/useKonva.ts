import {
  MOBILE_SCALE,
  MOBILE_MIN_WIDTH,
} from '@/components/preview/constants/canvas';
import useUpdateHistory from '@/hooks/useHistoryControll';
import useObjectControll from '@/hooks/useObjectControll';
import {
  drawingObjectState,
  menuState,
  modeState,
  penState,
  selectedIdState,
} from '@/store/store';
import Konva from 'konva';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

interface UseKonvaProps {
  stageRef: RefObject<Konva.Stage>;
  layerRef: RefObject<Konva.Layer>;
  selectBoxRef: RefObject<Konva.Rect>;
  transformerRef: RefObject<Konva.Transformer>;
}

const useKonva = ({
  stageRef,
  layerRef,
  selectBoxRef,
  transformerRef,
}: UseKonvaProps) => {
  const [selectedId, setSelectedId] = useRecoilState(selectedIdState);
  const [drawingObjects, setDrawingObjects] =
    useRecoilState(drawingObjectState);
  const [pen, setPen] = useRecoilState(penState);
  const [menu, setMenu] = useRecoilState(menuState);
  const [mode, setMode] = useRecoilState(modeState);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= MOBILE_MIN_WIDTH,
  );

  const drawRef = useRef(false);

  const { updateHistory } = useUpdateHistory();
  const { addLine, updateLine } = useObjectControll();

  // 브라우저의 모든 부분에서 마우스 움직임을 감지하기 위하여 따로 할당
  useEffect(() => {
    document.addEventListener('mousemove', dragHandler);
    document.addEventListener('mouseup', dragEndHandler);
    document.addEventListener('touchmove', dragHandler);
    document.addEventListener('touchend', dragEndHandler);
    window.addEventListener('resize', () =>
      setIsMobile(window.innerWidth < MOBILE_MIN_WIDTH),
    );

    return () => {
      document.removeEventListener('mousemove', dragHandler);
      document.removeEventListener('mouseup', dragEndHandler);
      document.removeEventListener('touchmove', dragHandler);
      document.removeEventListener('touchend', dragEndHandler);
      window.removeEventListener('resize', () =>
        setIsMobile(window.innerWidth < MOBILE_MIN_WIDTH),
      );
    };
  }, [drawingObjects, mode, window.innerWidth]);

  // 한 번 클릭
  const clickHandler = (e: any) => {
    if (!selectBoxRef.current) return;
    if (!stageRef.current) return;

    // 저장 메뉴에서는 클릭을 무시 (transformer가 저장되지 않도록 하기 위함)
    if (menu === '저장') {
      return;
    }
    if (mode === 'move') {
      // 배경 또는 캐릭터를 클릭했을 때
      const clickedOnEmpty = ['background', 'character'].includes(
        e.target.getId(),
      );

      if (clickedOnEmpty) {
        setSelectedId([]);

        const pos = stageRef.current.getPointerPosition()!;

        // 모바일일 때는 스케일을 고려하여 좌표를 변경
        if (isMobile) {
          pos.x = pos.x / MOBILE_SCALE;
          pos.y = pos.y / MOBILE_SCALE;
        }

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
        // 클릭한 대상이 선, 그림이고 , 현재 선택된 요소에 포함되어 있지 않을 때 해당 요소를 선택
        if (
          ['lines', 'images'].includes(e.target.getName()) &&
          !selectedId.includes(e.target.getId())
        ) {
          setSelectedId([e.target.getId()]);
        }
      }
    }
    if (mode === 'draw') {
      drawRef.current = true;

      // 현재 마우스의 위치를 받아옴
      const pos = stageRef.current.getPointerPosition()!;

      if (isMobile) {
        pos.x = pos.x / MOBILE_SCALE;
        pos.y = pos.y / MOBILE_SCALE;
      }

      addLine({
        size: pen.size,
        color: pen.hex,
        opacity: pen.alpha,
        points: [pos.x, pos.y, pos.x + 0.0001, pos.y], // 점을 찍을 때 표시가 안될때가 있어 임의로 0.0001을 더해줌
      });
    }
  };

  // 드래그 한 부분
  const updateSelection = () => {
    if (!selectBoxRef.current) return;

    selectBoxRef.current.setAttrs({
      visible: selectBoxRef.current.visible(),
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

  // 드래그
  const dragHandler = (e: any) => {
    if (!selectBoxRef.current) return;

    if (mode === 'move') {
      if (!selectBoxRef.current.visible()) {
        return;
      }

      const canvas = document.getElementsByTagName('canvas');

      let rel_x = 0;
      let rel_y = 0;

      if (e.type === 'mousemove') {
        rel_x = e.clientX - canvas[0].getBoundingClientRect().x;
        rel_y = e.clientY - canvas[0].getBoundingClientRect().y;
      }

      if (e.type === 'touchmove') {
        rel_x = e.touches[0].clientX - canvas[0].getBoundingClientRect().x;
        rel_y = e.touches[0].clientY - canvas[0].getBoundingClientRect().y;
      }

      if (isMobile) {
        rel_x = rel_x / MOBILE_SCALE;
        rel_y = rel_y / MOBILE_SCALE;
      }

      selectBoxRef.current.attrs.x2 = rel_x;
      selectBoxRef.current.attrs.y2 = rel_y;
      updateSelection();
    }

    if (mode === 'draw') {
      if (!drawRef.current) {
        return;
      }

      const canvas = document.getElementsByTagName('canvas');

      let rel_x = 0;
      let rel_y = 0;

      if (e.type === 'mousemove') {
        rel_x = e.clientX - canvas[0].getBoundingClientRect().x;
        rel_y = e.clientY - canvas[0].getBoundingClientRect().y;
      }

      if (e.type === 'touchmove') {
        rel_x = e.touches[0].clientX - canvas[0].getBoundingClientRect().x;
        rel_y = e.touches[0].clientY - canvas[0].getBoundingClientRect().y;
      }

      if (isMobile) {
        rel_x = rel_x / MOBILE_SCALE;
        rel_y = rel_y / MOBILE_SCALE;
      }

      updateLine(rel_x, rel_y);
    }
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

      let selectedImages = stageRef.current.find('.images')!;
      let selectedLines = stageRef.current.find('.lines')!;

      let contents = [...selectedImages, ...selectedLines];

      let box = selectBoxRef.current.getClientRect();

      let selected = contents.filter((shape: any) =>
        Konva.Util.haveIntersection(box, shape.getClientRect()),
      );

      let selectedId = selected.map((child: any) => child.attrs.id);

      setSelectedId(selectedId);
    }

    if (mode === 'draw') {
      if (!drawRef.current) return;
      drawRef.current = false;
      updateHistory(drawingObjects);
    }
  };

  // selectedId가 변경될 때마다 현재 선택된 요소를 Transformer에게 전달하여 표시
  useEffect(() => {
    if (!layerRef.current) return;
    if (!transformerRef.current) return;

    if (selectedId) {
      let selectedNodes = layerRef.current.children!.filter((child: any) =>
        selectedId.includes(child.attrs.id),
      );

      transformerRef.current.nodes(selectedNodes);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedId]);

  // mode가 변경될 때마다 selectedId를 초기화
  useEffect(() => {
    if (mode === 'draw') {
      setSelectedId([]);
    }
  }, [mode]);

  // 화면 크기 변경시 stage를 다시 렌더링
  useEffect(() => {
    if (!stageRef.current) return;

    stageRef.current.batchDraw();
  }, [isMobile]);

  // menu가 변경될 때마다 selectedId를 초기화
  useEffect(() => {
    if (menu === '저장') {
      setSelectedId([]);
    }
  }, [menu]);

  // 오브젝트가 드래그 되거나 선택되면 , selectedId에 추가
  const objectSelectHandler = (objectId: string) => {
    if (!selectedId.includes(objectId)) {
      setSelectedId([objectId]);
    }
  };

  return {
    clickHandler,
    dragHandler,
    dragEndHandler,
    objectSelectHandler,
    isMobile,
  };
};

export default useKonva;
