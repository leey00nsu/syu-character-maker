import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isLogin } from '../apis/auth.api';
import { authState, userState } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

interface AuthPageProps {
  element: JSX.Element;
  privated?: boolean;
}

const AuthPage = ({ element, privated }: AuthPageProps) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);
  const [user, setUser] = useRecoilState(userState);

  const query = useQuery({ queryKey: ['isLogin'], queryFn: isLogin });
  const { data, isLoading, isError, error } = query;

  useEffect(() => {
    if (data && data.statusCode === 200) {
      setAuth(true);
      setUser(data.user);
    }
    if (data && data.statusCode !== 200 && privated) {
      navigate('/');
    }
  }, [data]);

  return element;
};

export default AuthPage;
