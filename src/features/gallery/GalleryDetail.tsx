import { Navigate } from 'react-router-dom';

import { useAuthStore } from '@/store/auth';

import useModal from '@/hooks/modal/useModal';

import { WindowContainer } from '@/ui/containers';
import { LoadingSpinner } from '@/ui/loadings';

import ArticleDetail from './components/articleDetail/ArticleDetail';
import { ArticleRemoveButton } from './components/buttons';
import useGetArticle from './hooks/useGetArticle';
import useRemoveArticle from './hooks/useRemoveArticle';
import useToggleLikeArticle from './hooks/useToggleLikeArticle';

const GalleryDetail = () => {
  const auth = useAuthStore(state => state.isAuth);

  const { response, isLoading, isError } = useGetArticle();
  const { removeMutate } = useRemoveArticle();
  const { toggleLikeMutate } = useToggleLikeArticle();
  const { addModal } = useModal();

  if (isError) {
    return <Navigate to="/gallery" />;
  }

  if (isLoading || !response) {
    return <LoadingSpinner />;
  }

  const toggleLikeHandler = async () => {
    if (auth) {
      await toggleLikeMutate(response.id);
    }
  };

  const removeArticleHandler = () => {
    addModal({
      type: 'confirm',
      title: '게시글 삭제',
      content: '게시글을 삭제하시겠습니까?',
      callback: removeMutate.bind(this, { articleId: response.id }),
    });
  };

  return (
    <WindowContainer className="w-full max-w-[500px]">
      {response.isAuthor && (
        <WindowContainer.HeaderButton>
          <ArticleRemoveButton removeArticleHandler={removeArticleHandler} />
        </WindowContainer.HeaderButton>
      )}

      <WindowContainer.Content>
        <ArticleDetail
          response={response}
          toggleLikeHandler={toggleLikeHandler}
        />
      </WindowContainer.Content>
    </WindowContainer>
  );
};

export default GalleryDetail;
