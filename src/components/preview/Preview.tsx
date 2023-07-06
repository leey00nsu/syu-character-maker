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
import DrawItem from "./DrawItem";
import DrawObject from "./DrawObject";

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
    // 저장 메뉴에서는 클릭을 무시 (transformer가 저장되지 않도록 하기 위함)
    if (menu === "저장") {
      return;
    }
    // move mode일 때
    if (mode === "move") {
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
      // draw mode일 때
      drawRef.current = true;

      // 현재 마우스의 위치를 받아옴
      const pos = props.stageRef.current.getPointerPosition();

      // 현재 마우스의 위치를 받아와서 객체를 생성
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

  // 오브젝트들을 z-index 순으로 정렬
  const zIndexedObjects = objects.map((object, index) => {
    {
      return { ...object, z: index + 1 };
    }
  });

  // 오브젝트가 드래그 되거나 선택되면 , selectedId에 추가
  const objectSelectHandler = (objectId: string) => {
    setSelectedId((prev: string[]) => [objectId]);
  };

  return (
    <div className="flex flex-col w-[600px] h-[600px] justify-center ">
      <button onClick={() => console.log(objects)}>button</button>
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
          {/* <Image
            id="background"
            opacity={1}
            x={50}
            y={50}
            width={500}
            height={500}
            image={bgImage}
          /> */}
        </Layer>
        <Layer ref={layerRef}>
          {items.map((i) => (
            <DrawItem key={i.item} url={i.itemUrl} id="background" />
          ))}
          {zIndexedObjects.map((object) => (
            <DrawObject
              key={object.id}
              object={object}
              objectSelectHandler={objectSelectHandler}
            />
          ))}
          <Rect ref={selectRef} fill="rgba(0,0,245,0.2)" visible={false} />
          <Transformer shouldOverdrawWholeArea ref={trRef} />
        </Layer>
      </Stage>
    </div>
  );
};

export default Preview;
