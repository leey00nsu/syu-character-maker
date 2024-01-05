import { CanvasObject } from '@/store/canvas/canvasObjectSlice';

import {
  CharacterObject,
  DecorationObject,
  ImageObject,
  LineObject,
} from './objects';

interface CanvasObjectItemProps {
  object: CanvasObject;
}

const CanvasObjectItem = ({
  object,
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
        />
      );
    case 'image':
      return (
        <ImageObject
          key={object.id}
          object={object}
        />
      );
    default:
      return null;
  }
};

export default CanvasObjectItem;
