import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import TradingSimulator from './transaction-subpages/TradingSimulator';
import SecondTab from './transaction-subpages/SecondTab';
import { TabNavigator } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

const Tab = TabNavigator({
  First: {
    screen: TradingSimulator,
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
  },
});

export default class TransactionPage extends Component {
  static navigationOptions = {
    title: 'Transaction',
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={[Style.headerLabel, Style.colContent]}>
          <View style={{marginRight: 10, justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Image style={[Style.icon, {tintColor: Color.pureWhite}]}  source={require('../assets/icons/hamburger.png')}></Image>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={Style.headerLabelText}>Transaction</Text>
          </View>
        </View>
        <Tab></Tab> 
      </View>
    );
  }
}