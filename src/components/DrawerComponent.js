import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import * as firebase from "firebase";
import DrawerItem from '../components/DrawerItem';
import { NavigationActions } from 'react-navigation';
import { firebaseUID } from '../globalvars/FirebaseConfig';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
  AsyncStorage
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export default class DrawerComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentScreen: 0,
      email: firebase.auth().currentUser.email
    }

    // Initial default setting
    this.initialDefaultSetting();
    this.initialFCMService();
  }

  initialFCMService() {
    FCM.requestPermissions().then(
      ()=> {}, 
      (err)=> alert('Notification reject')
    );

    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
      // optional, do some component related stuff
      if(notif.fcm && notif.fcm.body) {
          /* Create local notification for showing in a foreground */
          FCM.presentLocalNotification({
             body: notif.fcm.body,
             priority: notif.fcm.priority,
             title: notif.fcm.title,
             sound: "default", 
             large_icon: "ic_launcher",// Android only
             icon: "ic_launcher",
             show_in_foreground :true, /* notification when app is in foreground (local & remote)*/
             vibrate: 300, /* Android only default: 300, no vibration if you pass null*/
             lights: true, // Android only, LED blinking (default false)
             status: notif.fcm.status,
             color: "red",
             picture: null,
             ticker: true
         });
      }
    });
  }

  initialDefaultSetting() {
    try {
      const isNotify = AsyncStorage.getItem('isNotify');
      const isSimulator = AsyncStorage.getItem('isSimulator');
      const isTrading = AsyncStorage.getItem('isTrading');
      const isAuto = AsyncStorage.getItem('isAuto');
      const isSemi = AsyncStorage.getItem('isSemi');

      if (isNotify == null) {
        AsyncStorage.setItem('isNotify', 'true');
      }
      if (isSimulator == null) {
        AsyncStorage.setItem('isSimulator', 'true');
      }
      if (isTrading == null) {
        AsyncStorage.setItem('isTrading', 'false');
      }
      if (isAuto == null) {
        AsyncStorage.setItem('isAuto', 'false');
      }
      if (isSemi == null) {
        AsyncStorage.setItem('isSemi', 'true');
      }
    } catch(err) {
      console.log(err);
    }
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
      case 'Setting': {
        this.setState({
          currentScreen: 1
        });
      }; break;
    }
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
                <Text numberOfLines={1} ellipsizeMode='tail' style={[localStyles.drawerTitleText, {fontWeight: 'bold'}]}>
                  {this.state.email}
                  </Text>
              </View>
            </View>
          </View>

          <View style={[Style.colContent, {flex: 1, justifyContent: 'center', marginBottom: 4}]}>   
            <View style={{flex: 1}}>
              <Text style={localStyles.drawerTitleSecondaryText}>Balance</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={localStyles.drawerTitleSecondaryText}>$500</Text>
            </View>
          </View>

          <View style={[Style.colContent, {flex: 1, justifyContent: 'center'}]}>   
            <View style={{flex: 1}}>
              <Text style={localStyles.drawerTitleSecondaryText}>Profit/loss</Text>
            </View>

            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={localStyles.drawerTitleSecondaryText}>+60%</Text>
            </View>
          </View>
          
        </View>

        <View style={[localStyles.drawerItemsContainer, {paddingTop: 10}]}>
          <ScrollView>
            <DrawerItem iconName={"Home"} onPress={this.navigateTo.bind(this, 'Home')}
              active={ this.state.currentScreen == 0 }></DrawerItem>
            <DrawerItem iconName={"Setting"} onPress={this.navigateTo.bind(this, 'Setting')}
              active={ this.state.currentScreen == 1 }></DrawerItem>
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
    backgroundColor: Color.grey,
    padding: 15
  },
  drawerTitleText: {
    color: Color.pureWhite,
    fontSize: 16
  },
  drawerTitleSecondaryText: {
    color: Color.pureWhite,
    fontSize: 14
  },
  drawerItemsContainer: {
    flex: 8, 
    backgroundColor: Color.lightWhite,
    padding: 2}
});
