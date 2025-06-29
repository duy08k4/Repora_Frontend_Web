import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'leaflet/dist/leaflet.css';
import { store } from './redux/store.ts';
import { Provider } from 'react-redux';

import { ToastProvider } from './hooks/toastMessage/toast.tsx';
import { CacheProvider } from './hooks/cache/cache.tsx';
import { SpinnerProvider } from './hooks/spinner/spinner.tsx';
import { SocketProvider } from './hooks/socket/socket.tsx';

// import react-router-dom
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <SpinnerProvider>
      <ToastProvider>
        <CacheProvider>
          <BrowserRouter basename='/'>
            <SocketProvider>
              <App />
            </SocketProvider>
          </BrowserRouter>
        </CacheProvider>
      </ToastProvider>
    </SpinnerProvider>
  </Provider>
)
