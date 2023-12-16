import { FaImage } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { HeaderActiveButton } from '@/ui/buttons';

const HeaderGalleryButton = () => {
  const navigate = useNavigate();

  const changePageHandler = () => {
    navigate('/gallery');
  };

  return (
    <HeaderActiveButton onClick={changePageHandler}>
      <FaImage className="h-full w-full" />
    </HeaderActiveButton>
  );
};

export default HeaderGalleryButton;
