import { HeaderActiveButton } from '@/components/ui/buttons';
import { FaQuestion } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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
