import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/auth';

import useLogout from './useLogout';

interface UseValidateAuthProps {
  privated?: boolean;
}

const useValidateAuth = ({ privated }: UseValidateAuthProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const isAuth = useAuthStore(state => state.isAuth);
  const expiredAt = useAuthStore(state => state.expiredAt);

  const isExpired = !expiredAt || expiredAt < new Date();

  const { clientLogout } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();

  useLayoutEffect(() => {
    setIsLoading(true);
  }, [isAuth]);

  useEffect(() => {
    // 브라우저 새로고침 시 스토어에 저장된 유저 정보를 불러온다
    useAuthStore.persist.rehydrate();

    // 유저 정보가 만료된 경우 브라우저 로그아웃 처리
    if (isAuth && isExpired) {
      clientLogout();
    }

    // 로그인이 필요한 페이지에 로그인하지 않은 경우 인덱스 페이지로 이동
    if (!isAuth && privated) {
      navigate('/', { replace: true });
    }

    setIsLoading(false);
  }, [isAuth, location.pathname]);

  return { isLoading };
};

export default useValidateAuth;
