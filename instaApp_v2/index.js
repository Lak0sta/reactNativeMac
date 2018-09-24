import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './src/store/configureStore';
import './src/plugins/axios/index';

const store = configureStore();

const RNRedux = () => (
  <Provider store={store}>
      <App />
  </Provider>
);

AppRegistry.registerComponent('instaApp_v2', () => RNRedux);
