import useValidateAuth from '@/hooks/auth/useValidateAuth';

import { LoadingSpinner } from '@/ui/loadings';

interface AuthContainerProps {
  element: JSX.Element;
  privated?: boolean;
}

// 로그인 상태를 체크하는 페이지
const AuthContainer = ({ element, privated }: AuthContainerProps) => {
  const { isLoading } = useValidateAuth({ privated });
  

  if (isLoading) return <LoadingSpinner />;

  return element;
};

export default AuthContainer;
