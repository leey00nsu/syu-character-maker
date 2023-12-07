import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLogin } from '../apis/auth.api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { authState, userState } from '../store/authStore';

interface AuthPageProps {
  element: JSX.Element;
  privated?: boolean;
}

const AuthPage = ({ element, privated }: AuthPageProps) => {
  const [auth, setAuth] = useRecoilState(authState);
  const [user, setUser] = useRecoilState(userState);

  const query = useQuery({
    queryKey: ['isLogin'],
    queryFn: isLogin,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { data, isLoading, isError, error } = query;

  useEffect(() => {
    if (!isLoading) {
      if (data && data.statusCode === 200) {
        setAuth(true);
        setUser(data.user);
      }
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError && privated) {
    return <Navigate to="/" />;
  }

  return element;
};

export default AuthPage;
