import React from 'react';

interface AvatarProps {
  photo: string;
}

const Avatar = ({ photo }: AvatarProps) => {
  return (
    <div className="online avatar">
      <div className="h-full w-full rounded-full">
        <img src={photo} referrerPolicy="no-referrer" />
      </div>
    </div>
  );
};

export default React.memo(Avatar);
