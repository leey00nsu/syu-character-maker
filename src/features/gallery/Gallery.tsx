import { WindowContainer } from '@/ui/containers';
import { Paragraph } from '@/ui/texts';

import { ArticleFilter, ArticleList } from './components';

const Gallery = () => {
  return (
    <WindowContainer className="h-full w-full shrink-0">
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
      <ArticleFilter />
      <ArticleList />
    </WindowContainer>
  );
};

export default Gallery;
