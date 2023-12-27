import { About } from '@/features/about';
import { Header } from '@/features/header';

import { PageContainer } from '@/ui/containers';

const AboutPage = () => {
  return (
    <PageContainer>
      <PageContainer.Header>
        <Header />
      </PageContainer.Header>

      <PageContainer.Content>
        <About />
      </PageContainer.Content>
    </PageContainer>
  );
};

export default AboutPage;
