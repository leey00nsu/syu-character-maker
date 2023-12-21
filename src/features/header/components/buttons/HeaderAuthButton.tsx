import { FaRegUserCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/authStore';

import useGetGoogleCode from '@/hooks/auth/useGetGoogleCode';

import Avatar from '@/ui/avatars/Avatar';
import ActiveButton from '@/ui/buttons/HeaderActiveButton';

const HeaderAuthButton = () => {
  const isAuth = useAuthStore(state => state.isAuth);
  const user = useAuthStore(state => state.user);

  const location = useLocation();
  const navigate = useNavigate();
  const getGoogleCode = useGetGoogleCode();

  const navigateUserPageHandler = () => {
    if (location.pathname === '/user') return;
    navigate('/user');
  };

  const loginHandler = () => {
    getGoogleCode();
  };

  return (
    <>
      {isAuth && (
        <ActiveButton onClick={navigateUserPageHandler}>
          <Avatar photo={user.photo} />
        </ActiveButton>
      )}
      {!isAuth && (
        <ActiveButton onClick={loginHandler}>
          <FaRegUserCircle className="h-full w-full" />
        </ActiveButton>
      )}
    </>
  );
};

export default HeaderAuthButton;
