import { useGoogleLogin } from '@react-oauth/google';

const useGetGoogleCode = () => {
  const getGoogleCode = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'redirect',
    redirect_uri: window.location.origin + '/auth/google',
  });
  return getGoogleCode;
};

export default useGetGoogleCode;
