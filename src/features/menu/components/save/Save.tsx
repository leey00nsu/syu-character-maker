import Konva from 'konva';
import { RefObject } from 'react';

import { useAuthStore } from '@/store/authStore';

import MenuContentContainer from '../containers/MenuContentContainer';
import SaveFile from './SaveFile';
import UploadFile from './UploadFile';

interface SaveProps {
  stageRef: RefObject<Konva.Stage>;
}

const Save = ({ stageRef }: SaveProps) => {
  const auth = useAuthStore(state => state.isAuth);

  return (
    <MenuContentContainer>
      <MenuContentContainer.Column>
        <SaveFile stageRef={stageRef} />
        {auth && <UploadFile stageRef={stageRef} />}
      </MenuContentContainer.Column>
    </MenuContentContainer>
  );
};

export default Save;
