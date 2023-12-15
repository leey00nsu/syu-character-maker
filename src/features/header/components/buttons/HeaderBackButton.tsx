import { HeaderActiveButton } from '@/ui/buttons';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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
