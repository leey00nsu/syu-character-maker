import Konva from 'konva';
import { RefObject } from 'react';
import { Transformer } from 'react-konva';

import { useCanvasStore } from '@/store/canvas';

interface ObjectTransformerProps {
  transformerRef: RefObject<Konva.Transformer>;
}

const ObjectTransformer = ({ transformerRef }: ObjectTransformerProps) => {
  const { mode } = useCanvasStore(state => state);

  return (
    <Transformer
      id="transformer"
      name="transformer"
      shouldOverdrawWholeArea={mode === 'move'}
      rotateEnabled={mode === 'move'}
      resizeEnabled={mode === 'move'}
      borderDash={[6, 6]}
      borderStrokeWidth={2}
      padding={10}
      ref={transformerRef}
    />
  );
};

export default ObjectTransformer;
