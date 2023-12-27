interface HeaderContainerProps {
  children?: React.ReactNode;
}

const ResponsiveColumn = ({ children }: HeaderContainerProps) => {
  return (
    <div className="grid h-full grid-cols-3 grid-rows-2 gap-2 xs:grid-cols-4 sm:grid-cols-5 sm:grid-rows-1">
      {children}
    </div>
  );
};

const FixedColumn = ({ children }: HeaderContainerProps) => {
  return <div className="grid h-full grid-cols-3 gap-2">{children}</div>;
};

const HeaderContainer = ({ children }: HeaderContainerProps) => {
  return (
    <div className=" sticky top-0 z-[998] flex w-full items-start justify-between bg-base-100 p-6">
      {children}
    </div>
  );
};

HeaderContainer.ResponsiveColumn = ResponsiveColumn;
HeaderContainer.FixedColumn = FixedColumn;

export default HeaderContainer;
