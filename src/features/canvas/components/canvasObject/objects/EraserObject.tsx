import Konva from 'konva';
import { Group as GroupType } from 'konva/lib/Group';
import { Line as LineType } from 'konva/lib/shapes/Line';
import { useLayoutEffect } from 'react';
import { Line } from 'react-konva';

import { CanvasObject, useCanvasStore } from '@/store/canvasStore';

interface DrawObjectProps {
  object: CanvasObject;
}

const EraserObject = ({ object }: DrawObjectProps) => {
  const stageRef = useCanvasStore(state => state.stageRef);

  useLayoutEffect(() => {
    cacheGroup();
  }, [object]);

  const cacheGroup = () => {
    if (object.parents) {
      console.log('refetch');
      console.log(stageRef?.current?.children);

      const currentNode = stageRef?.current?.findOne(
        '#' + object.id,
      ) as LineType;
      const parentsNode = stageRef?.current?.findOne(
        '#' + object.parents,
      ) as GroupType;

      if (!currentNode || !parentsNode) return;

      console.log(parentsNode.getClientRect());

      // 부모의 transform으로 부터 현재 지우개의 위치를 다시 구한다.
      const absTransform = parentsNode.getAbsoluteTransform();

      const invertedTransform = new Konva.Transform(
        absTransform.getMatrix(),
      ).invert();

      const pos = currentNode.points();
      const posVector = [];

      for (let i = 0; i < pos.length; i += 2) {
        const x = pos[i];
        const y = pos[i + 1];
        posVector.push({ x, y });
      }

      const resultPos: number[] = [];

      posVector.forEach(vector => {
        const newPos = invertedTransform.point({
          x: vector.x,
          y: vector.y,
        });

        resultPos.push(newPos.x, newPos.y);
      });

      currentNode.setAttrs({
        points: resultPos,
      });

      parentsNode?.add(currentNode);
      parentsNode?.cache();
    }
  };

  return (
    <Line
      id={object.id}
      name={object.name}
      key={object.id}
      points={object.points}
      stroke={object.color}
      strokeWidth={object.size}
      opacity={object.opacity}
      tension={0.5}
      lineCap="round"
      lineJoin="round"
      globalCompositeOperation="destination-out"
    />
  );
};

export default EraserObject;
