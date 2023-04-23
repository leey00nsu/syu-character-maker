import Header from "../components/ui/Header";
import Preview from "../components/Preview";
import Menu from "../components/ui/Menu";
import Status from "../components/ui/Status";

const Index = () => {
  return (
    <div className="flex justify-center w-screen h-screen ">
      <div className="flex flex-col items-center w-full h-full max-w-4xl gap-2">
        <Header />
        <Status />
        <Preview />
        <Menu />
      </div>
    </div>
  );
};

export default Index;
