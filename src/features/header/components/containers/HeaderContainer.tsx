interface HeaderContainerProps {
  children?: React.ReactNode;
}

const LeftButtons = ({ children }: HeaderContainerProps) => {
  return (
    <div className=" xs:flex-nowrap flex min-w-[1/2] flex-wrap items-start  gap-2">
      {children}
    </div>
  );
};

const RightButtons = ({ children }: HeaderContainerProps) => {
  return <div className="flex items-start gap-2">{children}</div>;
};

const HeaderContainer = ({ children }: HeaderContainerProps) => {
  return (
    <div className="fixed z-50 flex w-full items-center justify-center  bg-base-100 px-6 py-6">
      <div className="flex w-full justify-between">{children}</div>
    </div>
  );
};

HeaderContainer.Left = LeftButtons;
HeaderContainer.Right = RightButtons;

export default HeaderContainer;
