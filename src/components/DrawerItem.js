import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export default class DrawerItem extends Component {

  constructor(props) {
    super(props);


    switch(this.props.iconName) {
      case 'Home': {
        this.icon = require('../assets/icons/home.png');
      } break;
      case 'Transaction': {
        this.icon = require('../assets/icons/history.png');
      } break;
      case 'Setting': {
        this.icon = require('../assets/icons/setting.png');
      } break;
      case 'Sign out': {
        this.icon = require('../assets/icons/close.png');
      } break;
    }
  }

  render() {
    var active = this.props.active == null ? false: this.props.active;
    if (active) {
      var tintColor = Color.blue;
      var itemColor = Color.white;
    } else {
      var tintColor = Color.grey;
      var itemColor = null;
    }
    return (
      <TouchableOpacity onPress={this.props.onPress} 
        style={[localStyles.drawerItem, {backgroundColor: itemColor}]}>
        <View style={Style.colContent}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Image style={[Style.drawerIcon, {tintColor: tintColor}]} source={this.icon}></Image>
          </View>
          <View style={{flex: 3, justifyContent: 'center'}}>
            <Text style={{fontSize: 16, color: tintColor}}>{this.props.iconName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

var localStyles = StyleSheet.create({
  drawerItem: {
    paddingLeft: 0,
    paddingTop: 8,
    paddingBottom: 8
  },
});