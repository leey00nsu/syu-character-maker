import { useState } from 'react';
import MenuContentContainer from '../ui/MenuContentContainer';
import DecorationList from './DecorationList';
import DecorationPartList from './DecorationPartList';
import { ITEM_PARTS } from './constants/itemParts';

const Decoration = () => {
  const [part, setPart] = useState(ITEM_PARTS[0]);

  const changePartHandler = (changes: string) => {
    setPart(changes);
  };

  return (
    <MenuContentContainer>
      <MenuContentContainer.Row>
        <DecorationPartList part={part} changePartHandler={changePartHandler} />
        <DecorationList part={part} />
      </MenuContentContainer.Row>
    </MenuContentContainer>
  );
};

export default Decoration;
