import { Stage, Layer, Rect, Text, Transformer } from "react-konva";
import { useRef, useEffect, useState } from "react";
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
  const [rectangles, setRectangles] = useState(initialRectangles);
  const [selectedId, selectShape] = useState<string[]>(["rect1", "rect2"]);

  const [x1, setX1] = useState(0);
  const [y1, setY1] = useState(0);
  const [x2, setX2] = useState(0);
  const [y2, setY2] = useState(0);
  const wrapRef = useRef<any>();
  const layerRef = useRef<any>();
  const stageRef = useRef<any>();

  const selectRef = useRef<any>();
  const trRef = useRef<any>();

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape([]);

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

    // console.log(e.clientX);
    // console.log(stageRef.current.getPointerPosition().x);

    setX2(stageRef.current.getPointerPosition().x);
    setY2(stageRef.current.getPointerPosition().y);

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
    <div
      ref={wrapRef}
      className="w-full h-[600px] bg-slate-400"
      onMouseMove={startSelection}
      onMouseUp={endSelection}
    >
      <Stage
        ref={stageRef}
        width={600}
        height={600}
        onMouseDown={checkDeselect}

        // onMouseLeave={endSelection}
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
    </div>
  );
};

export default Preview;
