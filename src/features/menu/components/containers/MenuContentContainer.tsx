import Paragraph from '@/ui/texts/Paragraph';

interface MenuContentContainerProps {
  children?: React.ReactNode;
}

const Row = ({ children }: MenuContentContainerProps) => {
  return <div className="flex grow flex-row">{children}</div>;
};

const Column = ({ children }: MenuContentContainerProps) => {
  return (
    <div className="flex grow basis-full flex-col items-center justify-center gap-2 p-2">
      {children}
    </div>
  );
};

const Label = ({ children }: MenuContentContainerProps) => {
  return (
    <Paragraph size="lg" weight="medium">
      {children}
    </Paragraph>
  );
};

const MenuContentContainer = ({ children }: MenuContentContainerProps) => {
  return (
    <section className="flex grow flex-col  border-t border-base-300 bg-white sm:flex-row">
      {children}
    </section>
  );
};

MenuContentContainer.Row = Row;
MenuContentContainer.Column = Column;
MenuContentContainer.Label = Label;

export default MenuContentContainer;
