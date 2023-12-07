import React from 'react';
import { useRecoilState } from 'recoil';
import { authState, userState } from '../../../store/authStore';
import HeaderActiveButton from '../../ui/buttons/HeaderActiveButton';
import useGoogleAuth from '../../../hooks/useGoogleAuth';
import { FaRegUserCircle } from 'react-icons/fa';
import Avatar from '../../ui/Avatar';
import { useNavigate } from 'react-router-dom';

const HeaderAuthButton = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [user, setUser] = useRecoilState(userState);

  const navigate = useNavigate();
  const { getGoogleCode } = useGoogleAuth();

  const navigateUserPageHandler = () => {
    navigate('/user');
  };

  const loginHandler = () => {
    getGoogleCode();
  };

  return (
    <>
      {auth && (
        <HeaderActiveButton onClick={navigateUserPageHandler}>
          <Avatar photo={user.photo} />
        </HeaderActiveButton>
      )}
      {!auth && (
        <HeaderActiveButton onClick={loginHandler}>
          <FaRegUserCircle className="h-full w-full" />
        </HeaderActiveButton>
      )}
    </>
  );
};

export default HeaderAuthButton;
