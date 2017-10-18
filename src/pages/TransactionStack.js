import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import { StackNavigator } from 'react-navigation';
import TransactionPage from './TransactionPage';
import BuySellPage from './transaction-subpages/BuySellPage';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export const TransactionStack = StackNavigator({
  'Transaction': {screen: ({navigation}) => 
  <TransactionPage screenProps={{txStackNavigation: navigation}}></TransactionPage> },
  'BuySell': {screen: BuySellPage}
}, {
  navigationOptions: ({navigation}) => ({
    header: null
  }),
});