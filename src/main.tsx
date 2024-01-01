import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import { router } from './router';
import { ModalList } from './ui/modal';

const queryClient = new QueryClient();

ReactGA.initialize([
  {
    trackingId: import.meta.env.VITE_GA_TRACKING_ID,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Toaster />
      <ModalList />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </QueryClientProvider>,
);
