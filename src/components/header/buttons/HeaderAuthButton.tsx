import React from 'react';
import { useRecoilState } from 'recoil';
import { authState, userState } from '../../../store/authStore';
import HeaderActiveButton from '../../ui/buttons/HeaderActiveButton';
import useGoogleAuth from '../../../hooks/useGoogleAuth';
import { FaRegUserCircle } from 'react-icons/fa';

const HeaderAuthButton = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [user, setUser] = useRecoilState(userState);

  const { getGoogleCode } = useGoogleAuth();

  const loginHandler = () => {
    getGoogleCode();
  };

  return (
    <>
      {auth && (
        <HeaderActiveButton onClick={() => {}}>
          <div className="online avatar">
            <div className="w-full rounded-full">
              <img src={user.photo} />
            </div>
          </div>
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
