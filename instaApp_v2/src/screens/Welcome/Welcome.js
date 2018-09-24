import React, { Component } from 'react';
import { View, Text, AsyncStorage} from 'react-native';
import Slides from '../../components/Slides';

const SLIDE_DATA = [
  {
    text: 'Welcome to History Search',
    color: '#48ae43'
  },
  {
    text: 'This app will help you to quickly find resources online',
    color: '#4da64b'
  },
  {
    text: 'So let\'s begin!',
    color: '#3c9e3a'
  }
];

class WelcomeScreen extends Component {
  state = { token: null }

  async componentWillMount() {
    let token = await AsyncStorage.getItem('at');

    if (token) {
      this.props.navigator.push({
        screen: 'insta-appv2.FeedScreen',
        title: '',
        navigatorStyle: {
          navBarHidden: true
        }
      });
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }
  

  onSlidesComplete = () => {
    this.props.navigator.push({
      screen: 'insta-appv2.AuthScreen',
      title: '',
      navigatorStyle: {
        navBarHidden: true
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Slides
          data={SLIDE_DATA}
          onComplete={this.onSlidesComplete}
        />
      </View>
    );
  }
}

export default WelcomeScreen;
