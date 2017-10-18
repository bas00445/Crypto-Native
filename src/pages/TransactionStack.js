import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import { FirstTabStack } from './transaction-subpages/FirstTab';
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
  'Transaction': {screen: TransactionPage},
  'BuySell': {screen: BuySellPage}
}, {
  navigationOptions: ({navigation}) => ({
    header: null
  }),
});