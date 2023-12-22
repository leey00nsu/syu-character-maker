import WindowContainer from '@/ui/containers/WindowContainer';
import { Paragraph } from '@/ui/texts';

import { LayerList } from './components';

const Layer = () => {
  return (
    <WindowContainer className="h-[300px] min-h-[200px] w-[350px] bg-white sm:w-[600px]  xl:h-[28%] ">
      <WindowContainer.Header>
        <Paragraph
          className="translate-y-1"
          size="md"
          weight="medium"
          ellipsis
          fixSize
        >
          레이어
        </Paragraph>
      </WindowContainer.Header>
      <LayerList />
    </WindowContainer>
  );
};

export default Layer;
