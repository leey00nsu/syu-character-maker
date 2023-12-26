import Konva from 'konva';
import { RefObject, useRef } from 'react';
import { Layer, Stage } from 'react-konva';

import useKonva from '@/features/preview/hooks/useKonva';

import { WindowContainer } from '@/ui/containers';

import { DrawObjects } from './components';
import CanvasNameInput from './components/canvasNameInput/CanvasNameInput';
import {
  ObjectSelectBox,
  ObjectTransformer,
} from './components/objectControllers';
import { DEFAULT_WIDTH, MOBILE_SCALE } from './constants/canvas';

interface PreviewProps {
  stageRef: RefObject<Konva.Stage>;
}

const Preview = ({ stageRef }: PreviewProps) => {
  const layerRef = useRef<Konva.Layer>(null);
  const selectBoxRef = useRef<Konva.Rect>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const { clickHandler, objectSelectHandler, isMobile } = useKonva({
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
      <div className="flex h-[350px] w-full justify-center overflow-hidden sm:h-[600px] ">
        <Stage
          ref={stageRef}
          className="h-full w-full"
          width={DEFAULT_WIDTH}
          height={DEFAULT_WIDTH}
          onMouseDown={clickHandler}
          onTouchStart={clickHandler}
          scale={
            isMobile ? { x: MOBILE_SCALE, y: MOBILE_SCALE } : { x: 1, y: 1 }
          }
        >
          <Layer ref={layerRef}>
            <DrawObjects objectSelectHandler={objectSelectHandler} />
            <ObjectSelectBox selectBoxRef={selectBoxRef} />
            <ObjectTransformer transformerRef={transformerRef} />
          </Layer>
        </Stage>
      </div>
    </WindowContainer>
  );
};

export default Preview;
