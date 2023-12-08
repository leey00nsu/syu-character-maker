import { useQuery } from '@tanstack/react-query';
import { useEffect, useLayoutEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getUser } from '../apis/auth.api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { authState, userState } from '../store/authStore';

interface AuthPageProps {
  element: JSX.Element;
  privated?: boolean;
}

const AuthPage = ({ element, privated }: AuthPageProps) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);
  const [user, setUser] = useRecoilState(userState);

  const query = useQuery({
    queryKey: ['getUser'],
    queryFn: getUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { data, isLoading, isError, error } = query;

  useLayoutEffect(() => {
    if (!isLoading) {
      if (data && data.statusCode === 200) {
        setAuth(true);
        setUser(data.user);
      } else {
        navigate('/');
      }
    }
  }, [isLoading, auth]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // if (data?.statusCode !== 200 && privated) {
  //   return <Navigate to="/" />;
  // }

  return element;
};

export default AuthPage;
