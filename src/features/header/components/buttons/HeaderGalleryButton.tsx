import { FaImage } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

import { HeaderActiveButton } from '@/ui/buttons';

const HeaderGalleryButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const changePageHandler = () => {
    if (location.pathname === '/gallery') return;
    navigate('/gallery');
  };

  return (
    <HeaderActiveButton onClick={changePageHandler}>
      <FaImage className="h-full w-full" />
    </HeaderActiveButton>
  );
};

export default HeaderGalleryButton;
