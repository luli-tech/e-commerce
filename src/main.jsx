import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import App from './App.jsx'
import { app } from './api/api.jsx';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux'
import store, { persistor } from './store/store.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} app={app}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>



)
