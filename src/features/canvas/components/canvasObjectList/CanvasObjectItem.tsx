import { CanvasObject } from '@/store/canvas/canvasObjectSlice';

import {
  CharacterObject,
  DecorationObject,
  ImageObject,
  LineObject,
} from './objects';

interface CanvasObjectItemProps {
  object: CanvasObject;
  objectSelectHandler: (id: string) => void;
}

const CanvasObjectItem = ({
  object,
  objectSelectHandler,
}: CanvasObjectItemProps) => {
  switch (object.name) {
    case 'character':
      return <CharacterObject object={object} key={object.id} />;
    case 'decoration':
      return <DecorationObject object={object} key={object.id} />;
    case 'line':
      return (
        <LineObject
          key={object.id}
          object={object}
          objectSelectHandler={objectSelectHandler}
        />
      );
    case 'image':
      return (
        <ImageObject
          key={object.id}
          object={object}
          objectSelectHandler={objectSelectHandler}
        />
      );
    default:
      return null;
  }
};

export default CanvasObjectItem;
