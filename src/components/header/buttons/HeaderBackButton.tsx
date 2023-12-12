import { ActiveButton } from '@/components/ui/buttons';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HeaderBackButton = () => {
  const navigate = useNavigate();

  const changePageHandler = () => {
    navigate('/');
  };

  return (
    <ActiveButton onClick={changePageHandler}>
      <FaArrowLeft className="h-full w-full" />
    </ActiveButton>
  );
};

export default HeaderBackButton;
