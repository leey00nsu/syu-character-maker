import Konva from 'konva';
import { RefObject } from 'react';
import { Transformer } from 'react-konva';

interface ObjectTransformerProps {
  transformerRef: RefObject<Konva.Transformer>;
}

const ObjectTransformer = ({ transformerRef }: ObjectTransformerProps) => {
  return (
    <Transformer
      id="transformer"
      name="transformer"
      shouldOverdrawWholeArea
      ref={transformerRef}
    />
  );
};

export default ObjectTransformer;
