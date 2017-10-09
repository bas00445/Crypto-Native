import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class HomePage extends Component {
  static navigationOptions = {
    title: 'Home',
    header : null
  };

  render() {
    return (
      <View>
        <Text>
          Welcome to Home Page
        </Text>
      </View>
    );
  }
}