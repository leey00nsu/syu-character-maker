import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { ActiveButton } from '@/ui/buttons';

const HeaderBackButton = () => {
  const navigate = useNavigate();

  const changePageHandler = () => {
    navigate('..', { relative: 'path' });
  };

  return (
    <ActiveButton
      clickHandler={changePageHandler}
      className="btn-ghost h-12 w-12 sm:h-16 sm:w-16"
    >
      <FaArrowLeft className="h-full w-full" />
    </ActiveButton>
  );
};

export default HeaderBackButton;
