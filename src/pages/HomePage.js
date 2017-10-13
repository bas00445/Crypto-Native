import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export default class HomePage extends Component {
  static navigationOptions = {
    title: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/icons/home-shape.png')}
        style={[Style.icon, {tintColor: tintColor}]}
      />
    ),
  };

  constructor(props) {
    super(props);

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
        show_in_foreground: true                                  // notification when app is in foreground (local & remote)
    });

    });
  }

  render() {
    return (
      <View>      
        <Text>
          Welcome to Home Page
        </Text>
      </View>
    );
  }
}