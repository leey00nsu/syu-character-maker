import TotalCount from '../totalCount/TotalCount';
import DescriptionText from './DescriptionText';
import DescriptionTitle from './DescriptionTitle';

const Description = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <DescriptionTitle />
      <TotalCount />
      <DescriptionText />
    </div>
  );
};

export default Description;
