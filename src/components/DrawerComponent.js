import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import * as firebase from "firebase";
import { DrawerItems } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
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
    navigation = this.props;

    return (
      <View style={{flex: 1}}>
      <View style={localStyles.drawerTitle}>
        <View style={{flex:3, justifyContent: 'center'}}>
          <View style={Style.colContent}>
            <View style={{flex: 1}}>
              <Image style={Style.drawerIcon} source={require('../assets/icons/user-shape.png')}/> 
            </View>
            <View style={{flex: 3, alignItems: 'flex-end'}}>
              <Text style={[localStyles.drawerTitleText, {fontWeight: 'bold'}]}>Parin Kobboon</Text>
            </View>
          </View>
        </View>

        <View style={[Style.colContent, {flex: 1, justifyContent: 'center'}]}>   
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
            <Text style={localStyles.drawerTitleText}>+50%</Text>
          </View>
        </View>
        
      </View>

      <View style={localStyles.drawerItemsContainer}>
        <ScrollView>
          <DrawerItems {...this.props} />
          <Button title="Log out" color={Color.red} onPress={this.logout.bind(this)}></Button>
        </ScrollView>
      </View> 

    </View>
    );
  }
}

var localStyles = StyleSheet.create({
  drawerTitle: {
    flex: 2,
    backgroundColor: Color.lightBlue,
    padding: 15
  },
  drawerTitleText: {
    color: '#ffffff',
    fontSize: 20
  },
  drawerItemsContainer: {
    flex: 8, 
    backgroundColor: Color.lightWhite,
    padding: 2}
});
