import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/authStore';

interface UseValidateAuthProps {
  privated?: boolean;
}

const useValidateAuth = ({ privated }: UseValidateAuthProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const setAuth = useAuthStore(state => state.setAuth);
  const setUser = useAuthStore(state => state.setUser);
  const isAuth = useAuthStore(state => state.isAuth);
  const expiredAt = useAuthStore(state => state.expiredAt);
  const setExpiredAt = useAuthStore(state => state.setExpiredAt);

  const isExpired = !expiredAt || expiredAt < new Date();

  const navigate = useNavigate();
  const location = useLocation();

  useLayoutEffect(() => {
    setIsLoading(true);
  }, [isAuth, location.pathname]);

  useEffect(() => {
    useAuthStore.persist.rehydrate();

    // 유저 정보가 만료된 경우 로그아웃 처리
    if (isAuth && isExpired) {
      setAuth(false);
      setUser({
        name: '',
        email: '',
        photo: '',
      });
      setExpiredAt(null);
      navigate('/', { replace: true });
    }

    // 로그인이 필요한 페이지에 로그인하지 않은 경우
    if (!isAuth && privated) {
      navigate('/', { replace: true });
    }

    setIsLoading(false);
  }, [isAuth, location.pathname]);

  return { isLoading };
};

export default useValidateAuth;
