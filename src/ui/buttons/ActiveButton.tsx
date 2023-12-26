import tw from '@/utils/tw';

interface ActiveButtonProps {
  clickHandler: () => void;
  children?: React.ReactNode;
  className?: string;
}

const ActiveButton = ({
  clickHandler,
  children,
  className,
}: ActiveButtonProps) => {
  const classNames = tw('btn cursor-pointer rounded-box p-3', className);

  return (
    <div onClick={clickHandler} className={classNames}>
      {children}
    </div>
  );
};

export default ActiveButton;
