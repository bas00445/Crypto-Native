import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import FirstTab from './transaction-subpages/FirstTab';
import SecondTab from './transaction-subpages/SecondTab';
import { TabNavigator } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

const Tab = TabNavigator({
  First: {
    screen: FirstTab,
  },
  Second: {
    screen: SecondTab,
  },
}, {
  tabBarPosition: 'top',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: Color.white,
    indicatorStyle: Color.blue
  },
});

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
      <Tab></Tab> 
    );
  }
}