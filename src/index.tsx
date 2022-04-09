import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { App } from 'components/app'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from 'redux-store/store'
import './index.css'
import { PersistGate, PersistGateProps } from 'redux-persist/es/integration/react'

const PersistProvider = PersistGate as unknown as (props: PersistGateProps) => JSX.Element

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistProvider loading={null} persistor={persistor}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </PersistProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
