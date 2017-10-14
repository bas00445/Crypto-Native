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
      case 'signal': this.icon = require('../assets/icons/star-shape.png'); break;
      case 'buy': this.icon = require('../assets/icons/dollar-shape.png'); break;
      case 'sellUp': this.icon = require('../assets/icons/arrow-up-shape.png'); break;
      case 'sellDown': this.icon = require('../assets/icons/arrow-down-shape.png'); break;
    }
    
  }

  render() {
    return (
      <View style={[Style.colContent, {flex: 1, padding: 5}]}>
        <View style={{flex: 2}}>
          <Image source={this.icon}>
          </Image>
        </View>

        <View style={{flex: 4}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {this.coinType}
          </Text>
        </View>

        <View style={{flex: 4}}>
          <View>
            <Text>{this.detail}</Text>
          </View>
          <View>
            <Text>{this.value}</Text>
          </View>

        </View>

      </View>
    );
  }
}

var Style = StyleSheet.create({

});