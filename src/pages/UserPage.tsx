import { Header } from '@/features/header';
import { User } from '@/features/user';

import { PageContainer } from '@/ui/containers';

const UserPage = () => {
  return (
    <PageContainer>
      <PageContainer.Header>
        <Header />
      </PageContainer.Header>

      <PageContainer.Content>
        <User />
      </PageContainer.Content>
    </PageContainer>
  );
};

export default UserPage;
