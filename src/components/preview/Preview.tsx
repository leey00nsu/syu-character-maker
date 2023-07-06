import { Line, Stage, Layer, Rect, Image, Transformer } from "react-konva";
import { useRef, useEffect, useState } from "react";
import Konva from "konva";
import {
  bgColorState,
  modeState,
  menuState,
  bgState,
  penState,
  itemState,
  objectState,
  selectedIdState,
  objectCountState,
} from "../../store/store";
import { useRecoilState } from "recoil";
import useImage from "use-image";
import UseImage from "./UseImage";
import UseItem from "./UseItem";

interface PreviewProps {
  stageRef: any;
}

const Preview = (props: PreviewProps) => {
  const [objectCount, setObjectCount] = useRecoilState(objectCountState);
  const [selectedId, setSelectedId] = useRecoilState(selectedIdState);
  const [objects, setObjects] = useRecoilState(objectState);
  const [items, setItems] = useRecoilState(itemState);
  const [pen, setPen] = useRecoilState(penState);
  const [menu, setMenu] = useRecoilState(menuState);
  const [mode, setMode] = useRecoilState(modeState);
  const [bgColor, setBgColor] = useRecoilState(bgColorState);
  const [bg, setBg] = useRecoilState(bgState);

  const [bgImage] =
    bg === "수야" ? useImage("/suya.png") : useImage("/suho.png");

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
  }, [objects, mode]);

  // 한 번 클릭했을 때
  const checkDeselect = (e: any) => {
    if (mode === "move") {
      // const clickedOnEmpty = e.target === e.target.getStage();
      const clickedOnEmpty = e.target.getId() === "background";

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
        if (selectedId.length === 0) {
          setSelectedId([e.target.getId()]);
        }
      }
    } else {
      drawRef.current = true;

      const pos = props.stageRef.current.getPointerPosition();
      setObjects((prev) => [
        ...prev,
        {
          type: "line",
          size: pen.size,
          color: pen.color,
          points: [pos.x, pos.y, pos.x + 0.0001, pos.y], // 점을 찍을 때 표시가 안될때가 있어 임의로 0.0001을 더해줌
          id: `선 ${objectCount}`,
          z: objectCount,
          opacity: 1,
        },
      ]);
      setObjectCount((prev) => prev + 1);
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
    } else {
      if (!drawRef.current) {
        return;
      }

      const canvas = document.getElementsByTagName("canvas");
      const rel_x = e.clientX - canvas[0].getBoundingClientRect().x;
      const rel_y = e.clientY - canvas[0].getBoundingClientRect().y;

      // 마지막 선의 포인트를 추가합니다.
      const newObjects = objects.map((object, index) => {
        if (index === objects.length - 1) {
          return {
            ...object,
            points: [...object.points, rel_x, rel_y],
          };
        }
        return object;
      });

      setObjects(newObjects);
    }
  };

  // 드래그가 끝났을 때
  const endSelection = (e: any) => {
    if (mode === "move") {
      if (!selectRef.current.visible()) {
        return;
      }

      setTimeout(() => {
        selectRef.current.visible(false);
      });

      let selected_shapes = props.stageRef.current.find(".images");
      let selected_lines = props.stageRef.current.find(".lines");

      let contents = [...selected_shapes, ...selected_lines];

      let box = selectRef.current.getClientRect();

      let selected = contents.filter((shape: any) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
      );

      let selectedId = selected.map((child: any) => child.attrs.id);

      setSelectedId(selectedId);
    } else {
      drawRef.current = false;
    }
  };

  // 현재 선택된 요소를 Transformer에게 전달
  useEffect(() => {
    if (selectedId) {
      let selectedNodes = layerRef.current.children.filter((child: any) =>
        selectedId.includes(child.attrs.id)
      );

      trRef.current?.nodes(selectedNodes);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [selectedId]);

  useEffect(() => {
    if (mode === "draw") {
      setSelectedId([]);
    }
  }, [mode]);

  useEffect(() => {
    if (menu === "저장") {
      setSelectedId([]);
    }
  }, [menu]);

  const sortedObjects = [...objects].sort((a, b) => {
    if (a.z > b.z) return 1;
    if (a.z == b.z) return 0;
    if (a.z < b.z) return -1;
    return 0;
  });

  return (
    <>
      <div className="flex flex-col w-[600px] h-[600px] justify-center ">
        <Stage
          ref={props.stageRef}
          width={600}
          height={600}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
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
            <Image
              x={50}
              y={50}
              width={500}
              height={500}
              image={bgImage}
              id="background"
            />
          </Layer>
          <Layer ref={layerRef}>
            {items.map((i) => (
              <UseItem key={i.item} url={i.itemUrl} id="background" />
            ))}

            {sortedObjects.map((object) =>
              object.type === "image" ? (
                <UseImage
                  x={50}
                  y={50}
                  url={object.url}
                  id={object.id}
                  opacity={object.opacity}
                  name="images"
                  key={object.z}
                  onDragEnd={() => {}}
                  onDragStart={(e: any) => {
                    if (selectedId.length < 2) {
                      setSelectedId((prev: string[]) => [object.id]);
                    }
                  }}
                  draggable={mode === "move"}
                  onSelect={(e: any) => {
                    if (selectedId.length < 2) {
                      setSelectedId((prev: string[]) => [object.id]);
                    }
                  }}
                />
              ) : (
                <Line
                  id={object.id}
                  name="lines"
                  key={object.z}
                  points={object.points}
                  stroke={object.color}
                  strokeWidth={object.size}
                  opacity={object.opacity}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                  onDragStart={() => {
                    if (selectedId.length < 2) {
                      setSelectedId((prev: string[]) => [object.id]);
                    }
                  }}
                  draggable={mode === "move"}
                  globalCompositeOperation={"source-over"}
                  onSelect={() => {
                    if (selectedId.length < 2) {
                      setSelectedId((prev: string[]) => [object.id]);
                    }
                  }}
                />
              )
            )}
            <Rect ref={selectRef} fill="rgba(0,0,245,0.2)" visible={false} />
            <Transformer shouldOverdrawWholeArea ref={trRef} />
          </Layer>
        </Stage>
      </div>
      {/* <p
        onClick={() => {
          console.log(objects);
          console.log(sortedObjects);
        }}
      >
        button
      </p> */}
    </>
  );
};

export default Preview;
