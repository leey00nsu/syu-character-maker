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

const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <IndexPage />,
    errorElement: <Navigate to="/" />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>,
);
