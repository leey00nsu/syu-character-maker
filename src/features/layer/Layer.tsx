import WindowContainer from '@/ui/containers/WindowContainer';

import { LayerList } from './components';

const Layer = () => {
  return (
    <WindowContainer className="h-[300px] min-h-[200px] w-[350px] bg-white sm:w-[600px]  xl:h-[28%] xl:max-h-[28%]">
      <WindowContainer.Header>레이어</WindowContainer.Header>
      <LayerList />
    </WindowContainer>
  );
};

export default Layer;
