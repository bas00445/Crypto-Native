import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class CustomButton extends Component {

  render() {
    var buttonColor = this.props.bgColor == null ? "#333333": this.props.bgColor;
    var textColor = this.props.textColor == null ? "#ffffff": this.props.textColor;
    return (
      <TouchableOpacity style={[Style.customButton, {backgroundColor: buttonColor}]} 
        onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
        <Text style={[Style.customButtonText, {color: textColor}]}>{this.props.buttonText}</Text>
      </TouchableOpacity>
    );
  }
}

var Style = StyleSheet.create({
    customButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333333'
    },
    customButtonText: {
      fontSize: 28,
      color: '#ffffff'
    }
});