import useKonva from '@/hooks/preview/useKonva';
import Konva from 'konva';
import { RefObject, useRef } from 'react';
import { Layer, Stage } from 'react-konva';
import DrawingObjects from './DrawingObjects';
import { DEFAULT_WIDTH, MOBILE_SCALE } from './constants/canvas';
import { ObjectSelectBox, ObjectTransformer } from './controllers';
import { DrawBackground } from './draws';

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
    <div className="overflow-hidden rounded-2xl border border-base-300">
      <div className="flex h-[350px] w-[350px] justify-center sm:h-[600px] sm:w-[600px]">
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
          <Layer>
            <DrawBackground />
          </Layer>

          <Layer ref={layerRef}>
            <DrawingObjects objectSelectHandler={objectSelectHandler} />
            <ObjectSelectBox selectBoxRef={selectBoxRef} />
            <ObjectTransformer transformerRef={transformerRef} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Preview;
