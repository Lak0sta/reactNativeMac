import React from 'react';
import { StyleSheet, Text, View, Animated, Easing, Keyboard, TouchableWithoutFeedback } from 'react-native';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground';
import DefaultInput from '../../components/UI/DefaultInput';
import { connect } from 'react-redux';

import { setProfileInfo, logOut } from '../../store/actions/index';
import validate from "../../utils/validation";
class ProfileScreen extends React.Component {
  state = {
    showPasswordFields: false,
    removeAnim: new Animated.Value(0),
    startAnim: new Animated.Value(1),
    controls: {
      oldPassword: {
        value: "",
        valid: false,
        validationRules: {
          notEmpty: true
        },
        touched: false
      },
      newPassword: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmNewPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "newPassword"
        },
        touched: false
      }
    }
  };

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === "newPassword") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmNewPassword: {
            ...prevState.controls.confirmNewPassword,
            valid:
              key === "newPassword"
                ? validate(
                  prevState.controls.confirmNewPassword.value,
                  prevState.controls.confirmNewPassword.validationRules,
                  connectedValue
                )
                : prevState.controls.confirmNewPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };

  componentWillMount() {
    this.props.setProfileInfo();
  }

  togglePasswordFields = () => {
    if (!this.state.showPasswordFields) {
      Animated.timing(this.state.removeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.back()
      }).start(() => {
        this.setState(prevState => ({
          showPasswordFields: !prevState.showPasswordFields
        }));
      });
    } else {
      Animated.timing(this.state.startAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.back()
      }).start(() => {
        this.setState(prevState => ({
          showPasswordFields: !prevState.showPasswordFields
        }));
      });
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileItem}>
          <Text style={styles.profileItem__text}>Hello {this.props.profileInfo.name}</Text>
        </View>
        <View style={styles.profileItem}>
          <Text style={styles.profileItem__text}>Your account type: {this.props.profileInfo.plan}</Text>
        </View>
        <View style={styles.profileItem}>
          <Text style={styles.profileItem__text}>Your email: {this.props.profileInfo.email}</Text>
        </View>
        <ButtonWithBackground
          color="#2ac414"
          onPress={this.togglePasswordFields}
        >
          Tap to change password
        </ButtonWithBackground>
        <Animated.View
          style={[
              {opacity: !this.state.showPasswordFields ? this.state.removeAnim : this.state.startAnim},
              {width: '80%'}
          ]}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <DefaultInput
                placeholder="Old password"
                style={styles.input}
                value={this.state.controls.oldPassword.value}
                onChangeText={val => this.updateInputState("oldPassword", val)}
                valid={this.state.controls.oldPassword.valid}
                touched={this.state.controls.oldPassword.touched}
                secureTextEntry
              />
              <DefaultInput
                placeholder="New Password"
                style={styles.input}
                value={this.state.controls.newPassword.value}
                onChangeText={val => this.updateInputState("newPassword", val)}
                valid={this.state.controls.newPassword.valid}
                touched={this.state.controls.newPassword.touched}
                secureTextEntry
              />
              <DefaultInput
                placeholder="Confirm New Password"
                style={styles.input}
                value={this.state.controls.confirmNewPassword.value}
                onChangeText={val => this.updateInputState("confirmNewPassword", val)}
                valid={this.state.controls.confirmNewPassword.valid}
                touched={this.state.controls.confirmNewPassword.touched}
                secureTextEntry
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.buttonContainer}>
          <ButtonWithBackground
            color="#2ac414"
            onPress={this.props.logOutUser}
          >
            Save
          </ButtonWithBackground>
          <ButtonWithBackground
            color="#2ac414"
            onPress={this.props.logOutUser}
          >
            Cancel
          </ButtonWithBackground>
          </View>
        </Animated.View>
        <ButtonWithBackground
          color="#2ac414"
          onPress={this.props.logOutUser}
        >
          Log out
          </ButtonWithBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  profileItem: {
    margin: 20,
    width: '100%',
    justifyContent: 'space-between'
  },
  profileItem__text: {
    fontSize: 20,
    color: "#000"
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb",
    borderRadius: 5
  },
  inputContainer: {
    width: "100%"
  },
  buttonContainer: {
    // flex: 3,
    // flexDirection: "row",
    // justifyContent: "space-between",
    width: "80%"
  }
});

const mapStateToProps = state => {
  return {
    profileInfo: state.profile.profileInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setProfileInfo: () => dispatch(setProfileInfo()),
    logOutUser: () => dispatch(logOut())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);