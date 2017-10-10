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

export default class TransactionPage extends Component {
  static navigationOptions = {
    title: 'Transaction',
    header : null,
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/icons/graph-shape.png')}
        style={[Style.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <View>
        <Text>
          Welcome to Transaction Page
        </Text>
      </View>
    );
  }
}