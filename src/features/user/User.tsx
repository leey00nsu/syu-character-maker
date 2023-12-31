import { useAuthStore } from '@/store/authStore';

import useLogout from '@/hooks/auth/useLogout';

import { Avatar } from '@/ui/avatars';
import { ActiveButton } from '@/ui/buttons';
import { Paragraph } from '@/ui/texts';

const User = () => {
  const user = useAuthStore(state => state.user);

  const { logoutMutate } = useLogout();

  const logoutHandler = async () => {
    await logoutMutate();
  };

  return (
    <div className="flex w-full flex-col items-center gap-4 p-4 py-10">
      <div className="flex h-20 justify-center">
        <Avatar photo={user.photo} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <Paragraph size="md" weight="normal">
          {user.email}
        </Paragraph>
        <Paragraph size="md" weight="normal">
          {user.name}
        </Paragraph>
        <ActiveButton className="btn w-full" clickHandler={logoutHandler}>
          로그아웃
        </ActiveButton>
      </div>
    </div>
  );
};

export default User;
