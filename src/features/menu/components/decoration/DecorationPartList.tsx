import { DECORATION_PARTS } from './constants/decorationParts';

interface DecorationPartListProps {
  part: string;
  changePartHandler: (changes: string) => void;
}

const DecorationPartList = ({
  part,
  changePartHandler,
}: DecorationPartListProps) => {
  return (
    <ul className="menu menu-vertical gap-1 border-r p-2 shrink-0">
      {DECORATION_PARTS.map(decorationPart => (
        <li key={decorationPart}>
          <a
            onClick={changePartHandler.bind(this, decorationPart)}
            className={part == decorationPart ? 'active px-10 ' : 'px-10 '}
          >
            {decorationPart}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default DecorationPartList;
