import { useState } from 'react';

import { ArticleOrder } from '@/apis/article/article.type';

import { WindowContainer } from '@/ui/containers';

import { ArticleFilter, ArticleList } from './components';

const Gallery = () => {
  const [orderBy, setOrderBy] = useState('date');
  const [dateOrder, setDateOrder] = useState<ArticleOrder>('DESC');
  const [likeOrder, setLikeOrder] = useState<ArticleOrder>('ASC');



  return (
    <WindowContainer className="h-full w-full shrink-0">
      <WindowContainer.Header>갤러리</WindowContainer.Header>
      <ArticleFilter />
      <ArticleList />
    </WindowContainer>
  );
};

export default Gallery;
