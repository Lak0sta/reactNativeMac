import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import WelcomeScreen from './src/screens/Welcome/Welcome';
import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import configureStore from './src/store/configureStore';

const store = configureStore();

// Register Screens
Navigation.registerComponent("insta-app.AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("insta-app.WelcomeScreen", () => WelcomeScreen, store, Provider);
Navigation.registerComponent("insta-app.SharePlaceScreen", () => SharePlaceScreen, store, Provider);
Navigation.registerComponent("insta-app.FindPlaceScreen", () => FindPlaceScreen, store, Provider);
Navigation.registerComponent("insta-app.PlaceDetailScreen", () => PlaceDetailScreen, store, Provider);
Navigation.registerComponent("insta-app.SideDrawer", () => SideDrawer, store, Provider);

// Start an App
export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: "insta-app.WelcomeScreen",
    title: "Welcome",
    navigatorStyle: {
      navBarHidden: true
    }
  }
});