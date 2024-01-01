import { ParagraphSize, ParagraphWeight } from '@/ui/texts/Paragraph';

export const DESCRIPTION_TITLE = '나만의 수야 수호 만들기.';

interface DESCRIPTION_TEXT {
  size: ParagraphSize;
  weight: ParagraphWeight;
  text: string;
}

export const DESCRIPTION_TEXTS: DESCRIPTION_TEXT[] = [
  {
    size: 'lg',
    weight: 'medium',
    text: '나만의 수야 수호 만들기는 삼육대학교 마스코트인 수야,수호를 꾸밀 수 있는 프로그램입니다.',
  },
  {
    size: 'md',
    weight: 'light',
    text: '삼육대학교 재학생이 만들었으며, 삼육대학교의 공식적인 프로그램이 아닙니다.',
  },
  {
    size: 'md',
    weight: 'light',
    text: '본 프로그램은 상업적인 용도로의 제작을 목적으로 하지 않았음을 알리며 어떠한 금전적인 이득도 추구하지 않습니다.',
  },
  {
    size: 'md',
    weight: 'light',
    text: '이 프로그램 및 그 안에 포함된 모든 리소스는 해당 저작권자의 소유물이며 결과물에 대한 상업적인 이용은 엄격히 금지됩니다.',
  },
  {
    size: 'md',
    weight: 'light',
    text: '재미있게 즐겨주세요!',
  },
  {
    size: 'md',
    weight: 'light',
    text: 'special thanks to ov***,ez***',
  },
  {
    size: 'md',
    weight: 'light',
    text: '의견 및 오류 제보 : syucharactermaker@gmail.com',
  },
];
