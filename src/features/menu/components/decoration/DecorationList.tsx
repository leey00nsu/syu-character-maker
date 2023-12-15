import { useRecoilState } from 'recoil';

import { characterState, itemState } from '@/store/canvasStore';

import { ItemToggleButton } from '@/ui/buttons';

import { SUHO_ITEMS } from './constants/suhoItems';
import { SUYA_ITEMS } from './constants/suyaItems';

interface DecorationListProps {
  part: string;
}

const DecorationList = ({ part }: DecorationListProps) => {
  const [character, setCharacter] = useRecoilState(characterState);
  const [items, setItems] = useRecoilState(itemState);

  let currentItems = [];

  if (character === '수호') {
    currentItems = SUHO_ITEMS.filter(suhoItem => suhoItem.part === part);
  } else {
    currentItems = SUYA_ITEMS.filter(suyaItem => suyaItem.part === part);
  }

  const toggleItemHandler = (item: string, itemUrl: string) => {
    if (items.find(i => i.item === item)) {
      setItems(prev => prev.filter(i => i.item !== item));
    } else {
      setItems(prev => [...prev, { item: item, itemUrl: itemUrl }]);
    }
  };

  return (
    <div className="flex grow-0 flex-wrap content-start items-start gap-2 p-2">
      {currentItems.map(currentItem => (
        <ItemToggleButton
          key={currentItem.item}
          toggleHandler={toggleItemHandler.bind(
            this,
            currentItem.item,
            currentItem.itemUrl,
          )}
          isActive={!!items.find(i => i.item === currentItem.item)}
        >
          {currentItem.item}
        </ItemToggleButton>
      ))}
    </div>
  );
};

export default DecorationList;
