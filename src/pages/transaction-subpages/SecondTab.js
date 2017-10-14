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
    title: 'Signal',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/icons/alarm.png')}
        style={[Style.icon, {tintColor: tintColor}]}
      />
    ),
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