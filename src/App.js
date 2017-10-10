import React, { Component } from 'react';
import Theme from './styles/GlobalStyles';

// Pages
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SettingPage from './pages/SettingPage';

import { StackNavigator } from 'react-navigation';
import { DrawerNavigator, DrawerItems } from 'react-navigation';

import {
  AppRegistry,
  Platform,
  StyleSheet,
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
  contentComponent: props => {
    <ScrollView>
    <DrawerItems {...props} />
    </ScrollView>}
});

const CryptoApp = StackNavigator({
  Login: {
    screen: LoginPage,
  },
  Main: {
    screen: AppDrawer,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
});

var localStyles = StyleSheet.create({
  drawerTitle: {
    flex: 2,
    backgroundColor: Color.lightBlue,
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerItemsContainer: {
    flex: 8, 
    backgroundColor: Color.lightWhite,
    padding: 2}
  });
  
  
  
  AppRegistry.registerComponent('CryptoApp', () => CryptoApp);
  