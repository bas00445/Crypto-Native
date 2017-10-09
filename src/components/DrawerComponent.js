import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import HomePage from '../pages/HomePage';
import SettingPage from '../pages/SettingPage';
import CustomButton from '../components/CustomButton';
import { StackNavigator } from 'react-navigation';
import { DrawerLayoutAndroid } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export default class DrawerComponent extends Component {
  static navigationOptions = {
    header : null
  };

  render() {
    var navigationView = (
    <View style={{flex: 1}}>
      <View style={localStyles.drawerTitle}>
        <Text style={Color.white}>Menu</Text>
      </View>
      <View style={localStyles.drawerItemsContainer}>
        <ScrollView>
          <CustomButton bgColor={Color.lightWhite} text={'Home'}></CustomButton>
          <CustomButton bgColor={Color.lightWhite} text={'Setting'}></CustomButton>
        </ScrollView>
      </View>
    </View>
    );
    
    return (
      <DrawerLayoutAndroid
        drawerWidth={250}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        <PageContainer></PageContainer>
      </DrawerLayoutAndroid>
    );
  }
}

const PageContainer = StackNavigator({
  Home: {screen: HomePage},
  Setting: {screen: SettingPage}
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

