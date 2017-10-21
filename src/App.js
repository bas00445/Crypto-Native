import React, { Component } from 'react';
import Theme from './styles/GlobalStyles';

// Pages
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SettingPage from './pages/SettingPage';

// Components
import DrawerComponent from './components/DrawerComponent';

import { StackNavigator } from 'react-navigation';
import { DrawerNavigator} from 'react-navigation';
import { TouchableOpacity } from 'react-native';

import {
  AppRegistry,
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

const AppDrawer = DrawerNavigator({
  Home: {screen: HomePage},
  Setting: {screen: SettingPage}
},
{
  drawerWidth: 250,
  drawerPosition: 'left',
  initialRouteName: 'Home',
  contentComponent: props => <DrawerComponent {...props}></DrawerComponent>
});

const CryptoApp = StackNavigator({
  Login: {
    screen: LoginPage,
  },
  Main: {
    screen: AppDrawer,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  },
});

AppRegistry.registerComponent('CryptoApp', () => CryptoApp);
  