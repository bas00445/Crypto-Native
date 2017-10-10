import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class StatPage extends Component {
  static navigationOptions = {
    title: 'Transaction',
    header : null
  };

  render() {
    return (
      <View>
        <Text>
          Welcome to Stat Page
        </Text>
      </View>
    );
  }
}