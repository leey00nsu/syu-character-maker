import { FaHeart } from 'react-icons/fa';
import { twJoin } from 'tailwind-merge';

interface LikeToggleButtonProps {
  toggleHandler: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  isLiked: boolean;
}

const LikeToggleButton = ({
  isLiked,
  toggleHandler,
}: LikeToggleButtonProps) => {
  return (
    <button
      className="btn-ghost btn h-6 min-h-0 w-6 p-0 hover:bg-transparent"
      onClick={toggleHandler}
    >
      <FaHeart
        className={twJoin(
          'h-full w-full',
          isLiked ? 'text-accent' : 'text-slate-400',
        )}
      />
    </button>
  );
};

export default LikeToggleButton;
