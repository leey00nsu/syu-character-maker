import { useQuery } from '@tanstack/react-query';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { getUser } from '@/apis/auth/auth.api';

import { authState, userState } from '@/store/authStore';

interface UseValidateAuthProps {
  privated?: boolean;
  element: JSX.Element;
}

const useValidateAuth = ({ privated, element }: UseValidateAuthProps) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);
  const [user, setUser] = useRecoilState(userState);

  const { data: response, isLoading } = useQuery({
    queryKey: ['validateAuth'],
    queryFn: getUser,
    retry: false,
    staleTime: 1000 * 60 * 60,
  });

  useLayoutEffect(() => {
    if (!isLoading) {
      if (response && response.data && response.statusCode === 200) {
        setAuth(true);
        setUser(response.data);
      } else {
        if (privated) {
          navigate('/');
        }
      }
    }
  }, [isLoading, element]);

  return { isLoading };
};

export default useValidateAuth;
