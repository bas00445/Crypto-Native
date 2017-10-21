import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export default class SignalComponent extends Component {

  constructor(props) {
    super(props);

    this.coinType = this.props.coinType;
    this.signalType = this.props.signalType;
    this.timeStamp = this.props.timeStamp;
    this.value1 = this.props.value1;
    this.value2 = this.props.value2;

    switch(this.signalType) {
      case 'signal': {
        this.icon = require('../assets/icons/star.png');
        this.tintColor = Color.yellow;
      } break;
      case 'buy': {
        this.icon = require('../assets/icons/shopping.png');
        this.tintColor = Color.darkGreen;
      } break;
      case 'sellUp': {
        this.icon = require('../assets/icons/trend-up.png');
        this.tintColor = Color.green;
      } break;
      case 'sellDown': {
        this.icon = require('../assets/icons/trend-down.png');
        this.tintColor = Color.red;
      } break;
    }

  }

  render() {
    return (
      <View style={{marginTop: 20}}>
          <View style={{backgroundColor: Color.whiteGrey1, height: 20}}>
          </View>
          <View style={localStyles.floatIcon}>
            <Image source={this.icon} style={{tintColor: '#757575'}}></Image>
          </View>
          <View style={[Style.colContent, localStyles.container]}>
            <View style={{flex: 8}}>
              <View>
                <Text style={localStyles.coinTypeText}>{this.coinType}</Text>
              </View>
              <View>
                <Text style={localStyles.timeStampText}>2017-10-19 19:00</Text>
              </View>
              <View style={Style.colContent}>
                <View style={{flex: 1}}>
                  <Text style={localStyles.priceTitle}>Price (BTC)</Text>
                  <Text style={{alignItems:'flex-start'}}>0.00000008</Text>
                </View>

                <View style={{flex: 1}}>
                  <Text style={localStyles.priceTitle}>Price (BTC)</Text>
                  <Text style={{alignItems:'flex-start', fontSize: 12, color: Color.grey}}>+0.66%</Text>
                </View>

              </View>
            </View>

            <View style={{flex: 2}}></View>

          </View>
         
      </View>
    );
  }
}


var localStyles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  priceTitle: {
    fontSize: 14, 
    fontWeight: 'bold', 
    color: Color.white
  },
  timeStampText: {
    fontSize: 10, 
    color: Color.white
  },
  coinTypeText: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: Color.pink
  },
  floatIcon: {
    borderRadius: 4, 
    backgroundColor: Color.white, 
    position: 'absolute', 
    right: 20, 
    zIndex: 2, 
    padding: 10
  }
});