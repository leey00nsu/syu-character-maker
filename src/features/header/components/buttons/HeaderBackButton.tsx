import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { HeaderActiveButton } from '@/ui/buttons';

const HeaderBackButton = () => {
  const navigate = useNavigate();

  const changePageHandler = () => {
    navigate('/');
  };

  return (
    <HeaderActiveButton onClick={changePageHandler}>
      <FaArrowLeft className="h-full w-full" />
    </HeaderActiveButton>
  );
};

export default HeaderBackButton;
