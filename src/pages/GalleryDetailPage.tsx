import { GalleryDetail } from '@/features/gallery';
import { Header } from '@/features/header';

import { PageContainer } from '@/ui/containers';

const GalleryDetailPage = () => {
  return (
    <PageContainer>
      <PageContainer.Header>
        <Header />
      </PageContainer.Header>

      <PageContainer.Content>
        <div className="flex h-full w-full flex-col ">
          <div className="flex w-full items-center justify-center p-4 ">
            <GalleryDetail />
          </div>
        </div>
      </PageContainer.Content>
    </PageContainer>
  );
};

export default GalleryDetailPage;
