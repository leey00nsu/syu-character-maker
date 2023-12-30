import { useAuthStore } from '@/store/authStore';

import MenuContentContainer from '../containers/MenuContentContainer';
import { UploadArticleButton } from './buttons';
import SaveImageButton from './buttons/SaveFileButton';

const Save = () => {
  const auth = useAuthStore(state => state.isAuth);

  return (
    <MenuContentContainer>
      <MenuContentContainer.Column>
        <SaveImageButton />
        {auth && <UploadArticleButton />}
      </MenuContentContainer.Column>
    </MenuContentContainer>
  );
};

export default Save;
