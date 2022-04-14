import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import {store, persistor} from './redux/store'
import AppContainer from './components/AppContainer'

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
}