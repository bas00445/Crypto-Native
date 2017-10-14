import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export default class CustomButton extends Component {

  constructor(props) {
    super(props);


    switch(this.props.iconName) {
      case 'Home': {
        this.icon = require('../assets/icons/home.png');
        this.tintColor = Color.yellow;
      } break;
      case 'Transaction': {
        this.icon = require('../assets/icons/history.png');
      } break;
      case 'Setting': {
        this.icon = require('../assets/icons/setting.png');
        this.tintColor = Color.green;
      } break;
      case 'Sign out': {
        this.icon = require('../assets/icons/close.png');
        this.tintColor = Color.red;
      } break;
    }
  }

  render() {
    var itemColor = this.props.itemColor == null ? "#333333": this.props.itemColor;
    var textColor = this.props.textColor == null ? "#ffffff": this.props.textColor;
    var active = this.props.active == null ? false: this.props.active;
    return (
      <TouchableHighlight style={[Style.colContent, {backgroundColor: itemColor}]} 
        onPress={this.props.onPress}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image style={[Style.drawerIcon, {tintColor: Color.grey}]} source={this.icon}></Image>
        </View>
        <View style={{flex: 3}}>
         <Text style={localStyles.drawerItemText}>{this.props.iconName}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

var Style = StyleSheet.create({
  drawerItemText: {
    color: Color.grey,
    fontSize: 18
  },
  drawerItem: {
    flexDirection: 'row',
    paddingLeft: 0,
    paddingTop: 8
  },
});