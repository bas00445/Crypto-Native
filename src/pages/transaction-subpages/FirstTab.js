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
    title: 'First Tab',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/icons/line-chart-shape.png')}
        style={[Style.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <View>
        <Text>
          I am the first tab
        </Text>
      </View>
    );
  }
}