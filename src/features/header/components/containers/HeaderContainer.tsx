interface HeaderContainerProps {
  children?: React.ReactNode;
}

const LeftButtons = ({ children }: HeaderContainerProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 xs:grid-cols-5 ">{children}</div>
  );
};

const RightButtons = ({ children }: HeaderContainerProps) => {
  return <div className="grid grid-cols-3 gap-2">{children}</div>;
};

const HeaderContainer = ({ children }: HeaderContainerProps) => {
  return (
    <div className="sticky z-50 flex w-full items-center justify-center bg-base-100 px-6 py-6">
      <div className="flex w-full justify-between">{children}</div>
    </div>
  );
};

HeaderContainer.Left = LeftButtons;
HeaderContainer.Right = RightButtons;

export default HeaderContainer;
