import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class SettingPage extends Component {
  static navigationOptions = {
    title: 'Setting',
    header : null
  };

  render() {
    return (
      <View>
        <Text>
          Welcome to Setting Page
        </Text>
      </View>
    );
  }
}