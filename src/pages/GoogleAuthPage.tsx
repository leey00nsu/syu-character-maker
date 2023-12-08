import { useParams, useSearchParams } from 'react-router-dom';
import useGoogleAuth from '../hooks/useGoogleAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleAuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { googleLogin } = useGoogleAuth();

  const code = searchParams.get('code');

  const loginProcess = async (code: string) => {
    await googleLogin(code);
    navigate('/');
  };

  useEffect(() => {
    if (code) {
      loginProcess(code);
    }
  }, [code]);

  return <></>;
};

export default GoogleAuthPage;
