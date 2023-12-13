import Konva from 'konva';
import { useRef } from 'react';
import IndexHeader from '@/components/header/IndexHeader';
import Layer from '@/components/layer/Layer';
import Menu from '@/components/menu/Menu';
import Preview from '@/components/preview/Preview';
import PageContainer from '@/components/ui/PageContainer';

const IndexPage = () => {
  // canvas의 정보를 가져오기 위한 ref
  const stageRef = useRef<Konva.Stage | null>(null);

  return (
    <PageContainer>
      <PageContainer.Header>
        <IndexHeader />
      </PageContainer.Header>

      <PageContainer.Content>
        <div className="flex w-full shrink-0 items-center justify-center p-4 xl:h-full xl:w-1/2">
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
