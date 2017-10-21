import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import FirstTab from './transaction-subpages/FirstTab';
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