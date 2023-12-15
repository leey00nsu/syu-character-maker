import { FaQuestion } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { HeaderActiveButton } from '@/ui/buttons';

const HeaderAboutButton = () => {
  const navigate = useNavigate();

  const changePageHandler = () => {
    navigate('/about');
  };

  return (
    <HeaderActiveButton onClick={changePageHandler}>
      <FaQuestion className="h-full w-full" />
    </HeaderActiveButton>
  );
};

export default HeaderAboutButton;
