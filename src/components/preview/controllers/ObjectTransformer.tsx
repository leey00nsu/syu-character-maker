import { selectedIdState } from '@/store/store';
import Konva from 'konva';
import { MutableRefObject } from 'react';
import { Transformer } from 'react-konva';
import { useRecoilState } from 'recoil';

interface ObjectTransformerProps {
  transformerRef: MutableRefObject<Konva.Transformer | null>;
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
