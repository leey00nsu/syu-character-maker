import { Line, Stage, Layer, Rect, Image, Transformer } from "react-konva";
import { useRef, useEffect, useState } from "react";
import Konva from "konva";
import {
  bgColorState,
  modeState,
  bgState,
  saveState,
  removeState,
} from "../store/store";
import { useRecoilState } from "recoil";
import useImage from "use-image";

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }: any) => {
  const shapeRef = useRef<any>();

  return (
    <>
      <Rect
        name="rects"
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        onDragStart={onSelect}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
      />
    </>
  );
};

const initialRectangles = [
  {
    z: 0,
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: "blue",
    id: "rect1",
  },
  {
    z: 1,
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: "green",
    id: "rect2",
  },
];

const Preview = () => {
  const [save, setSave] = useRecoilState(saveState);
  const [remove, setRemove] = useRecoilState(removeState);
  const [mode, setMode] = useRecoilState(modeState);
  const [bgColor, setBgColor] = useRecoilState(bgColorState);
  const [bg, setBg] = useRecoilState(bgState);
  const [rectangles, setRectangles] = useState(initialRectangles);
  const [selectedId, selectShape] = useState<string[]>([]);
  const [image] =
    bg === "수야"
      ? useImage("./src/assets/suya.png")
      : useImage("./src/assets/suho.png");

  const [lines, setLines] = useState<any>([]);
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
  }, [lines, mode]);

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
      }
    } else {
      drawRef.current = true;

      const pos = stageRef.current.getPointerPosition();
      setLines((prev: any) => [
        ...lines,
        { points: [pos.x, pos.y], id: `lines${prev.length}` },
      ]);
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
      let lastLine = lines[lines.length - 1];
      // add point
      lastLine.points = lastLine.points.concat([rel_x, rel_y]);

      // replace last
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
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

      let selected_shapes = stageRef.current.find(".rects");
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
      selectShape([]);
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

  // remove state를 통해서 다른 컴포넌트에서 이 함수를 실행할 수 있도록 함
  useEffect(() => {
    if (remove) {
      let new_lines = lines.filter(
        (line: any) => !selectedId.includes(line.id)
      );

      setLines(new_lines);
      selectShape([]);

      setRemove(false);
    }
  }, [remove]);

  return (
    <>
      <div className="flex flex-col w-[600px] h-[600px] justify-center">
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
              stroke={"#cfcfcf"}
              strokeWidth={2}
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
              image={image}
              id="background"
            />
          </Layer>
          <Layer ref={layerRef}>
            {rectangles.map((rect, i) => (
              <Rectangle
                key={i}
                shapeProps={rect}
                isSelected={selectedId.includes(rect.id)}
                onSelect={() => {
                  if (selectedId.length < 2) {
                    selectShape((prev: any) => [rect.id]);
                  }
                }}
                onChange={(newAttrs: any) => {
                  const rects = rectangles.slice();
                  rects[i] = newAttrs;
                  setRectangles(rects);
                }}
              />
            ))}
            {lines.map((line: any, i: any) => (
              <Line
                id={`lines${i}`}
                name="lines"
                key={i}
                points={line.points}
                stroke="black"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                onDragStart={() => {
                  if (selectedId.length < 2) {
                    selectShape((prev: any) => [`lines${i}`]);
                  }
                }}
                draggable={mode === "move"}
                globalCompositeOperation={"source-over"}
                onSelect={() => {
                  if (selectedId.length < 2) {
                    selectShape((prev: any) => [`lines${i}`]);
                  }
                }}
              />
            ))}
            <Rect ref={selectRef} fill="rgba(0,0,245,0.2)" visible={false} />
            <Transformer shouldOverdrawWholeArea ref={trRef} />
          </Layer>
        </Stage>
      </div>
      <p
        onClick={() => {
          console.log(rectangles);
        }}
      >
        button
      </p>
    </>
  );
};

export default Preview;
