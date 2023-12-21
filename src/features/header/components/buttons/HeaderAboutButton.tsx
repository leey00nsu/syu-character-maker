import { FaQuestion } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

import { HeaderActiveButton } from '@/ui/buttons';

const HeaderAboutButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const changePageHandler = () => {
    if (location.pathname === '/about') return;
    navigate('/about');
  };

  return (
    <HeaderActiveButton onClick={changePageHandler}>
      <FaQuestion className="h-full w-full" />
    </HeaderActiveButton>
  );
};

export default HeaderAboutButton;
