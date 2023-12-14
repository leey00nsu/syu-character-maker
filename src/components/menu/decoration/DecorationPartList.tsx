import { ITEM_PARTS } from './constants/itemParts';

interface DecorationPartListProps {
  part: string;
  changePartHandler: (changes: string) => void;
}

const DecorationPartList = ({
  part,
  changePartHandler,
}: DecorationPartListProps) => {
  return (
    <ul className="menu menu-vertical gap-1 border-r p-2 ">
      {ITEM_PARTS.map(itemPart => (
        <li key={itemPart}>
          <a
            onClick={changePartHandler.bind(this, itemPart)}
            className={part == itemPart ? 'active px-10 ' : 'px-10 '}
          >
            {itemPart}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default DecorationPartList;
