import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const header = props => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={[styles.headerText, styles.headerTitle]}>Upgrade your plan</Text>
        <View style={styles.headerPlanContainer}>
          <View><Text style={styles.headerText}>Current plan</Text></View>
          <View style={styles.headerPlanWrapper}><Text style={[styles.headerText, styles.headerPlan]}>Free</Text></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%'
  },
  headerContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#249326',
    width: '100%',
    padding: 10
  },
  headerText: {
    color: '#fff',
    fontSize: 12
  },
  headerTitle: {
    fontSize: 20
  },
  headerPlan: {
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  headerPlanContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  headerPlanWrapper: {
    marginLeft: 5
  }
});

export default header;
