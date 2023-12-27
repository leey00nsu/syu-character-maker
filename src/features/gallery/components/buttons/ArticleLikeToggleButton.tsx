import tw from '@/utils/tw';
import React from 'react';
import { FaHeart } from 'react-icons/fa';

import { ToggleButton } from '@/ui/buttons';

interface ArticleToggleLikeButtonProps {
  toggleHandler: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  isLiked: boolean;
}

const ArticleToggleLikeButton = ({
  isLiked,
  toggleHandler,
}: ArticleToggleLikeButtonProps) => {
  const classNames = tw(
    'btn-ghost btn h-6 min-h-0 w-6 p-0 bg-transparent',
    isLiked ? 'text-accent' : 'text-slate-400',
  );

  return (
    <ToggleButton
      isActive={isLiked}
      className={classNames}
      clickHandler={toggleHandler}
    >
      <FaHeart className="h-full w-full" />
    </ToggleButton>
  );
};

export default ArticleToggleLikeButton;
