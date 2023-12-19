import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackNavigator} from './navigator/RootNavigator';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/queryClient';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Provider store={store}>
      <PersistGate persistor={persistor}> */}
        <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
      {/* </PersistGate> */}
    {/* </Provider> */}
    </QueryClientProvider>
  );
}
