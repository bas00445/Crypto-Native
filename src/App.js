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
        <View style={{flex:3, justifyContent: 'center'}}>
          <View style={Style.colContent}>
            <View style={{flex: 1}}>
              <Image source={require('./assets/icons/user-shape.png')}/> 
            </View>
            <View style={{flex: 3}}>
              <Text style={localStyles.drawerTitleText}>Parin Kobboon</Text>
            </View>
          </View>
        </View>

        <View style={[Style.colContent, {flex: 1, justifyContent: 'center'}]}>   
          <View style={{flex: 1}}>
            <Text style={localStyles.drawerTitleText}>Balance</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={localStyles.drawerTitleText}>$500</Text>
          </View>
        </View>

        <View style={[Style.colContent, {flex: 1, justifyContent: 'center'}]}>   
          <View style={{flex: 1}}>
            <Text style={localStyles.drawerTitleText}>Profit/loss</Text>
          </View>

          <View style={{flex: 1}}>
            <Text style={localStyles.drawerTitleText}>+50%</Text>
          </View>
        </View>
        
      </View>

      <View style={localStyles.drawerItemsContainer}>
        <ScrollView>
          <DrawerItems {...props} />
        </ScrollView>
      </View> 

    </View>
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
    flex: 3,
    backgroundColor: Color.lightBlue,
    padding: 5
  },
  drawerTitleText: {
    color: '#ffffff',
    fontSize: 20
  },
  drawerItemsContainer: {
    flex: 7, 
    backgroundColor: Color.lightWhite,
    padding: 2}
  });
  
  AppRegistry.registerComponent('CryptoApp', () => CryptoApp);
  