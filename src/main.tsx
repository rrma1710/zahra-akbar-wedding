import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import AdminPanel from './admin/AdminPanel.tsx';
import './index.css';

const isAdmin = new URLSearchParams(window.location.search).get('admin') === '1';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdmin ? <AdminPanel /> : <App />}
  </StrictMode>,
);