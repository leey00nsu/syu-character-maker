import { Stage, Layer, Rect, Text, Transformer } from "react-konva";
import { useRef, useEffect, useState, MouseEventHandler } from "react";
import Konva from "konva";

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
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: "red",
    id: "rect1",
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: "green",
    id: "rect2",
  },
];

const Preview = () => {
  // useEffect(() => {
  //   document.addEventListener("mousemove", (e) => {
  //     startSelection(e);
  //   });
  //   document.addEventListener("mouseup", (e) => {
  //     endSelection(e);
  //   });
  // }, []);

  const [rectangles, setRectangles] = useState(initialRectangles);
  const [selectedId, selectShape] = useState<string[]>(["rect1", "rect2"]);

  const [x1, setX1] = useState(0);
  const [y1, setY1] = useState(0);
  const [x2, setX2] = useState(0);
  const [y2, setY2] = useState(0);
  const layerRef = useRef<any>();
  const stageRef = useRef<any>();

  const selectRef = useRef<any>();
  const trRef = useRef<any>();

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
  }, [x1, y1, x2, y2]);

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();

    if (clickedOnEmpty) {
      selectShape([]);

      console.log(stageRef.current.getPointerPosition().x);

      setX1(stageRef.current.getPointerPosition().x);
      setY1(stageRef.current.getPointerPosition().y);
      setX2(stageRef.current.getPointerPosition().x);
      setY2(stageRef.current.getPointerPosition().y);

      selectRef.current.visible(true);

      selectRef.current.width(0);
      selectRef.current.height(0);
    }
  };

  const startSelection = (e: any) => {
    if (!selectRef.current.visible()) {
      return;
    }

    const canvas = document.getElementsByTagName("canvas");
    const rel_x = e.clientX - canvas[0].getBoundingClientRect().x;
    const rel_y = e.clientY - canvas[0].getBoundingClientRect().y;

    console.log(e.clientX, canvas[0]);

    setX2(rel_x);
    setY2(rel_y);

    selectRef.current.setAttrs({
      x: Math.min(x1, x2),
      y: Math.min(y1, y2),
      width: Math.abs(x2 - x1),
      height: Math.abs(y2 - y1),
    });
  };

  const endSelection = (e: any) => {
    if (!selectRef.current.visible()) {
      return;
    }

    setTimeout(() => {
      selectRef.current.visible(false);
    });

    let shapes = stageRef.current.find(".rects");

    let box = selectRef.current.getClientRect();
    let selected = shapes.filter((shape: any) =>
      Konva.Util.haveIntersection(box, shape.getClientRect())
    );

    let selectedId = selected.map((child: any) => child.attrs.id);

    selectShape(selectedId);
  };

  useEffect(() => {
    if (selectedId) {
      let selectedNodes = layerRef.current.children.filter((child: any) =>
        selectedId.includes(child.attrs.id)
      );

      trRef.current.nodes(selectedNodes);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedId]);

  return (
    <div className="flex  w-[300px] h-[300px] bg-slate-200 justify-center">
      <Stage
        ref={stageRef}
        width={300}
        height={300}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer ref={layerRef}>
          {rectangles.map((rect, i) => {
            return (
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
            );
          })}
          <Rect ref={selectRef} fill="rgba(0,0,245,0.2)" visible={false} />
          <Transformer shouldOverdrawWholeArea ref={trRef} />
        </Layer>
      </Stage>
      {/* <p>{x1}</p>
      <p>{y1}</p>
      <p>{x2}</p>
      <p>{y2}</p> */}
    </div>
  );
};

export default Preview;
