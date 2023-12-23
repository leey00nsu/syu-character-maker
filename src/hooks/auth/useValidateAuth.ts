import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/authStore';

interface UseValidateAuthProps {
  privated?: boolean;
}

const useValidateAuth = ({ privated }: UseValidateAuthProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const isAuth = useAuthStore(state => state.isAuth);

  const navigate = useNavigate();
  const location = useLocation();

  useLayoutEffect(() => {
    setIsLoading(true);
  }, [isAuth, location.pathname]);

  useEffect(() => {
    useAuthStore.persist.rehydrate();

    if (!isAuth && privated) {
      navigate('/', { replace: true });
    }

    setIsLoading(false);
  }, [isAuth, location.pathname]);

  return { isLoading };
};

export default useValidateAuth;
