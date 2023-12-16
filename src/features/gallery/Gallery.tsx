import { WindowContainer } from '@/ui/containers';

import { PostList } from './components';

const Gallery = () => {
  return (
    <WindowContainer className="w-full h-full shrink-0">
      <WindowContainer.Header>갤러리</WindowContainer.Header>
      <PostList />
    </WindowContainer>
  );
};

export default Gallery;
