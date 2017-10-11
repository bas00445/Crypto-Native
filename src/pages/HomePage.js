import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import firebase from 'react-native-firebase';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export default class HomePage extends Component {
  static navigationOptions = {
    title: 'Home',
    header : null,
    drawerIcon: ({ tintColor }) => (
      <Image
      source={require('../assets/icons/home-shape.png')}
      style={[Style.icon, {tintColor: tintColor}]}
      />
    ),
  };
  
  unknownSignin(){
    firebase.auth().signInAnonymously().then(
      (user) => {
        alert(user.isAnonymous);
      });
  }

  render() {
    return (
      <View>
        <Button title="Sign in" onPress={this.unknownSignin.bind(this)}></Button>
      </View>
      );
    }
  }