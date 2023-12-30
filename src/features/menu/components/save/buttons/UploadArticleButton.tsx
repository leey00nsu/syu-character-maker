import tw from '@/utils/tw';

import { useCanvasStore } from '@/store/canvasStore';

import useModal from '@/hooks/modal/useModal';

import { ActiveButton } from '@/ui/buttons';
import { LoadingDots } from '@/ui/loadings';

import useGetArticleLimit from '../hooks/useGetArticleLimit';
import useUploadArticle from '../hooks/useUploadArticle';

const UploadArticleButton = () => {
  const canvasName = useCanvasStore(state => state.canvasName);

  const { response } = useGetArticleLimit();
  const { uploadHandler, isPending } = useUploadArticle();
  const { addModal } = useModal();

  const showUploadModal = () => {
    addModal({
      type: 'confirm',
      title: '업로드',
      content: '지금 그림을 업로드할까요?',
      callback: uploadHandler,
    });
  };

  const { availableCount, maxLimit, isAvailable } = response ?? {};

  // 업로드 가능 횟수가 남아있고 , 캔버스 이름이 존재하고 , 업로드 중이 아니면 -> 업로드 가능
  const isUploadable = isAvailable && canvasName && !isPending;

  const classNames = tw(
    'btn-primary btn btn-wide',
    !isUploadable && 'btn-disabled',
  );

  const context = () => {
    if (isPending) {
      return <LoadingDots />;
    }

    if (!isAvailable) {
      return '오늘 업로드 횟수를 초과하였어요';
    }

    if (!canvasName) {
      return '작품명을 입력해주세요.';
    }

    return `업로드 ${availableCount}/${maxLimit} `;
  };

  return (
    <ActiveButton
      clickHandler={isUploadable ? showUploadModal : () => {}}
      className={classNames}
    >
      {context()}
    </ActiveButton>
  );
};

export default UploadArticleButton;
