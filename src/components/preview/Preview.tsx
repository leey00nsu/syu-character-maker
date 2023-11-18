import Konva from "konva";
import { useEffect, useRef } from "react";
import { Layer, Rect, Stage, Transformer } from "react-konva";
import { useRecoilState } from "recoil";
import {
  bgColorState,
  drawingObjectCountState,
  drawingObjectState,
  menuState,
  modeState,
  penState,
  selectedIdState,
} from "../../store/store";
import DrawDrawingObjects from "./DrawDrawingObjects";

interface PreviewProps {
  stageRef: any;
}

const Preview = (props: PreviewProps) => {
  const [drawingObjectCount, setDrawingObjectCount] = useRecoilState(
    drawingObjectCountState
  );
  const [selectedId, setSelectedId] = useRecoilState(selectedIdState);
  const [drawingObjects, setDrawingObjects] =
    useRecoilState(drawingObjectState);
  const [pen, setPen] = useRecoilState(penState);
  const [menu, setMenu] = useRecoilState(menuState);
  const [mode, setMode] = useRecoilState(modeState);
  const [bgColor, setBgColor] = useRecoilState(bgColorState);

  const layerRef = useRef<any>();
  const selectRef = useRef<any>();
  const trRef = useRef<any>();
  const drawRef = useRef(false);

  // 브라우저의 모든 부분에서 마우스 움직임을 감지하기 위하여 따로 할당
  useEffect(() => {
    const startHandler = (e: MouseEvent) => {
      startSelection(e);
    };
    const endHandler = (e: MouseEvent) => {
      endSelection(e);
    };
    const touchMoveHandler = (e: TouchEvent) => {
      startSelection(e);
    };
    const touchEndHandler = (e: TouchEvent) => {
      endSelection(e);
    };
    document.addEventListener("mousemove", startHandler);
    document.addEventListener("mouseup", endHandler);
    document.addEventListener("touchmove", touchMoveHandler);
    document.addEventListener("touchend", touchEndHandler);

    return () => {
      document.removeEventListener("mousemove", startHandler);
      document.removeEventListener("mouseup", endHandler);
      document.removeEventListener("touchmove", touchMoveHandler);
      document.removeEventListener("touchend", touchEndHandler);
    };
  }, [drawingObjects, mode]);

  // 한 번 클릭했을 때
  const clickHandler = (e: any) => {
    // 저장 메뉴에서는 클릭을 무시 (transformer가 저장되지 않도록 하기 위함)
    if (menu === "저장") {
      return;
    }
    // move mode일 때
    if (mode === "move") {
      const clickedOnEmpty = e.target.getId() === "background";

      // 배경을 클릭하고 있을 때
      if (clickedOnEmpty) {
        setSelectedId([]);

        const pos = props.stageRef.current.getPointerPosition();

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
          ["lines", "images"].includes(e.target.getName()) &&
          !selectedId.includes(e.target.getId())
        ) {
          setSelectedId([e.target.getId()]);
        }
      }
    }
    if (mode === "draw") {
      // draw mode일 때
      drawRef.current = true;

      // 현재 마우스의 위치를 받아옴
      const pos = props.stageRef.current.getPointerPosition();

      // 현재 마우스의 위치를 받아와서 객체를 생성
      setDrawingObjects((prev) => [
        ...prev,
        {
          type: "line",
          size: pen.size,
          color: pen.color,
          points: [pos.x, pos.y, pos.x + 0.0001, pos.y], // 점을 찍을 때 표시가 안될때가 있어 임의로 0.0001을 더해줌
          id: `선 ${drawingObjectCount}`,
          z: drawingObjectCount,
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          skewX: 0,
          skewY: 0,
          opacity: 1,
          rotation: 0,
        },
      ]);
      setDrawingObjectCount((prev) => prev + 1);
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
    if (mode === "move") {
      if (!selectRef.current.visible()) {
        return;
      }

      const canvas = document.getElementsByTagName("canvas");
      const rel_x = e.clientX - canvas[0].getBoundingClientRect().x;
      const rel_y = e.clientY - canvas[0].getBoundingClientRect().y;

      selectRef.current.attrs.x2 = rel_x;
      selectRef.current.attrs.y2 = rel_y;
      updateSelection();
    }

    if (mode === "draw") {
      if (!drawRef.current) {
        return;
      }

      const canvas = document.getElementsByTagName("canvas");
      const rel_x = e.clientX - canvas[0].getBoundingClientRect().x;
      const rel_y = e.clientY - canvas[0].getBoundingClientRect().y;

      // 마지막 선의 포인트를 추가합니다.
      const newObjects = drawingObjects.map((object, index) => {
        if (index === drawingObjects.length - 1) {
          return {
            ...object,
            points: [...object.points, rel_x, rel_y],
          };
        }
        return object;
      });

      setDrawingObjects(newObjects);
    }
  };

  // 드래그가 끝났을 때
  const endSelection = (e: any) => {
    if (mode === "move") {
      if (!selectRef.current.visible()) {
        return;
      }

      selectRef.current.visible(false);

      let selected_shapes = props.stageRef.current.find(".images");
      let selected_lines = props.stageRef.current.find(".lines");

      let contents = [...selected_shapes, ...selected_lines];

      let box = selectRef.current.getClientRect();

      let selected = contents.filter((shape: any) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
      );

      let selectedId = selected.map((child: any) => child.attrs.id);

      setSelectedId(selectedId);
    }

    if (mode === "draw") {
      drawRef.current = false;
    }
  };

  // selectedId가 변경될 때마다 현재 선택된 요소를 Transformer에게 전달하여 표시
  useEffect(() => {
    if (selectedId) {
      let selectedNodes = layerRef.current.children.filter((child: any) =>
        selectedId.includes(child.attrs.id)
      );

      trRef.current?.nodes(selectedNodes);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [selectedId]);

  // mode가 변경될 때마다 selectedId를 초기화
  useEffect(() => {
    if (mode === "draw") {
      setSelectedId([]);
    }
  }, [mode]);

  // menu가 변경될 때마다 selectedId를 초기화
  useEffect(() => {
    if (menu === "저장") {
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
    <div className="border border-base-300 rounded-2xl p-1">
      <div className="flex flex-col w-[600px] h-[600px] justify-center  ">
        {/* <button onClick={() => console.log(objects)}>button</button> */}
        <Stage
          ref={props.stageRef}
          width={600}
          height={600}
          onMouseDown={clickHandler}
          onTouchStart={clickHandler}
        >
          <Layer>
            <Rect
              name="background"
              key="background"
              z={-999}
              x={0}
              y={0}
              width={600}
              height={600}
              fill={bgColor}
              id="background"
            />
          </Layer>
          <Layer ref={layerRef}>
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
            {!selectedId.includes("background") && (
              <Transformer shouldOverdrawWholeArea ref={trRef} />
            )}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Preview;
