import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { logout } from '@/apis/auth/auth.api';

import { useAuthStore } from '@/store/authStore';

const useLogout = () => {
  const navigate = useNavigate();

  const setAuth = useAuthStore(state => state.setAuth);
  const setUser = useAuthStore(state => state.setUser);
  const setExpiredAt = useAuthStore(state => state.setExpiredAt);

  const {
    data: response,
    isError,
    error,
    mutateAsync: logoutMutation,
  } = useMutation({
    mutationKey: ['logout'],
    retry: false,
    mutationFn: logout,
  });

  useEffect(() => {
    const logout = async () => {
      if (isError) {
      }
      if (response) {
        setAuth(false);
        setUser({
          name: '',
          email: '',
          photo: '',
        });
        setExpiredAt(null);
        toast.success('로그아웃 되었습니다.');
        navigate('/', { replace: true });
      }
    };

    logout();
  }, [isError, response]);

  return { logoutMutation };
};

export default useLogout;
