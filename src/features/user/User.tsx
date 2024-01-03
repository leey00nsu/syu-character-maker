import { useAuthStore } from '@/store/auth';

import { Avatar } from '@/ui/avatars';
import { Paragraph } from '@/ui/texts';

import { LogoutButton } from './buttons';

const User = () => {
  const user = useAuthStore(state => state.user);

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
        <LogoutButton />
      </div>
    </div>
  );
};

export default User;
