import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import WelcomeScreen from './src/screens/Welcome/Welcome';
import AuthScreen from "./src/screens/Auth/Auth";
import HomeScreen from "./src/screens/Home/Home";
import SearchScreen from "./src/screens/Search/Search";
import AccountScreen from "./src/screens/Account/Account";
import configureStore from './src/store/configureStore';
import './src/plugins/axios'; 

const store = configureStore();

// Register Screens
Navigation.registerComponent("insta-appv2.WelcomeScreen", () => WelcomeScreen, store, Provider);
Navigation.registerComponent("insta-appv2.AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("insta-appv2.HomeScreen", () => HomeScreen, store, Provider);
Navigation.registerComponent("insta-appv2.SearchScreen", () => SearchScreen, store, Provider);
Navigation.registerComponent("insta-appv2.AccountScreen", () => AccountScreen, store, Provider);

XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest;

  // fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
};


// Start an App
export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: "insta-appv2.WelcomeScreen",
    title: "Welcome",
    navigatorStyle: {
      navBarHidden: true
    }
  }
});
