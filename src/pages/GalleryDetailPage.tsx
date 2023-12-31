import { GalleryDetail } from '@/features/gallery';
import { Header } from '@/features/header';

import { PageContainer } from '@/ui/containers';

const GalleryDetailPage = () => {
  return (
    <PageContainer>
      <PageContainer.Header>
        <Header />
      </PageContainer.Header>

      <PageContainer.Content className="flex flex-col items-center justify-start p-4">
        <GalleryDetail />
      </PageContainer.Content>
    </PageContainer>
  );
};

export default GalleryDetailPage;
