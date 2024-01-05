import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { TOAST_MESSAGE } from '@/constants/toast';

import { logout } from '@/apis/auth/auth.api';

import { useAuthStore } from '@/store/auth';

const useLogout = () => {
  const navigate = useNavigate();

  const setAuth = useAuthStore(state => state.setAuth);
  const setUser = useAuthStore(state => state.setUser);
  const setExpiredAt = useAuthStore(state => state.setExpiredAt);

  const {
    data: response,
    isError,
    mutateAsync: logoutMutate,
  } = useMutation({
    mutationKey: ['logout'],
    retry: false,
    mutationFn: logout,
    onSuccess: () => {
      clientLogout();
    },
  });

  const clientLogout = () => {
    setAuth(false);
    setUser({
      name: '',
      email: '',
      photo: '',
    });
    setExpiredAt(null);

    toast.success(TOAST_MESSAGE.LOGOUT);
    navigate('/', { replace: true });
  };

  return { logoutMutate, clientLogout };
};

export default useLogout;
