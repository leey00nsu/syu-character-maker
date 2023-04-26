import { Line, Stage, Layer, Rect, Image, Transformer } from "react-konva";
import { useRef, useEffect, useState } from "react";
import Konva from "konva";
import {
  bgColorState,
  modeState,
  menuState,
  bgState,
  saveState,
  removeState,
  uploadState,
  penState,
} from "../store/store";
import { useRecoilState } from "recoil";
import useImage from "use-image";
import UseImage from "./UseImage";

interface objectProps {
  type: string;
  id: string;
  points?: number[];
  color?: string;
  size?: number;
  url?: string;
  z: number;
}

const Preview = () => {
  const [objectCount, setObjectCount] = useState(0);
  const [pen, setPen] = useRecoilState(penState);
  const [menu, setMenu] = useRecoilState(menuState);
  const [upload, setUpload] = useRecoilState(uploadState);
  const [save, setSave] = useRecoilState(saveState);
  const [remove, setRemove] = useRecoilState(removeState);
  const [mode, setMode] = useRecoilState(modeState);
  const [bgColor, setBgColor] = useRecoilState(bgColorState);
  const [bg, setBg] = useRecoilState(bgState);

  const [selectedId, selectShape] = useState<string[]>([]);
  const [bgImage] =
    bg === "수야" ? useImage("/suya.png") : useImage("/suho.png");

  const [objects, setObjects] = useState<objectProps[]>([]);

  const layerRef = useRef<any>();
  const stageRef = useRef<any>();

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
        selectShape([]);

        const pos = stageRef.current.getPointerPosition();

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
          selectShape([e.target.getId()]);
        }
      }
    } else {
      drawRef.current = true;

      const pos = stageRef.current.getPointerPosition();
      setObjects((prev: objectProps[]) => [
        ...prev,
        {
          type: "line",
          size: pen.size,
          color: pen.color,
          points: [pos.x, pos.y],
          id: `obj${objectCount}`,
          z: objectCount,
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
      let lastLine = objects[objects.length - 1];
      // add point
      lastLine.points = lastLine.points?.concat([rel_x, rel_y]);

      // replace last
      objects.splice(objects.length - 1, 1, lastLine);
      setObjects(objects.concat());
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

      let selected_shapes = stageRef.current.find(".images");
      let selected_lines = stageRef.current.find(".lines");

      let contents = [...selected_shapes, ...selected_lines];

      let box = selectRef.current.getClientRect();

      let selected = contents.filter((shape: any) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
      );

      let selectedId = selected.map((child: any) => child.attrs.id);

      selectShape(selectedId);
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

      trRef.current.nodes(selectedNodes);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedId]);

  // save state를 통해서 다른 컴포넌트에서 이 함수를 실행할 수 있도록 함
  useEffect(() => {
    if (save) {
      const dataURL = stageRef.current.toDataURL({ pixelRatio: 3 });

      var link = document.createElement("a");
      link.download = "save";
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setSave(false);
    }
  }, [save]);

  useEffect(() => {
    selectShape([]);
  }, [mode]);

  useEffect(() => {
    if (menu === "저장") {
      selectShape([]);
    }
  }, [menu]);

  // remove state를 통해서 다른 컴포넌트에서 이 함수를 실행할 수 있도록 함
  useEffect(() => {
    if (remove) {
      let new_objects = objects.filter(
        (object: objectProps) => !selectedId.includes(object.id)
      );

      setObjects(new_objects);

      selectShape([]);

      setRemove(false);
    }
  }, [remove]);

  const onUpload = (newUpload: string | ArrayBuffer) => {
    setObjects((prev: any) => [
      ...prev,
      {
        type: "image",
        id: `obj${objectCount}`,
        url: newUpload,
        z: objectCount,
      },
    ]);
    setObjectCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (upload) {
      onUpload(upload);
      setUpload("");
    }
  }, [upload]);
  return (
    <>
      <div className="flex flex-col w-[600px] h-[600px] justify-center ">
        <Stage
          ref={stageRef}
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
            {objects.map((object: objectProps) =>
              object.type === "image" ? (
                <UseImage
                  x={50}
                  y={50}
                  url={object.url}
                  id={object.id}
                  name="images"
                  key={object.z}
                  onDragEnd={() => {}}
                  onDragStart={(e: any) => {
                    if (selectedId.length < 2) {
                      selectShape((prev: string[]) => [object.id]);
                    }
                  }}
                  draggable={mode === "move"}
                  onSelect={(e: any) => {
                    if (selectedId.length < 2) {
                      selectShape((prev: string[]) => [object.id]);
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
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                  onDragStart={() => {
                    if (selectedId.length < 2) {
                      selectShape((prev: string[]) => [object.id]);
                    }
                  }}
                  draggable={mode === "move"}
                  globalCompositeOperation={"source-over"}
                  onSelect={() => {
                    if (selectedId.length < 2) {
                      selectShape((prev: string[]) => [object.id]);
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
        }}
      >
        button
      </p> */}
    </>
  );
};

export default Preview;
