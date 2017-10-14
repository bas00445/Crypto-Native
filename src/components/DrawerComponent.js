import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import * as firebase from "firebase";
import DrawerItem from '../components/DrawerItem';
import { NavigationActions } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export default class DrawerComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentScreen: 0
    }
  }

  navigateTo(pageName) {
    this.drawerNavigation.navigate(pageName);
  } 

  async logout() {
        try {
            await firebase.auth().signOut();
            // Navigate to login view
            const actionToDispatch = NavigationActions.reset({
              index: 0,
              key: null,  // black magic
              actions: [NavigationActions.navigate({ routeName: 'Login' })]
            })
            this.props.navigation.dispatch(actionToDispatch)
        } catch (error) {
            alert(error.toString());
        }
    }

    logoutDebug() {
      const actionToDispatch = NavigationActions.reset({
        index: 0,
        key: null,  // black magic
        actions: [NavigationActions.navigate({ routeName: 'Login' })]
      })
      this.props.navigation.dispatch(actionToDispatch)
    }
  
  render() {
    const { navigation } = this.props;
    this.drawerNavigation = navigation;
    return (
      <View style={{flex: 1}}>
        <View style={localStyles.drawerTitle}>
          <View style={{flex:2, justifyContent: 'center'}}>
            <View style={Style.colContent}>
              <View style={{flex: 1}}>
                <Image style={[Style.drawerIcon, {tintColor: Color.pureWhite}]} source={require('../assets/icons/account.png')}/> 
              </View>
              <View style={{flex: 3, alignItems: 'flex-end'}}>
                <Text style={[localStyles.drawerTitleText, {fontWeight: 'bold'}]}>Parin Kobboon</Text>
              </View>
            </View>
          </View>

          <View style={[Style.colContent, {flex: 1, justifyContent: 'center', marginBottom: 4}]}>   
            <View style={{flex: 1}}>
              <Text style={localStyles.drawerTitleText}>Balance</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={localStyles.drawerTitleText}>$500</Text>
            </View>
          </View>

          <View style={[Style.colContent, {flex: 1, justifyContent: 'center'}]}>   
            <View style={{flex: 1}}>
              <Text style={localStyles.drawerTitleText}>Profit/loss</Text>
            </View>

            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={localStyles.drawerTitleText}>+60%</Text>
            </View>
          </View>
          
        </View>

        <View style={[localStyles.drawerItemsContainer, {paddingTop: 10}]}>
          <ScrollView>
            <DrawerItem iconName={"Home"} onPress={this.navigateTo.bind(this, 'Home')}></DrawerItem>
            <DrawerItem iconName={"Transaction"} onPress={this.navigateTo.bind(this, 'Transaction')}></DrawerItem>
            <DrawerItem iconName={"Setting"} onPress={this.navigateTo.bind(this, 'Setting')}></DrawerItem>
            <DrawerItem iconName={"Sign out"} onPress={this.logoutDebug.bind(this)}></DrawerItem>
          </ScrollView>
        </View> 

    </View>
    );
  }
}

var localStyles = StyleSheet.create({
  drawerTitle: {
    flex: 2,
    backgroundColor: Color.blue,
    padding: 15
  },
  drawerTitleText: {
    color: Color.pureWhite,
    fontSize: 18
  },
  drawerItemsContainer: {
    flex: 8, 
    backgroundColor: Color.lightWhite,
    padding: 2}
});
