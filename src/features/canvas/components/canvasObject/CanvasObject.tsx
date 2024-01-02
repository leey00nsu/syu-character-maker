import { CanvasObject } from "@/store/canvasStore";
import { CharacterObject, DecorationObject, ImageObject, LineObject } from "./objects";

interface CanvasObjectProps {
  object: CanvasObject;
  objectSelectHandler: (id: string) => void;
}

const CanvasObject = ({ object, objectSelectHandler }:CanvasObjectProps) => {
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
    default: return null;
  }
};

export default CanvasObject;
