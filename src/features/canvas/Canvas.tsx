import Konva from 'konva';
import { useRef } from 'react';
import { Layer, Stage } from 'react-konva';

import useCanvas from '@/features/canvas/hooks/useCanvas';

import { WindowContainer } from '@/ui/containers';

import { CanvasObjects } from './components';
import { CanvasResetButton } from './components/buttons';
import CanvasNameInput from './components/canvasNameInput/CanvasNameInput';
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

  const { clickHandler, objectSelectHandler, isMobile } = useCanvas({
    stageRef,
    layerRef,
    selectBoxRef,
    transformerRef,
  });

  return (
    <WindowContainer className="w-[350px] sm:w-[600px]">
      <WindowContainer.Header>
        <CanvasNameInput />
      </WindowContainer.Header>
      <WindowContainer.HeaderButton>
        <CanvasResetButton />
      </WindowContainer.HeaderButton>
      <div className="flex h-[350px] w-full justify-center overflow-hidden sm:h-[600px] ">
        <Stage
          ref={stageRef}
          className="transparency-grid h-full w-full"
          width={DEFAULT_WIDTH}
          height={DEFAULT_WIDTH}
          onMouseDown={clickHandler}
          onTouchStart={clickHandler}
          scale={
            isMobile ? { x: MOBILE_SCALE, y: MOBILE_SCALE } : { x: 1, y: 1 }
          }
        >
          <Layer ref={layerRef}>
            <CanvasObjects objectSelectHandler={objectSelectHandler} />
            <ObjectSelectBox selectBoxRef={selectBoxRef} />
            <ObjectTransformer transformerRef={transformerRef} />
          </Layer>
        </Stage>
      </div>
    </WindowContainer>
  );
};

export default Canvas;
