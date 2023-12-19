import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import './index.css';
import AboutPage from './pages/AboutPage';
import AuthPage from './pages/AuthPage';
import GalleryPage from './pages/GalleryPage';
import GoogleAuthPage from './pages/GoogleAuthPage';
import IndexPage from './pages/IndexPage';
import UserPage from './pages/UserPage';

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
  {
    path: '/gallery',
    element: <AuthPage element={<GalleryPage />} />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </QueryClientProvider>,
);
