interface AvatarProps {
  photo: string;
}

const Avatar = ({ photo }: AvatarProps) => {
  return (
    <div className="online avatar">
      <div className="h-full w-full rounded-full">
        <img src={photo} />
      </div>
    </div>
  );
};

export default Avatar;
