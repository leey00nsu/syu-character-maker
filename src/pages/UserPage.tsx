import { useRecoilState } from 'recoil';
import AboutHeader from '@/components/header/AboutHeader';
import Avatar from '@/components/ui/Avatar';
import PageContainer from '@/components/ui/containers/PageContainer';
import Paragraph from '@/components/ui/Paragraph';
import useLogout from '@/hooks/auth/useLogout';
import { userState } from '@/store/authStore';

const UserPage = () => {
  const [user, setUser] = useRecoilState(userState);

  const logout = useLogout();

  const logoutHandler = async () => {
    await logout();
  };

  return (
    <PageContainer>
      <PageContainer.Header>
        <AboutHeader />
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
