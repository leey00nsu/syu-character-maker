interface HeaderContainerProps {
  children?: React.ReactNode;
}

const LeftButtons = ({ children }: HeaderContainerProps) => {
  return (
    <div className="flex items-center gap-2 ">
      <div className="flex items-center justify-between gap-2">{children}</div>
    </div>
  );
};

const RightButtons = ({ children }: HeaderContainerProps) => {
  return (
    <div className="flex items-center gap-2 ">
      <div className="flex items-center justify-between gap-2">{children}</div>
    </div>
  );
};

const HeaderContainer = ({ children }: HeaderContainerProps) => {
  return (
    <div className="fixed z-50 flex h-28 w-full items-center justify-between bg-base-100 px-6 py-6">
      {children}
    </div>
  );
};

HeaderContainer.Left = LeftButtons;
HeaderContainer.Right = RightButtons;

export default HeaderContainer;
