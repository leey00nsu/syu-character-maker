import { WindowContainer } from '@/ui/containers';
import { Paragraph } from '@/ui/texts';

import { ArticleFilter, ArticleList } from './components';

const Gallery = () => {
  return (
    <WindowContainer className="grow">
      <WindowContainer.Header>
        <Paragraph
          className="translate-y-1"
          size="md"
          weight="medium"
          ellipsis
          fixSize
        >
          갤러리
        </Paragraph>
      </WindowContainer.Header>

      <WindowContainer.Content className="flex h-full flex-col gap-4 p-4 py-6">
        <ArticleFilter />
        <ArticleList />
      </WindowContainer.Content>
    </WindowContainer>
  );
};

export default Gallery;
