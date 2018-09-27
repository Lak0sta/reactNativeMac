import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground';
import DefaultInput from '../../components/UI/DefaultInput';
import { connect } from 'react-redux';

import { setAccountInfo, logOut, updateAccountPassword } from '../../store/actions';
import validate from "../../utils/validation";
class AccountScreen extends React.Component {
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

  updatePassword = () => {
    const payload = {
      old_value: this.state.controls.oldPassword.value,
      new_value: this.state.controls.newPassword.value
    };
    this.props.changePassword(payload);
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        oldPassword: {
          value: ""
        },
        newPassword: {
          value: ""
        },
        confirmNewPassword: {
          value: ""
        }
      },
      showPasswordFields: !prevState.showPasswordFields
    }));
  }

  componentWillMount() {
    this.props.setAccountInfo();
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
    let forgotPassContent = null;
    let profile = (
      <View style={styles.accountInfo}>
        <View style={styles.accountItem}>
          <Text style={styles.accountItem__text}>Hello {this.props.accountInfo.name}</Text>
        </View>
        <View style={styles.accountItem}>
          <Text style={styles.accountItem__text}>Your account type: {this.props.accountInfo.plan}</Text>
        </View>
        <View style={styles.accountItem}>
          <Text style={styles.accountItem__text}>Your email: {this.props.accountInfo.email}</Text>
        </View>
        <ButtonWithBackground
          color="#2ac414"
          onPress={this.togglePasswordFields}
        >
          Tap to change password
            </ButtonWithBackground>
      </View>
    );
    if (this.state.showPasswordFields) {
      forgotPassContent = (
        <Animated.View
          style={[
            { opacity: !this.state.showPasswordFields ? this.state.removeAnim : this.state.startAnim },
            styles.togglePassword
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
              disabled={
                !this.state.controls.oldPassword.valid ||
                !this.state.controls.newPassword.valid ||
                !this.state.controls.confirmNewPassword.valid
              }
              color="#2ac414"
              onPress={this.updatePassword}
            >
              Save
            </ButtonWithBackground>
            <ButtonWithBackground
              color="#2ac414"
              onPress={this.togglePasswordFields}
            >
              Cancel
            </ButtonWithBackground>
          </View>
        </Animated.View>
      );
    }

    if (this.props.isLoading) {
      profile = <ActivityIndicator />
    }

    return (
      <View style={styles.container}>
        {profile}
        {forgotPassContent}
        <View style={{ marginBottom: 15 }}>
          <ButtonWithBackground
            color="#2ac414"
            onPress={this.props.logOutUser}
          >
            Log out
            </ButtonWithBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  accountInfo: {
    width: "95%"
  },
  accountItem: {
    margin: 10,
    width: '100%',
    justifyContent: 'space-between'
  },
  accountItem__text: {
    fontSize: 20,
    color: "#000"
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb",
    borderRadius: 5
  },
  inputContainer: {
    flex: 0
  },
  togglePassword: {
    flex: 1,
    width: "80%",
    flexGrow: 1
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%"
  }
});

const mapStateToProps = state => {
  return {
    accountInfo: state.account.accountInfo,
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAccountInfo: () => dispatch(setAccountInfo()),
    logOutUser: () => dispatch(logOut()),
    changePassword: payload => dispatch(updateAccountPassword(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);