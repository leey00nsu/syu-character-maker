import { suhoItems } from '@/constants/suhoItems';
import { suyaItems } from '@/constants/suyaItems';
import { bgState, itemState } from '@/store/store';
import { useRecoilState } from 'recoil';

interface ItemToggleButtonProps {
  onClick: (item: string, itemUrl: string) => void;
  part: string;
}

const ItemToggleButton = (props: ItemToggleButtonProps) => {
  const [bg, setBg] = useRecoilState(bgState);
  const [items, setItems] = useRecoilState(itemState);

  let currentItems = [];

  if (bg === '수호') {
    currentItems = suhoItems.filter(suhoItem => suhoItem.part === props.part);
  } else {
    currentItems = suyaItems.filter(suyaItem => suyaItem.part === props.part);
  }

  return (
    <div className=" flex grow-0 flex-wrap content-start items-start gap-2 p-2">
      {currentItems.map(currentItem => (
        <button
          key={currentItem.item}
          onClick={props.onClick.bind(
            this,
            currentItem.item,
            currentItem.itemUrl,
          )}
          className={
            items.find(i => i.item === currentItem.item)
              ? 'btn-outline  btn-active btn  '
              : 'border-1 btn-ghost btn border-base-300'
          }
        >
          {currentItem.item}
        </button>
      ))}
    </div>
  );
};

export default ItemToggleButton;
