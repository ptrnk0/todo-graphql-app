import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ApolloProvider } from '@apollo/client/react';

import { client } from '@/shared/api';
import { Navigation } from './navigation';

export function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Navigation />
      </ApolloProvider>
    </SafeAreaProvider>
  );
}
