import { twJoin, twMerge } from 'tailwind-merge';

interface LikeToggleButtonProps {
  toggleHandler: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  isLiked: boolean;
}

const LikeToggleButton = ({
  isLiked,
  toggleHandler,
}: LikeToggleButtonProps) => {
  return (
    <div className="rating" onClick={toggleHandler}>
      <input
        type="radio"
        name="rating-3"
        className={twMerge(
          'mask mask-heart',
          twJoin(isLiked ? 'bg-red-600' : 'bg-slate-400'),
        )}
      />
    </div>
  );
};

export default LikeToggleButton;
