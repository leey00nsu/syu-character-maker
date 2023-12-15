import { AboutHeader } from '@/features/header';

import { PageContainer } from '@/ui/containers';
import { Paragraph } from '@/ui/texts';

const AboutPage = () => {
  return (
    <PageContainer>
      <PageContainer.Header>
        <AboutHeader />
      </PageContainer.Header>

      <PageContainer.Content>
        <section className="flex w-full flex-col items-center gap-4 p-4 py-10">
          <div className="flex">
            <img
              className="animate-custom-bounce h-[150px] w-[150px] sm:h-[300px] sm:w-[300px]"
              src="/suya.png"
            />
            <img
              className="animate-custom-bounce h-[150px] w-[150px] sm:h-[300px] sm:w-[300px]"
              src="/suho.png"
            />
          </div>
          <Paragraph size="4xl" weight="semibold">
            나만의 수야 수호 만들기
          </Paragraph>
          <div className="flex flex-col gap-2">
            <Paragraph size="md" weight="normal">
              나만의 수야 수호 만들기는 삼육대학교 마스코트인 수야,수호를 꾸밀
              수 있는 프로그램입니다.
            </Paragraph>
            <Paragraph size="md" weight="normal">
              삼육대학교 재학생이 만들었으며, 삼육대학교의 공식적인 프로그램이
              아닙니다.
            </Paragraph>
            <Paragraph size="md" weight="normal">
              본 프로그램은 상업적인 용도로의 제작을 목적으로 하지 않았음을
              알리며 어떠한 금전적인 이득도 추구하지 않습니다.
            </Paragraph>
            <Paragraph size="md" weight="normal">
              이 프로그램 및 그 안에 포함된 모든 리소스는 해당 저작권자의
              소유물이며 결과물에 대한 상업적인 이용은 엄격히 금지됩니다.
            </Paragraph>
            <Paragraph size="md" weight="normal">
              재미있게 즐겨주세요!
            </Paragraph>
            <Paragraph size="md" weight="normal">
              의견 및 오류 제보 : syucharactermaker@gmail.com
            </Paragraph>
          </div>
        </section>
      </PageContainer.Content>
    </PageContainer>
  );
};

export default AboutPage;
