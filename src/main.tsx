import './index.css';
import ReactDOM from 'react-dom/client';
import IndexPage from './pages/IndexPage';
import AboutPage from './pages/AboutPage';
import { RecoilRoot } from 'recoil';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GoogleAuthPage from './pages/GoogleAuthPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserPage from './pages/UserPage';
import AuthPage from './pages/AuthPage';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <AuthPage element={<IndexPage />} />,
    errorElement: <Navigate to="/" />,
  },
  {
    path: '/about',
    element: <AuthPage element={<AboutPage />} />,
  },
  {
    path: '/user',
    element: <AuthPage privated element={<UserPage />} />,
  },
  {
    path: '/auth/google',
    element: <GoogleAuthPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </RecoilRoot>
  </QueryClientProvider>,
);
