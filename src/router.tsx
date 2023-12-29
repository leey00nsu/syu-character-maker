import { Navigate, createBrowserRouter } from 'react-router-dom';

import {
  AboutPage,
  CanvasPage,
  GalleryDetailPage,
  GalleryPage,
  GoogleAuthPage,
  UserPage,
} from './pages';
import { AuthContainer } from './ui/containers';

export const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <AuthContainer element={<CanvasPage />} />,
    errorElement: <Navigate to="/" />,
  },
  {
    path: '/about',
    element: <AuthContainer element={<AboutPage />} />,
  },
  {
    path: '/user',
    element: <AuthContainer privated element={<UserPage />} />,
  },
  {
    path: '/auth/google',
    element: <GoogleAuthPage />,
  },
  {
    path: '/gallery',
    element: <AuthContainer element={<GalleryPage />} />,
  },
  {
    path: '/gallery/:articleId',
    element: <AuthContainer element={<GalleryDetailPage />} />,
  },
]);
