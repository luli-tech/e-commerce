import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import App from './App.jsx'
import { app } from './api/api.jsx';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux'
import store from './store/store.jsx';
import Toast from './components/toast.jsx';
import { persistor } from './store/store.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} app={app}>
      <PersistGate persistor={persistor}>
        <App />
        <Toast />
      </PersistGate>
    </Provider>
  </StrictMode>



)
