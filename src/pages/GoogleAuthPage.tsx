import { useParams, useSearchParams } from 'react-router-dom';
import useGoogleAuth from '../hooks/useGoogleAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleAuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { login } = useGoogleAuth();

  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      login(code);
      navigate('/');
    }
  }, [code]);

  return <></>;
};

export default GoogleAuthPage;
