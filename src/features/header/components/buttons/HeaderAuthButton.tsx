import { FaRegUserCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/auth';

import useGetGoogleCode from '@/hooks/auth/useGetGoogleCode';

import Avatar from '@/ui/avatars/Avatar';
import { ActiveButton } from '@/ui/buttons';

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
        <ActiveButton
          clickHandler={navigateUserPageHandler}
          className="btn-ghost h-12 w-12 sm:h-16 sm:w-16"
        >
          <Avatar photo={user.photo} />
        </ActiveButton>
      )}
      {!isAuth && (
        <ActiveButton
          clickHandler={loginHandler}
          className="btn-ghost h-12 w-12 sm:h-16 sm:w-16"
        >
          <FaRegUserCircle className="h-full w-full" />
        </ActiveButton>
      )}
    </>
  );
};

export default HeaderAuthButton;
