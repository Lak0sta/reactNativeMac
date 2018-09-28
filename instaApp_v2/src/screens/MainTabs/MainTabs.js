import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
  Promise.all([
    Icon.getImageSource(Platform.OS === 'android' ? "md-home" : "ios-home", 30),
    Icon.getImageSource(Platform.OS === 'android' ? "md-search" : "ion-search", 30),
    Icon.getImageSource(Platform.OS === 'android' ? "md-person" : "ios-person", 30)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "insta-appv2.HomeScreen",
          icon: sources[0],
          navigatorStyle: {
            navBarHidden: true
          }
        },
        {
          screen: "insta-appv2.SearchScreen",
          icon: sources[1],
          navigatorStyle: {
            navBarHidden: true
          }
        },
        {
          screen: "insta-appv2.AccountScreen",
          icon: sources[2],
          navigatorStyle: {
            navBarHidden: true
          }
        }
      ],
      tabsStyle: {
        tabBarSelectedButtonColor: "#2ac414"
      },
      appStyle: {
        tabBarSelectedButtonColor: "#2ac414"
      },
    });
  });
};

export default startTabs;