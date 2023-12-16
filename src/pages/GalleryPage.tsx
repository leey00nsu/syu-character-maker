import { Gallery } from '@/features/gallery';
import { Header } from '@/features/header';

import { PageContainer } from '@/ui/containers';

const GalleryPage = () => {
  return (
    <PageContainer>
      <PageContainer.Header>
        <Header />
      </PageContainer.Header>

      <PageContainer.Content>
        <div className="flex w-full h-full p-2">
          <Gallery />
        </div>
      </PageContainer.Content>
    </PageContainer>
  );
};

export default GalleryPage;
