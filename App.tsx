import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigator } from './RootNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}
