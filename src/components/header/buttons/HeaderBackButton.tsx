import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ActiveButton from '../../ui/buttons/ActiveButton';

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
