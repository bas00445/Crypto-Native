import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export default class HomePage extends Component {
  static navigationOptions = {
    title: 'Home',
    header : null,
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/icons/home-shape.png')}
        style={[Style.icon, {tintColor: tintColor}]}
      />
    ),
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