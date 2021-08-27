import React from 'react';
import { DefaultTheme,Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const MainApp = () => (
    <Provider store={store}>
        <PaperProvider theme={theme}> 
        <App />
        </PaperProvider>
    </Provider>)


AppRegistry.registerComponent('main', () => MainApp);