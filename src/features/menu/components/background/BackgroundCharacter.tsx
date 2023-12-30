import useCharacter from '@/features/canvas/hooks/useCharacter';
import useObjectControll from '@/features/canvas/hooks/useObjectControll';

import { RadioButton } from '@/ui/buttons';

const BackgroundCharacter = () => {
  const { character } = useCharacter();
  const { changeCharacter } = useObjectControll();

  const changeCharacterHandler = (changes: string) => {
    changeCharacter(changes);
  };

  return (
    <div className="w-1/2">
      <RadioButton
        name="radio-character"
        label="수호"
        changeHandler={changeCharacterHandler.bind(this, '수호')}
        isChecked={character === '수호'}
      />
      <RadioButton
        name="radio-character"
        label="수야"
        changeHandler={changeCharacterHandler.bind(this, '수야')}
        isChecked={character === '수야'}
      />
    </div>
  );
};

export default BackgroundCharacter;
