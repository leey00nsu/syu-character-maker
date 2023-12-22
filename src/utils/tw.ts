import { ClassNameValue, twJoin, twMerge } from 'tailwind-merge';

// 테일윈드 CSS 클래스를 조합하는 함수
// twJoin으로 클래스를 조합하고, twMerge로 중복되는 클래스를 제거한다.
const tw = (...classNames: ClassNameValue[]) => {
  return twMerge(twJoin(classNames));
};

export default tw;
