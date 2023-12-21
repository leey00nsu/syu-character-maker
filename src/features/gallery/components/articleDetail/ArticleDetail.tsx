import { useAuthStore } from '@/store/authStore';

import LikeToggleButton from '@/ui/buttons/LikeToggleButton';
import { WindowContainer } from '@/ui/containers';
import { Image } from '@/ui/images';
import { LoadingSpinner } from '@/ui/loadings';
import { Paragraph } from '@/ui/texts';

import useGetArticle from '../../hooks/useGetArticle';
import useToggleLikeArticle from '../../hooks/useToggleLikeArticle';

const ArticleDetail = () => {
  const auth = useAuthStore(state => state.isAuth);

  const { response, isLoading } = useGetArticle();
  const { toggleLike } = useToggleLikeArticle();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!response) {
    return <LoadingSpinner />;
  }

  const toggleLikeHandler = async () => {
    if (auth) {
      await toggleLike(response.id);
    }
  };

  const formattedDate = new Intl.DateTimeFormat('ko', {
    dateStyle: 'long',
  }).format(new Date(response.createdAt));

  return (
    <WindowContainer className=" h-[498px] w-[350px]  sm:h-[752px] sm:w-[600px]">
      <WindowContainer.Header>{response.canvasName}</WindowContainer.Header>
      <div className="flex h-full w-full  ">
        <Image imgUrl={response.imageUrl} />
      </div>
      <div className="flex w-full flex-col justify-end p-2 text-end">
        <Paragraph size="lg" weight="light" isEllipsis>
          {response.author.name}
        </Paragraph>
        <Paragraph size="lg" weight="light" isEllipsis>
          {formattedDate}
        </Paragraph>
        <div className="flex flex-row items-center justify-end gap-1 rounded-xl bg-white bg-opacity-80 ">
          <Paragraph size="xl" weight="light" isEllipsis>
            {response.likeCount}
          </Paragraph>
          <LikeToggleButton
            isLiked={response.isLiked}
            toggleHandler={toggleLikeHandler}
          />
        </div>
      </div>

      {/* <div className="absolute right-0 flex w-full max-w-full flex-col justify-start gap-1  p-4 pt-8 text-end ">
        <div className="flex  justify-end rounded-xl bg-white bg-opacity-80 px-4 ">
          <Paragraph size="xl" weight="light" isEllipsis>
            asdasdsadsadasdsadasd1sa5d1sa5d1sa65d1as
          </Paragraph>
        </div>
        <div className="flex  justify-end rounded-xl bg-white bg-opacity-80 px-4">
          <Paragraph size="md" weight="light" isEllipsis>
            {formattedDate}
          </Paragraph>
        </div>

        <div className="flex flex-row items-center justify-end gap-1 rounded-xl bg-white bg-opacity-80 px-4">
          <Paragraph size="xl" weight="light" isEllipsis>
            {response.likeCount}
          </Paragraph>
          <LikeToggleButton
            isLiked={response.isLiked}
            toggleHandler={toggleLikeHandler}
          />
        </div>
      </div> */}
    </WindowContainer>
  );
};

export default ArticleDetail;
