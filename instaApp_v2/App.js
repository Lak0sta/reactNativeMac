import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import WelcomeScreen from './src/screens/Welcome/Welcome';
import AuthScreen from "./src/screens/Auth/Auth";
import FeedScreen from "./src/screens/Feed/Feed";
import SearchScreen from "./src/screens/Search/Search";
import ProfileScreen from "./src/screens/Profile/Profile";
import configureStore from './src/store/configureStore';

const store = configureStore();

// Register Screens
Navigation.registerComponent("insta-appv2.WelcomeScreen", () => WelcomeScreen, store, Provider);
Navigation.registerComponent("insta-appv2.AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("insta-appv2.FeedScreen", () => FeedScreen, store, Provider);
Navigation.registerComponent("insta-appv2.SearchScreen", () => SearchScreen, store, Provider);
Navigation.registerComponent("insta-appv2.ProfileScreen", () => ProfileScreen, store, Provider);


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
