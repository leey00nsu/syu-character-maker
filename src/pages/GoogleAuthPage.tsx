import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import useGoogleLogin from '@/hooks/auth/useGoogleLogin';

// google oauth callback 페이지
const GoogleAuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const code = searchParams.get('code');

  const { googleLoginMutate } = useGoogleLogin();

  const loginHandler = async () => {
    if (!code) {
      navigate('/');
    }
    if (code) {
      await googleLoginMutate(code);
    }
  };

  useEffect(() => {
    loginHandler();
  }, [code]);

  return <></>;
};

export default GoogleAuthPage;
