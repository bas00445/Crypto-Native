import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export default class SignalComponent extends Component {

  constructor(props) {
    super(props);

    this.signalType = this.props.signalType;
    this.coinType = this.props.coinType;
    this.detail = this.props.detail;
    this.value = this.props.value;
    
    switch(this.signalType) {
      case 'signal': {
        this.icon = require('../assets/icons/star-shape.png');
        this.tintColor = Color.yellow;
      } break;
      case 'buy': {
        this.icon = require('../assets/icons/buy-shape.png');
      } break;
      case 'sellUp': {
        this.icon = require('../assets/icons/arrow-up-shape.png');
        this.tintColor = Color.green;
      } break;
      case 'sellDown': {
        this.icon = require('../assets/icons/arrow-down-shape.png');
        this.tintColor = Color.red;
      } break;
    }

  }

  render() {
    return (
      <View style={[Style.centerY, {flex: 1, borderBottomColor: 
      '#ccc', borderBottomWidth: 1, padding: 5}]}>  
        <View style={[Style.colContent, {flex: 1}]}>
          <View style={[Style.centerX, Style.centerY, {flex: 2}]}>
            <Image style={[{tintColor: this.tintColor}, Style.icon]} source={this.icon}>
            </Image>
          </View>

          <View style={[Style.centerX, Style.centerY, {flex: 4}]}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {this.coinType}
            </Text>
          </View>

          <View style={[Style.centerX, Style.centerY, {flex: 4}]}>
            <View>
              <Text>{this.detail}</Text>
            </View>
            <View>
              <Text>{this.value}</Text>
            </View>
          </View>

        </View>
      </View>
    );
  }
}
