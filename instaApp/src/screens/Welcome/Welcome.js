// import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage} from 'react-native';
import { connect } from "react-redux";
import { autoSignIn } from "../../store/actions/index";

import Slides from '../../components/Slides/Slides';

const SLIDE_DATA = [
  {
    text: 'Welcome to Insta App',
    color: '#03A9F4'
  },
  {
    text: 'This app can help you to share your photos with your friends',
    color: '#009688'
  },
  {
    text: 'Let\'s start!',
    color: '#03A9F4'
  }
];

class WelcomeScreen extends Component {
  state = { token: null }

  componentDidMount() {
    this.props.checkSignUp();
  }
  

  onSlidesComplete = () => {
    this.props.navigator.push({
      screen: 'insta-app.AuthScreen',
      title: 'Login',
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

const mapDispatchToProps = dispatch => {
  return {
    checkSignUp: () => dispatch(autoSignIn())
  };
};

export default connect(null, mapDispatchToProps)(WelcomeScreen);
// export default WelcomeScreen;