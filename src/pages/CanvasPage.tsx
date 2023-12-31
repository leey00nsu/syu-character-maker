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

      <PageContainer.Content className="flex flex-col gap-4 p-4 xl:flex-row">
        <div className="flex items-center justify-center xl:w-1/2">
          <Canvas />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 xl:w-1/2">
          <Menu />
          <Layer />
        </div>
      </PageContainer.Content>
    </PageContainer>
  );
};

export default CanvasPage;
