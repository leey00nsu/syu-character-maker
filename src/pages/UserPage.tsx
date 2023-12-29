import { useAuthStore } from '@/store/authStore';

import useLogout from '@/hooks/auth/useLogout';

import { Header } from '@/features/header';

import { Avatar } from '@/ui/avatars';
import { PageContainer } from '@/ui/containers';
import { Paragraph } from '@/ui/texts';

const UserPage = () => {
  const user = useAuthStore(state => state.user);

  const { logoutMutation } = useLogout();

  const logoutHandler = async () => {
    await logoutMutation();
  };

  return (
    <PageContainer>
      <PageContainer.Header>
        <Header />
      </PageContainer.Header>

      <PageContainer.Content>
        <section className="flex w-full flex-col items-center gap-4 p-4 py-10">
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
            <button className="btn" onClick={logoutHandler}>
              로그아웃
            </button>
          </div>
        </section>
      </PageContainer.Content>
    </PageContainer>
  );
};

export default UserPage;
