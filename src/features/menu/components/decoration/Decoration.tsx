import { useState } from 'react';

import MenuContentContainer from '../containers/MenuContentContainer';
import DecorationList from './DecorationList';
import DecorationPartList from './DecorationPartList';
import { DECORATION_PARTS } from './constants/decorationParts';

const Decoration = () => {
  const [part, setPart] = useState(DECORATION_PARTS[0]);

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
