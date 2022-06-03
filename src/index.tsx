import { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate, PersistGateProps } from 'redux-persist/es/integration/react'
import { App } from 'components/app'
import { Loader } from 'components/loader'
import { persistor, store } from 'redux-store/store'

import 'configs/i18next.config'
import './index.css'

const PersistProvider = PersistGate as unknown as (props: PersistGateProps) => JSX.Element

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <Provider store={store}>
      <PersistProvider loading={null} persistor={persistor}>
        <BrowserRouter basename="/e-journal">
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </BrowserRouter>
      </PersistProvider>
    </Provider>
  </Suspense>,
  document.getElementById('root')
)
