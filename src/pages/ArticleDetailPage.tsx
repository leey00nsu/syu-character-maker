import ArticleDetail from '@/features/gallery/components/articleDetail/ArticleDetail';
import { Header } from '@/features/header';

import { PageContainer } from '@/ui/containers';

const ArticleDetailPage = () => {
  return (
    <PageContainer>
      <PageContainer.Header>
        <Header />
      </PageContainer.Header>

      <PageContainer.Content>
        <div className="flex h-full w-full flex-col ">
          <div className="flex w-full items-center justify-center p-4 ">
            <ArticleDetail />
          </div>
        </div>
      </PageContainer.Content>
    </PageContainer>
  );
};

export default ArticleDetailPage;
