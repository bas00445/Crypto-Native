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
    this.type = '';

    switch(this.signalType) {
      case 'signal': {
        this.icon = require('../assets/icons/star.png');
        this.tintColor = Color.yellow;
        this.type = 'Signal';
      } break;
      case 'buy': {
        this.icon = require('../assets/icons/shopping.png');
        this.tintColor = Color.darkGreen;
        this.type = 'Buy';
      } break;
      case 'sellUp': {
        this.icon = require('../assets/icons/trend-up.png');
        this.tintColor = Color.green;
        this.type = 'Sell';
      } break;
      case 'sellDown': {
        this.icon = require('../assets/icons/trend-down.png');
        this.tintColor = Color.red;
        this.type = 'Sell';
      } break;
    }

  }

  render() {
    return (
      <View style={{marginTop: 20}}>
          <View style={[Style.colContent, localStyles.container]}>
            <View style={{flex: 7}}>
              <View style={{borderBottomWidth: 1, borderBottomColor: Color.white, 
                paddingBottom: 5, marginBottom: 5}}>
                <Text style={localStyles.coinTypeText}>{this.coinType}</Text>
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

            <View style={{flex: 3, justifyContent: 'center'}}>
              <View style={localStyles.floatIcon}>
                <Image source={this.icon} style={{tintColor: this.tintColor, width: 40, height: 40}}></Image>
              </View>
              <Text style={{fontSize: 12, fontWeight: 'bold', textAlign: 'center'}}>
                {this.type}</Text>
            </View>

          </View>
         
      </View>
    );
  }
}


var localStyles = StyleSheet.create({
  container: {
    padding: 10,
    paddingRight: 0,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
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
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: Color.white, 
    padding: 10,
    alignItems: 'center'
  }
});