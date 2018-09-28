import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/HomeScreen/Header';
import StorageIndicator from '../../components/StorageIndicator';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <StorageIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default HomeScreen;
