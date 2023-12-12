import ActiveButton from '@/components/ui/buttons/ActiveButton';
import { FaQuestion } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HeaderAboutButton = () => {
  const navigate = useNavigate();

  const changePageHandler = () => {
    navigate('/about');
  };

  return (
    <ActiveButton onClick={changePageHandler}>
      <FaQuestion className="h-full w-full" />
    </ActiveButton>
  );
};

export default HeaderAboutButton;
