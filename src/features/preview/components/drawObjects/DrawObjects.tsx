import { useRecoilState } from 'recoil';

import { canvasObjectsState } from '@/store/canvasStore';

import {
  BackgroundObject,
  CharacterObject,
  DecorationObject,
  ImageObject,
  LineObject,
} from './objects';

interface DrawObjectsProps {
  objectSelectHandler: (id: string) => void;
}

const DrawObjects = ({ objectSelectHandler }: DrawObjectsProps) => {
  const [canvasObjects] = useRecoilState(canvasObjectsState);

  return (
    <>
      <BackgroundObject />
      {canvasObjects.map(object => {
        if (object.name === 'character') {
          return <CharacterObject object={object} key={object.id} />;
        }
        if (object.name === 'decoration') {
          return <DecorationObject object={object} key={object.id} />;
        }
        if (object.name === 'line') {
          return (
            <LineObject
              key={object.id}
              object={object}
              objectSelectHandler={objectSelectHandler}
            />
          );
        }
        if (object.name === 'image') {
          return (
            <ImageObject
              key={object.id}
              object={object}
              objectSelectHandler={objectSelectHandler}
            />
          );
        }
      })}
    </>
  );
};

export default DrawObjects;
