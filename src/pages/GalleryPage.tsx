import { Gallery } from '@/features/gallery';
import { Header } from '@/features/header';

import { PageContainer } from '@/ui/containers';

const GalleryPage = () => {
  return (
    <PageContainer>
      <PageContainer.Header>
        <Header />
      </PageContainer.Header>

      <PageContainer.Content className="flex p-4">
        <Gallery />
      </PageContainer.Content>
    </PageContainer>
  );
};

export default GalleryPage;
