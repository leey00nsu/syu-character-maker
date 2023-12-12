import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { logout } from '../../apis/auth.api';
import { authState, userState } from '../../store/authStore';

const useLogout = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [user, setUser] = useRecoilState(userState);
  const queryClient = useQueryClient();

  const {
    data: logoutData,
    isError,
    error,
    mutateAsync,
  } = useMutation({
    mutationKey: ['logout'],
    retry: false,
    mutationFn: logout,
  });

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
    if (logoutData) {
      if (logoutData.statusCode === 200) {
        queryClient.removeQueries({ queryKey: ['validateAuth'] });
        setAuth(false);
        setUser({
          name: '',
          email: '',
          photo: '',
        });
      } else {
        console.log(logoutData.message);
      }
    }
  }, [isError, logoutData]);

  return mutateAsync;
};

export default useLogout;
