import { FaImage } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

import { ActiveButton } from '@/ui/buttons';

const HeaderGalleryButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const changePageHandler = () => {
    if (location.pathname === '/gallery') return;
    navigate('/gallery');
  };

  return (
    <ActiveButton
      clickHandler={changePageHandler}
      className="btn-ghost h-12 w-12 sm:h-16 sm:w-16"
    >
      <FaImage className="h-full w-full" />
    </ActiveButton>
  );
};

export default HeaderGalleryButton;
