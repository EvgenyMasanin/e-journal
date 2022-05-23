import { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { App } from 'components/app'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from 'redux-store/store'
import { PersistGate, PersistGateProps } from 'redux-persist/es/integration/react'

import 'configs/i18next.config'
import './index.css'
import { Loader } from 'components/loader'

const PersistProvider = PersistGate as unknown as (props: PersistGateProps) => JSX.Element

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <Provider store={store}>
      <PersistProvider loading={null} persistor={persistor}>
        <BrowserRouter>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </BrowserRouter>
      </PersistProvider>
    </Provider>
  </Suspense>,
  document.getElementById('root')
)
