import { useAuthStore } from '@/store/auth';

import { Paragraph } from '@/ui/texts';

import MenuContentContainer from '../containers/MenuContentContainer';
import { UploadArticleButton } from './buttons';
import SaveImageButton from './buttons/SaveFileButton';

const Save = () => {
  const auth = useAuthStore(state => state.isAuth);

  return (
    <MenuContentContainer>
      <MenuContentContainer.Column>
        <SaveImageButton />
        {!auth && (
          <Paragraph className="w-full text-center" size="xs" weight="light">
            로그인하고 그림을 공유해보세요!
          </Paragraph>
        )}
        {auth && <UploadArticleButton />}
      </MenuContentContainer.Column>
    </MenuContentContainer>
  );
};

export default Save;
