import { FaImage } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { HeaderActiveButton } from '@/ui/buttons';

const HeaderBoardButton = () => {
  const navigate = useNavigate();

  const changePageHandler = () => {
    navigate('/board');
  };

  return (
    <HeaderActiveButton onClick={changePageHandler}>
      <FaImage className="h-full w-full" />
    </HeaderActiveButton>
  );
};

export default HeaderBoardButton;
