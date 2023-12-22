import { Navigate } from 'react-router-dom';

import { useAuthStore } from '@/store/authStore';

import useModal from '@/hooks/modal/useModal';

import LikeToggleButton from '@/ui/buttons/LikeToggleButton';
import { WindowContainer } from '@/ui/containers';
import { Image } from '@/ui/images';
import { LoadingSpinner } from '@/ui/loadings';
import { Paragraph } from '@/ui/texts';

import useGetArticle from '../../hooks/useGetArticle';
import useRemoveArticle from '../../hooks/useRemoveArticle';
import useToggleLikeArticle from '../../hooks/useToggleLikeArticle';
import ArticleRemoveButton from './ArticleRemoveButton';

const ArticleDetail = () => {
  const auth = useAuthStore(state => state.isAuth);

  const { response, isLoading, isError } = useGetArticle();
  const { remove } = useRemoveArticle();
  const { toggleLike } = useToggleLikeArticle();
  const { addModal } = useModal();

  if (isError) {
    return <Navigate to="/gallery" />;
  }

  if (isLoading || !response) {
    return <LoadingSpinner />;
  }

  const toggleLikeHandler = async () => {
    if (auth) {
      await toggleLike(response.id);
    }
  };

  const removeArticleHandler = () => {
    addModal({
      type: 'confirm',
      title: '게시글 삭제',
      content: '게시글을 삭제하시겠습니까?',
      callback: remove.bind(this, { articleId: response.id }),
    });
  };

  const formattedDate = new Intl.DateTimeFormat('ko', {
    dateStyle: 'long',
  }).format(new Date(response.createdAt));

  return (
    <WindowContainer className=" h-[550px] w-[350px]  justify-between sm:h-[700px] sm:w-[500px]">
      <WindowContainer.Header>
        <Paragraph
          className="translate-y-1"
          size="md"
          weight="medium"
          ellipsis
          fixSize
        >
          {response.canvasName}
        </Paragraph>
      </WindowContainer.Header>

      {response.isOwner && (
        <WindowContainer.HeaderButton>
          <ArticleRemoveButton removeArticleHandler={removeArticleHandler} />
        </WindowContainer.HeaderButton>
      )}

      <div className="flex h-full w-full  ">
        <Image imgUrl={response.imageUrl} />
      </div>
      <div className="flex w-full flex-col justify-end p-2 text-end">
        <Paragraph size="lg" weight="light" ellipsis>
          {response.author.name}
        </Paragraph>
        <Paragraph size="lg" weight="light" ellipsis>
          {formattedDate}
        </Paragraph>
        <div className="flex flex-row items-center justify-end gap-1 rounded-xl bg-white bg-opacity-80 ">
          <Paragraph size="xl" weight="light" ellipsis>
            {response.likeCount}
          </Paragraph>
          <LikeToggleButton
            isLiked={response.isLiked}
            toggleHandler={toggleLikeHandler}
          />
        </div>
      </div>
    </WindowContainer>
  );
};

export default ArticleDetail;
