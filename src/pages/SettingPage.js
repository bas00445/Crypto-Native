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

export default class SettingPage extends Component {
  static navigationOptions = {
    title: 'Setting',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/icons/cog-shape.png')}
        style={[Style.icon, {tintColor: tintColor}]}
      />
    ),
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