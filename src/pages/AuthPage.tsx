import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isLogin } from '../apis/auth.api';
import { authState, userState } from '../store/authStore';

interface AuthPageProps {
  children: React.ReactNode;
}

const AuthPage = ({ children }: AuthPageProps) => {
  const [auth, setAuth] = useRecoilState(authState);
  const [user, setUser] = useRecoilState(userState);

  const query = useQuery({ queryKey: ['isLogin'], queryFn: isLogin });
  const { data, isLoading, isError, error } = query;

  useEffect(() => {
    if (data && data.statusCode === 200) {
      setAuth(true);
      setUser(data.user);
    }
  }, [data]);

  return <>{children}</>;
};

export default AuthPage;
