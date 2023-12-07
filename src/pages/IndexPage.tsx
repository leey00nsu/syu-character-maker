import IndexHeader from '../components/header/IndexHeader';
import Preview from '../components/preview/Preview';
import Menu from '../components/menu/Menu';
import Layer from '../components/layer/Layer';
import { RefObject, useRef } from 'react';
import PageContainer from '../components/ui/PageContainer';
import { Stage } from 'react-konva';
import Konva from 'konva';
import AuthPage from './AuthPage';

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
