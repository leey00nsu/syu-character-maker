import Konva from 'konva';
import { useRef } from 'react';
import { Layer, Stage } from 'react-konva';

import useCanvas from '@/features/canvas/hooks/useCanvas';

import { WindowContainer } from '@/ui/containers';

import { CanvasResetButton } from './components/buttons';
import CanvasNameInput from './components/canvasNameInput/CanvasNameInput';
import CanvasObjectList from './components/canvasObjectList/CanvasObjectList';
import {
  ObjectSelectBox,
  ObjectTransformer,
} from './components/objectControllers';
import { DEFAULT_WIDTH, MOBILE_SCALE } from './constants/canvas';

const Canvas = () => {
  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);
  const selectBoxRef = useRef<Konva.Rect>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const { clickHandler, isMobile } = useCanvas({
    stageRef,
    layerRef,
    selectBoxRef,
    transformerRef,
  });

  const currentScale = isMobile
    ? { x: MOBILE_SCALE, y: MOBILE_SCALE }
    : { x: 1, y: 1 };

  return (
    <WindowContainer className="w-[350px] sm:w-[600px]">
      <WindowContainer.Header>
        <CanvasNameInput />
      </WindowContainer.Header>
      <WindowContainer.HeaderButton>
        <CanvasResetButton />
      </WindowContainer.HeaderButton>

      <WindowContainer.Content className="flex h-[350px] w-full justify-center overflow-hidden sm:h-[600px] ">
        <Stage
          ref={stageRef}
          className="transparency-grid h-full w-full"
          width={DEFAULT_WIDTH}
          height={DEFAULT_WIDTH}
          onMouseDown={clickHandler}
          onTouchStart={clickHandler}
          scale={currentScale}
        >
          <Layer ref={layerRef}>
            <CanvasObjectList />
            <ObjectSelectBox selectBoxRef={selectBoxRef} />
            <ObjectTransformer transformerRef={transformerRef} />
          </Layer>
        </Stage>
      </WindowContainer.Content>
    </WindowContainer>
  );
};

export default Canvas;
