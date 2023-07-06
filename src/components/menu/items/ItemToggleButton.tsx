import { bgState, itemState } from "../../../store/store";
import { useRecoilState } from "recoil";
import { suyaItems } from "../../../constants/suyaItems";
import { suhoItems } from "../../../constants/suhoItems";

interface ItemToggleButtonProps {
  onClick: (item: string, itemUrl: string) => void;
  part: string;
}

const ItemToggleButton = (props: ItemToggleButtonProps) => {
  const [bg, setBg] = useRecoilState(bgState);
  const [items, setItems] = useRecoilState(itemState);

  let currentItems = [];

  if (bg === "수호") {
    currentItems = suhoItems.filter((suhoItem) => suhoItem.part === props.part);
  } else {
    currentItems = suyaItems.filter((suyaItem) => suyaItem.part === props.part);
  }

  return (
    <>
      {currentItems.map((currentItem) => (
        <button
          key={currentItem.item}
          onClick={props.onClick.bind(
            this,
            currentItem.item,
            currentItem.itemUrl
          )}
          className={
            items.find((i) => i.item === currentItem.item)
              ? "btn  btn-outline btn-active"
              : "btn btn-ghost border-1 border-base-300"
          }
        >
          {currentItem.item}
        </button>
      ))}
    </>
  );
};

export default ItemToggleButton;
