import { useGoogleLogin } from '@react-oauth/google';

const useGetGoogleCode = () => {
  const getGoogleCode = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'redirect',
    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URL,
  });
  return getGoogleCode;
};

export default useGetGoogleCode;
