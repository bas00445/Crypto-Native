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
    activeTintColor: Color.pureWhite,
    inactiveTintColor: Color.darkBlue,
    indicatorStyle: {
      backgroundColor: Color.pureWhite
    },
    showIcon: true,
    showLabel: false
  },
});

export default class TransactionPage extends Component {
  static navigationOptions = {
    title: 'Transaction',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/icons/graph-shape.png')}
        style={[Style.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={Style.headerLabel}>
          <Text style={Style.headerLabelText}>Transaction</Text>
          </View>
        <Tab></Tab> 
      </View>
    );
  }
}