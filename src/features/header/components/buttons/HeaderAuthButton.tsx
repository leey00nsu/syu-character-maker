import { FaRegUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/authStore';

import useGetGoogleCode from '@/hooks/auth/useGetGoogleCode';

import Avatar from '@/ui/avatars/Avatar';
import ActiveButton from '@/ui/buttons/HeaderActiveButton';

const HeaderAuthButton = () => {
  const auth = useAuthStore(state => state.isAuth);
  const user = useAuthStore(state => state.user);

  const navigate = useNavigate();
  const getGoogleCode = useGetGoogleCode();

  const navigateUserPageHandler = () => {
    navigate('/user');
  };

  const loginHandler = () => {
    getGoogleCode();
  };

  return (
    <>
      {auth && (
        <ActiveButton onClick={navigateUserPageHandler}>
          <Avatar photo={user.photo} />
        </ActiveButton>
      )}
      {!auth && (
        <ActiveButton onClick={loginHandler}>
          <FaRegUserCircle className="h-full w-full" />
        </ActiveButton>
      )}
    </>
  );
};

export default HeaderAuthButton;
