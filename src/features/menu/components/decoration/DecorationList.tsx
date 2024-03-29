import { useCanvasStore } from '@/store/canvas';

import useCharacter from '@/features/canvas/hooks/useCharacter';
import useObjectControll from '@/features/canvas/hooks/useObjectControll';

import { Paragraph } from '@/ui/texts';

import { DecorationToggleButton } from './buttons';
import { Decoration } from './constants/decoration.type';
import { SUHO_DECORATIONS } from './constants/suhoDecorations';
import { SUYA_DECORATIONS } from './constants/suyaDecorations';

interface DecorationListProps {
  part: string;
}

const DecorationList = ({ part }: DecorationListProps) => {
  const { character } = useCharacter();
  const canvasObjects = useCanvasStore(state => state.canvasObjects);

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

  const currentDecorations = canvasObjects.filter(
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
    <div className="relative grid w-full auto-rows-max grid-cols-2 gap-4 overflow-y-auto p-4 sm:grid-cols-3">
      {partDecorations.map(decoration => (
        <DecorationToggleButton
          key={decoration.item}
          toggleHandler={toggleDecorationHandler.bind(this, decoration)}
          isActive={isActiveDecoration(decoration)}
        >
          {decoration.item}
        </DecorationToggleButton>
      ))}
      <Paragraph
        className="absolute bottom-0 w-full py-4 text-center"
        size="xs"
        weight="light"
      >
        레이어를 클릭해 색상을 변경할 수 있어요!
      </Paragraph>
    </div>
  );
};

export default DecorationList;
