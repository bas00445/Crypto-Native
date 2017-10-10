import React, { Component } from 'react';
import Theme from '../../styles/GlobalStyles';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export default class FirstTab extends Component {
  static navigationOptions = {
    title: 'First',
    header : null,
  };

  render() {
    return (
      <View>
        <Text>
          First Tab
        </Text>
      </View>
    );
  }
}