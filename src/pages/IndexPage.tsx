import { IndexHeader } from '@/features/header';
import { Layer } from '@/features/layer';
import { Menu } from '@/features/menu';
import { Preview } from '@/features/preview';
import { PageContainer } from '@/ui/containers';
import Konva from 'konva';
import { useRef } from 'react';

const IndexPage = () => {
  // canvas의 정보를 가져오기 위한 ref
  const stageRef = useRef<Konva.Stage>(null);

  return (
    <PageContainer>
      <PageContainer.Header>
        <IndexHeader />
      </PageContainer.Header>

      <PageContainer.Content>
        <div className="flex w-full  items-center justify-center p-4 xl:h-full xl:w-1/2">
          <Preview stageRef={stageRef} />
        </div>
        <div className="flex  w-full flex-col items-center gap-3 p-4 lg:h-full xl:w-1/2">
          <Menu stageRef={stageRef} />
          <Layer />
        </div>
      </PageContainer.Content>
    </PageContainer>
  );
};

export default IndexPage;
