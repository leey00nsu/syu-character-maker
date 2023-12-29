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
  // TODO: 로그인 여부 확인 로직 고민 필요
  // --------------------------------------------------

  // const location = useLocation();
  // const navigate = useNavigate();
  // const isAuth = useAuthStore(state => state.isAuth);
  // const setAuth = useAuthStore(state => state.setAuth);
  // const setUser = useAuthStore(state => state.setUser);

  // const {
  //   data: response,
  //   isLoading,
  //   refetch,
  // } = useQuery({
  //   queryKey: ['validateAuth'],
  //   queryFn: getUser,
  //   retry: false,
  // });

  // useLayoutEffect(() => {
  //   refetch();
  // }, [location.pathname]);

  // useLayoutEffect(() => {
  //   if (!isLoading) {
  //     if (response?.statusCode === 200) {
  //       if (!isAuth && response.data) {
  //         setAuth(true);
  //         setUser(response.data);
  //       }
  //     } else {
  //       if (privated) {
  //         navigate('/');
  //       }
  //     }
  //   }
  // }, [isLoading, response]);
  // --------------------------------------------------

  return { isLoading };
};

export default useValidateAuth;
