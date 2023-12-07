import React from 'react';
import PageContainer from '../components/ui/PageContainer';
import AboutHeader from '../components/header/AboutHeader';
import Paragraph from '../components/ui/Paragraph';
import Avatar from '../components/ui/Avatar';
import { useRecoilState } from 'recoil';
import { userState } from '../store/authStore';

const UserPage = () => {
  const [user, setUser] = useRecoilState(userState);

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
          </div>
        </section>
      </PageContainer.Content>
    </PageContainer>
  );
};

export default UserPage;
