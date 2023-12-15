import { selectedIdState } from '@/store/canvasStore';
import Konva from 'konva';
import { RefObject } from 'react';
import { Transformer } from 'react-konva';
import { useRecoilState } from 'recoil';

interface ObjectTransformerProps {
  transformerRef: RefObject<Konva.Transformer>;
}

const ObjectTransformer = ({ transformerRef }: ObjectTransformerProps) => {
  const [selectedId] = useRecoilState(selectedIdState);

  const isBackground = selectedId.includes('background');

  return (
    <>
      {!isBackground && (
        <Transformer shouldOverdrawWholeArea ref={transformerRef} />
      )}
    </>
  );
};

export default ObjectTransformer;
