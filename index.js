import React from 'react';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

const MainApp = () => (
    <Provider store={store}>
        <App />
    </Provider>)


AppRegistry.registerComponent('main', () => MainApp);