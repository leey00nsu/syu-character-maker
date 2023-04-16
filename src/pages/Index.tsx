import React from "react";
import Header from "../components/ui/Header";
import Preview from "../components/Preview";

const Index = () => {
  return (
    <div className="flex justify-center w-screen">
      <div className="flex flex-col items-center w-full max-w-4xl">
        <Header />
        <Preview />
      </div>
    </div>
  );
};

export default Index;
