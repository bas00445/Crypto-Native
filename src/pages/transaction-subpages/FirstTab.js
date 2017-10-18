import React, { Component } from 'react';
import Theme from '../../styles/GlobalStyles';
import SignalComponent from '../../components/SignalComponent';
import BuySellPage from './BuySellPage';
import TradingSimulator from './TradingSimulator';
import { StackNavigator } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export const FirstTabStack = StackNavigator({
  Simulator: {screen: TradingSimulator}
},{
  navigationOptions: ({navigation}) => ({
    header: null
  }),
});