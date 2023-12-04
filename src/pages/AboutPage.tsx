import AboutHeader from '../components/header/AboutHeader';
import PageContainer from '../components/ui/PageContainer';

const AboutPage = () => {
  return (
    <PageContainer>
      <PageContainer.Header>
        <AboutHeader />
      </PageContainer.Header>

      <PageContainer.Content>
        <p>나만의 수야 수호 만들기</p>
      </PageContainer.Content>
    </PageContainer>
  );
};

export default AboutPage;
