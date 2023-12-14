import useKonva from '@/hooks/preview/useKonva';
import Konva from 'konva';
import { MutableRefObject, RefObject, useRef } from 'react';
import { Layer, Stage } from 'react-konva';
import DrawingObjects from './DrawingObjects';
import { ObjectSelectBox, ObjectTransformer } from './controllers';
import { DrawBackground } from './draws';

interface PreviewProps {
  stageRef: RefObject<Konva.Stage>;
}

// 모바일일 때 크기와 데스크탑일 때 크기를 다르게 설정하여 렌더링
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;
const MOBILE_WIDTH = 350;
const DESKTOP_WIDTH = 600;
const MOBILE_SCALE = MOBILE_WIDTH / DESKTOP_WIDTH;

const Preview = ({ stageRef }: PreviewProps) => {
  const layerRef = useRef<Konva.Layer | null>(null);
  const selectBoxRef = useRef<Konva.Rect | null>(null);
  const transformerRef = useRef<Konva.Transformer | null>(null);

  const {
    clickHandler,
    objectSelectHandler,
    isMobile,
  } = useKonva({
    stageRef,
    layerRef,
    selectBoxRef,
    transformerRef,
    MOBILE_SCALE,
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-base-300">
      <div className="flex h-[350px] w-[350px] justify-center sm:h-[600px] sm:w-[600px]">
        <Stage
          ref={stageRef}
          className="h-full w-full"
          width={DEFAULT_WIDTH}
          height={DEFAULT_HEIGHT}
          onMouseDown={clickHandler}
          onTouchStart={clickHandler}
          scale={
            isMobile ? { x: MOBILE_SCALE, y: MOBILE_SCALE } : { x: 1, y: 1 }
          }
        >
          <Layer>
            <DrawBackground width={DEFAULT_WIDTH} height={DEFAULT_HEIGHT} />
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
