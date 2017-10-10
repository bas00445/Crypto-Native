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

export default class SecondTab extends Component {
  static navigationOptions = {
    title: 'Second',
    header : null,
  };

  render() {
    return (
      <View>
        <Text>
          Second Tab
        </Text>
      </View>
    );
  }
}