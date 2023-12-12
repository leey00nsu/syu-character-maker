import Konva from 'konva';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Layer, Rect, Stage, Transformer } from 'react-konva';
import { useRecoilState } from 'recoil';
import useUpdateHistory from '@/hooks/useHistoryControll';
import useObjectControll from '@/hooks/useObjectControll';
import {
  bgColorState,
  drawingObjectState,
  menuState,
  modeState,
  penState,
  selectedIdState,
} from '@/store/store';
import DrawDrawingObjects from '@/components/preview/DrawDrawingObjects';

interface PreviewProps {
  stageRef: MutableRefObject<Konva.Stage | null>;
}

const Preview = ({ stageRef }: PreviewProps) => {
  // 모바일일 때 크기와 데스크탑일 때 크기를 다르게 설정하여 렌더링
  const MOBILE_WIDTH = 350;
  const DESKTOP_WIDTH = 600;
  const MOBILE_SCALE = MOBILE_WIDTH / DESKTOP_WIDTH;

  const [selectedId, setSelectedId] = useRecoilState(selectedIdState);
  const [drawingObjects, setDrawingObjects] =
    useRecoilState(drawingObjectState);
  const [pen, setPen] = useRecoilState(penState);
  const [menu, setMenu] = useRecoilState(menuState);
  const [mode, setMode] = useRecoilState(modeState);
  const [bgColor, setBgColor] = useRecoilState(bgColorState);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  const layerRef = useRef<any>();
  const selectRef = useRef<any>();
  const trRef = useRef<any>();
  const drawRef = useRef(false);

  const { updateHistory } = useUpdateHistory();
  const { addLine, updateLine } = useObjectControll();

  // 브라우저의 모든 부분에서 마우스 움직임을 감지하기 위하여 따로 할당
  useEffect(() => {
    document.addEventListener('mousemove', startSelection);
    document.addEventListener('mouseup', endSelection);
    document.addEventListener('touchmove', startSelection);
    document.addEventListener('touchend', endSelection);
    window.addEventListener('resize', () =>
      setIsMobile(window.innerWidth < 640),
    );

    return () => {
      document.removeEventListener('mousemove', startSelection);
      document.removeEventListener('mouseup', endSelection);
      document.removeEventListener('touchmove', startSelection);
      document.removeEventListener('touchend', endSelection);
      window.removeEventListener('resize', () =>
        setIsMobile(window.innerWidth < 640),
      );
    };
  }, [drawingObjects, mode, window.innerWidth]);

  // 한 번 클릭했을 때
  const clickHandler = (e: any) => {
    // 저장 메뉴에서는 클릭을 무시 (transformer가 저장되지 않도록 하기 위함)
    if (menu === '저장') {
      return;
    }
    // move mode일 때
    if (mode === 'move') {
      const clickedOnEmpty = e.target.getId() === 'background';

      // 배경을 클릭하고 있을 때
      if (clickedOnEmpty) {
        setSelectedId([]);

        const pos = stageRef?.current?.getPointerPosition()!;

        // 모바일일 때는 스케일을 고려하여 좌표를 변경
        if (isMobile) {
          pos.x = pos.x / MOBILE_SCALE;
          pos.y = pos.y / MOBILE_SCALE;
        }

        selectRef.current.setAttrs({
          x1: pos.x,
          y1: pos.y,
          x2: pos.x,
          y2: pos.y,
        });

        selectRef.current.visible(true);

        selectRef.current.width(0);
        selectRef.current.height(0);
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
      // draw mode일 때
      drawRef.current = true;

      // 현재 마우스의 위치를 받아옴
      const pos = stageRef?.current?.getPointerPosition()!;

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
    selectRef.current.setAttrs({
      visible: selectRef.current.visible(),
      x: Math.min(selectRef.current.attrs.x1, selectRef.current.attrs.x2),
      y: Math.min(selectRef.current.attrs.y1, selectRef.current.attrs.y2),
      width: Math.abs(selectRef.current.attrs.x1 - selectRef.current.attrs.x2),
      height: Math.abs(selectRef.current.attrs.y1 - selectRef.current.attrs.y2),
    });
    selectRef.current.getLayer().batchDraw();
  };

  // 드래그 할 때
  const startSelection = (e: any) => {
    if (mode === 'move') {
      if (!selectRef.current.visible()) {
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

      selectRef.current.attrs.x2 = rel_x;
      selectRef.current.attrs.y2 = rel_y;
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

  // 드래그가 끝났을 때
  const endSelection = (e: any) => {
    if (mode === 'move') {
      // 배경을 클릭했을 때
      if (!selectRef.current.visible()) {
        return;
      }

      selectRef.current.visible(false);

      let selected_shapes = stageRef?.current?.find('.images')!;
      let selected_lines = stageRef?.current?.find('.lines')!;

      let contents = [...selected_shapes, ...selected_lines];

      let box = selectRef.current.getClientRect();

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
    if (selectedId) {
      let selectedNodes = layerRef.current.children.filter((child: any) =>
        selectedId.includes(child.attrs.id),
      );

      trRef.current?.nodes(selectedNodes);
      trRef.current?.getLayer()?.batchDraw();
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
    stageRef?.current?.batchDraw();
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

  return (
    <div className="overflow-hidden rounded-2xl border border-base-300">
      <div className="flex h-[350px] w-[350px] justify-center sm:h-[600px] sm:w-[600px]">
        <Stage
          ref={stageRef}
          className="h-full w-full"
          width={600}
          height={600}
          // width={isMobile ? MOBILE_WIDTH : DESKTOP_WIDTH}
          // height={isMobile ? MOBILE_WIDTH : DESKTOP_WIDTH}
          onMouseDown={clickHandler}
          onTouchStart={clickHandler}
          scale={
            isMobile ? { x: MOBILE_SCALE, y: MOBILE_SCALE } : { x: 1, y: 1 }
          }
        >
          <Layer
          // scale={
          //   isMobile ? { x: MOBILE_SCALE, y: MOBILE_SCALE } : { x: 1, y: 1 }
          // }
          >
            <Rect
              name="background"
              key="background"
              z={-999}
              x={0}
              y={0}
              width={600}
              height={600}
              fill={bgColor.hex}
              opacity={bgColor.alpha}
              id="background"
            />
          </Layer>

          <Layer
            ref={layerRef}
            // scale={
            //   isMobile ? { x: MOBILE_SCALE, y: MOBILE_SCALE } : { x: 1, y: 1 }
            // }
          >
            <DrawDrawingObjects
              drawingObjects={drawingObjects}
              objectSelectHandler={objectSelectHandler}
            />
            <Rect
              ref={selectRef}
              id="selection"
              fill="rgba(0,0,245,0.2)"
              visible={false}
            />
            {!selectedId.includes('background') && (
              <Transformer shouldOverdrawWholeArea ref={trRef} />
            )}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Preview;
