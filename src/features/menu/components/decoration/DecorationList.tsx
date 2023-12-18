import { useRecoilState } from 'recoil';

import { characterState, drawingObjectState } from '@/store/canvasStore';

import useObjectControll from '@/hooks/useObjectControll';

import { ItemToggleButton } from '@/ui/buttons';

import { Decoration } from './constants/decoration.type';
import { SUHO_DECORATIONS } from './constants/suhoDecorations';
import { SUYA_DECORATIONS } from './constants/suyaDecorations';

interface DecorationListProps {
  part: string;
}

const DecorationList = ({ part }: DecorationListProps) => {
  const [drawingObjects, setDrawingObjects] =
    useRecoilState(drawingObjectState);
  const [character, setCharacter] = useRecoilState(characterState);

  const { addDecoration, removeDecoration } = useObjectControll();

  let partDecorations = [];

  if (character === '수호') {
    partDecorations = SUHO_DECORATIONS.filter(
      suhoDecoration => suhoDecoration.part === part,
    );
  } else {
    partDecorations = SUYA_DECORATIONS.filter(
      suyaDecoration => suyaDecoration.part === part,
    );
  }

  const currentDecorations = drawingObjects.filter(
    object => object.name === 'decoration',
  );

  const isActiveDecoration = (decoration: Decoration) => {
    return !!currentDecorations.find(
      currentDecoration => currentDecoration.id === decoration.item,
    );
  };

  const toggleDecorationHandler = (decoration: Decoration) => {
    if (isActiveDecoration(decoration)) {
      removeDecoration(decoration);
    } else {
      addDecoration(decoration);
    }
  };

  return (
    <div className="w-full grid grid-auto-rows-max grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 p-4 overflow-y-auto">
      {partDecorations.map(decoration => (
        <ItemToggleButton
          key={decoration.item}
          toggleHandler={toggleDecorationHandler.bind(this, decoration)}
          isActive={isActiveDecoration(decoration)}
        >
          {decoration.item}
        </ItemToggleButton>
      ))}
    </div>
  );
};

export default DecorationList;
