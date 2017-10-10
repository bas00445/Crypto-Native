import React, { Component } from 'react';
import Theme from './styles/GlobalStyles';

// Pages
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SettingPage from './pages/SettingPage';
import StatPage from './pages/StatPage';

import { StackNavigator } from 'react-navigation';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import {TouchableOpacity} from 'react-native';

import {
  AppRegistry,
  Platform,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

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

const AppDrawer = DrawerNavigator({
  Home: {screen: HomePage},
  Setting: {screen: SettingPage},
  Stat: {screen: StatPage}
}, 
{
  drawerWidth: 250,
  drawerPosition: 'left',
  contentComponent: props => 
    <View style={{flex: 1}}>
      <View style={localStyles.drawerTitle}>
        <View style={{flex:2}}>
          <Image source={require('./assets/icons/user-shape.png')}/>
        </View>
        <View style={{flex: 1}}>
          <Text>Parin Kobboon</Text>
        </View>
        <View style={{flex: 1}}>
          <Text>Balance $500</Text>
        </View>
        <View style={{flex: 1}}>
          <Text>Profit/Loss +50%</Text>
        </View>
      </View>

      <View style={localStyles.drawerItemsContainer}>
        <ScrollView>
          <DrawerItems {...props} />
        </ScrollView>
      </View> 

    </View>
  
});

var localStyles = StyleSheet.create({
  drawerTitle: {
    flex: 4,
    backgroundColor: Color.lightBlue,
  },
  drawerItemsContainer: {
    flex: 6, 
    backgroundColor: Color.lightWhite,
    padding: 2}
  });
  
  
  
  AppRegistry.registerComponent('CryptoApp', () => CryptoApp);
  