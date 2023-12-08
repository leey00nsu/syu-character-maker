import { useRecoilState } from 'recoil';
import AboutHeader from '../components/header/AboutHeader';
import Avatar from '../components/ui/Avatar';
import PageContainer from '../components/ui/PageContainer';
import Paragraph from '../components/ui/Paragraph';
import useGoogleAuth from '../hooks/useGoogleAuth';
import { userState } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const { googleLogout } = useGoogleAuth();

  const logoutHandler = async () => {
    await googleLogout();
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
