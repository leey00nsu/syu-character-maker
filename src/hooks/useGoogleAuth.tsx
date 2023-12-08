import { useGoogleLogin } from '@react-oauth/google';
import { useRecoilState } from 'recoil';
import { logout, validateGoogleUser } from '../apis/auth.api';
import { authState, userState } from '../store/authStore';

const useGoogleAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [user, setUser] = useRecoilState(userState);

  const getGoogleCode = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'redirect',
    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URL,
  });

  const googleLogin = async (code: string) => {
    const response = await validateGoogleUser(code);
    if (response && response.statusCode === 200) {
      setAuth(true);
      setUser(response.user);
    } else {
      console.log(response.message);
    }
  };

  const googleLogout = async () => {
    const response = await logout();
    setAuth(false);
    setUser({
      name: '',
      email: '',
      photo: '',
    });
  };

  return { getGoogleCode, googleLogin, googleLogout };
};

export default useGoogleAuth;
