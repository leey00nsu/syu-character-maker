import useLogout from '@/hooks/auth/useLogout';

import { ActiveButton } from '@/ui/buttons';

const LogoutButton = () => {
  const { logoutMutate } = useLogout();

  return (
    <ActiveButton className="btn w-full" clickHandler={logoutMutate}>
      로그아웃
    </ActiveButton>
  );
};

export default LogoutButton;
