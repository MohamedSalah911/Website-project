import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from '@/../redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'
import { ModalProvider } from './components/providers/modal-provider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
<ModalProvider />
    <App />
          </PersistGate>

      </Provider>,

  </StrictMode>,
)
