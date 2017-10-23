import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import SignalTab from './home-subpages/SignalTab';
import SimulatorTab from './home-subpages/SimulatorTab';
import TradingViewTab from './home-subpages/TradingViewTab';
import { TabNavigator } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

const Tab = TabNavigator({
  SignalTab: {
    screen: SignalTab,
  },
  SimulatorTab: {
    screen: SimulatorTab,
  },
  TradingViewTab: {
    screen: TradingViewTab
  }
}, {
  tabBarPosition: 'top',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: Color.pureWhite,
    inactiveTintColor: Color.whiteGrey2,
    indicatorStyle: {
      backgroundColor: Color.pink
    },
    showLabel: false,
    showIcon: true,
    style: {
      backgroundColor: Color.grey
    }
  },
});

export default class HomePage extends Component {
  static navigationOptions = {
    title: 'Home',
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
            <Text style={Style.headerLabelText}>Home</Text>
          </View>
        </View>
        <Tab></Tab> 
      </View>
    );
  }
}