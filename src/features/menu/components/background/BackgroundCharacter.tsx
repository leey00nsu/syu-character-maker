import { useRecoilState } from 'recoil';

import { CharacterState, characterState, itemState } from '@/store/canvasStore';

import { RadioButton } from '@/ui/buttons';

const BackgroundCharacter = () => {
  const [character, setCharacter] = useRecoilState(characterState);
  const [items, setItems] = useRecoilState(itemState);

  const changeCharacterHandler = (changes: CharacterState) => {
    setCharacter(changes);
    setItems([]);
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
