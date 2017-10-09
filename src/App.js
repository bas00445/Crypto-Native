import React, { Component } from 'react';
import Style from './styles/GlobalStyles';

// Pages
import MainPage from './components/DrawerComponent';
import LoginPage from './pages/LoginPage';

import { StackNavigator } from 'react-navigation';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button
} from 'react-native';

const CryptoApp = StackNavigator({
  Login: {
    screen: LoginPage,
  },
  Main: {
    screen: MainPage,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
});


AppRegistry.registerComponent('CryptoApp', () => CryptoApp);
