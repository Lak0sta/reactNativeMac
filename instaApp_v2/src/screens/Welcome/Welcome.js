import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class WelcomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome Screen</Text>
        <Text>Welcome Screen</Text>
        <Text>Welcome Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WelcomeScreen;