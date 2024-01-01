import { Description, HeaderImage } from './components';

const About = () => {
  return (
    <div className="flex w-full flex-col items-center gap-8 p-4 py-10">
      <HeaderImage />
      <Description />
    </div>
  );
};

export default About;
