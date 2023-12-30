import { Canvas } from '@/features/canvas';
import useCanvasLoading from '@/features/canvas/hooks/useCanvasLoading';
import { Header } from '@/features/header';
import { Layer } from '@/features/layer';
import { Menu } from '@/features/menu';

import { PageContainer } from '@/ui/containers';
import { LoadingSpinner } from '@/ui/loadings';

const CanvasPage = () => {
  const { isCanvasLoading } = useCanvasLoading();

  if (isCanvasLoading) return <LoadingSpinner />;

  return (
    <PageContainer>
      <PageContainer.Header>
        <Header isCanvas />
      </PageContainer.Header>

      <PageContainer.Content isCanvas>
        <div className="flex h-full w-full flex-col xl:flex-row">
          <div className="flex w-full items-center justify-center p-4 xl:h-full xl:w-1/2">
            <Canvas />
          </div>
          <div className="flex  w-full flex-col items-center gap-3 p-4 lg:h-full xl:w-1/2">
            <Menu />
            <Layer />
          </div>
        </div>
      </PageContainer.Content>
    </PageContainer>
  );
};

export default CanvasPage;
