import { FaQuestion, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import HeaderActiveButton from './buttons/HeaderActiveButton';
import HeaderContainer from './HeaderContainer';

const AboutHeader = () => {
  const navigate = useNavigate();

  const changePageHandler = (changes: string) => {
    if (changes === 'index') navigate('/');
    if (changes === 'about') navigate('/about');
  };

  return (
    <HeaderContainer>
      <HeaderContainer.Left>
        <HeaderActiveButton mode="index" onClick={changePageHandler}>
          <FaArrowLeft className="h-full w-full" />
        </HeaderActiveButton>
      </HeaderContainer.Left>

      <HeaderContainer.Right>
        <HeaderActiveButton mode="about" onClick={changePageHandler}>
          <FaQuestion className="h-full w-full" />
        </HeaderActiveButton>
      </HeaderContainer.Right>
    </HeaderContainer>
  );
};

export default AboutHeader;
