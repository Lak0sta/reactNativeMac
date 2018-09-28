import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Dimensions, Button } from 'react-native';

class StorageIndicator extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Hello Storage!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slideText: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15
  },
  buttonStyle: {
    backgroundColor: '#0288D1'
  }
});

export default StorageIndicator;