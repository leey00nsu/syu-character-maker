import TotalArticleCount from './TotalArticleCount';
import TotalUserCount from './TotalUserCount';

const TotalCount = () => {
  return (
    <div className="flex flex-col">
      <TotalUserCount />
      <TotalArticleCount />
    </div>
  );
};

export default TotalCount;
