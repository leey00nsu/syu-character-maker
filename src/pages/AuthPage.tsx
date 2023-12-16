import useValidateAuth from '@/hooks/auth/useValidateAuth';

import { LoadingSpinner } from '@/ui/loadings';

interface AuthPageProps {
  element: JSX.Element;
  privated?: boolean;
}

// 로그인 상태를 체크하는 페이지
// privated가 true이면 로그인 상태가 아니면 '/'로 이동
const AuthPage = ({ element, privated }: AuthPageProps) => {
  const { isLoading } = useValidateAuth({ element, privated });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return element;
};

export default AuthPage;
