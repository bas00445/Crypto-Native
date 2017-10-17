import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import * as firebase from "firebase";
import DrawerItem from '../components/DrawerItem';
import { NavigationActions } from 'react-navigation';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
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
      currentScreen: 1
    }

    
    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
      // optional, do some component related stuff
      
      FCM.presentLocalNotification({
        id: "UNIQ_ID_STRING",                               // (optional for instant notification)
        title: "My Notification Title",                     // as FCM payload
        body: "My Notification Message",                    // as FCM payload (required)
        sound: "default",                                   // as FCM payload
        priority: "high",                                   // as FCM payload
        click_action: "ACTION",                             // as FCM payload
        badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
        number: 10,                                         // Android only
        ticker: "My Notification Ticker",                   // Android only
        auto_cancel: true,                                  // Android only (default true)
        large_icon: "ic_launcher",                           // Android only
        icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
        big_text: "Show when notification is expanded",     // Android only
        sub_text: "This is a subText",                      // Android only
        color: "red",                                       // Android only
        vibrate: 300,                                       // Android only default: 300, no vibration if you pass null
        group: "group",                                     // Android only
        picture: "https://google.png",                      // Android only bigPicture style
        ongoing: true,                                      // Android only
        my_custom_data:'my_custom_field_value',             // extra data you want to throw
        lights: true,                                       // Android only, LED blinking (default false) 
        show_in_foreground: true                           // notification when app is in foreground (local & remote)
    });
    });
  }

  navigateTo(pageName) {
    this.drawerNavigation.navigate(pageName);
    this.activeDrawerItem(pageName);
  } 
  
  activeDrawerItem(pageName) {
    switch(pageName) {
      case 'Home': {
        this.setState({
          currentScreen: 0
        });
      }; break;
      case 'Transaction': {
        this.setState({
          currentScreen: 1
        });
      }; break;
      case 'Setting': {
        this.setState({
          currentScreen: 2
        });
      }; break;
      
    }
  }

  async logout() {
        try {
            await firebase.auth().signOut();
            alert('Sign out');
            // Navigate to login view
            const actionToDispatch = NavigationActions.reset({
              index: 0,
              key: null,  // black magic
              actions: [NavigationActions.navigate({ routeName: 'Login' })]
            })
            this.props.navigation.dispatch(actionToDispatch);
        } catch (error) {
            alert(error.toString());
        }
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
            {/* <DrawerItem iconName={"Home"} onPress={this.navigateTo.bind(this, 'Home')}
              active={ this.state.currentScreen == 0 }></DrawerItem> */}
            <DrawerItem iconName={"Transaction"} onPress={this.navigateTo.bind(this, 'Transaction')}
              active={ this.state.currentScreen == 1 }></DrawerItem>
            <DrawerItem iconName={"Setting"} onPress={this.navigateTo.bind(this, 'Setting')}
              active={ this.state.currentScreen == 2 }></DrawerItem>
            <DrawerItem iconName={"Sign out"} onPress={this.logout.bind(this)}></DrawerItem>
          </ScrollView>
        </View> 

    </View>
    );
  }
}

var localStyles = StyleSheet.create({
  drawerTitle: {
    height: 150,
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
