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

export default class BuySellComponent extends Component {

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
      <View style={[localStyles.container, {marginTop: 20}]}>

        <View style={[Style.colContent]}>
          <View style={{flex: 8, borderBottomWidth: 1, borderBottomColor: Color.whiteGrey1, 
            paddingBottom: 5}}>
            <Text style={localStyles.coinTypeText}>{this.coinType}</Text>
            <Text style={localStyles.timeStampText}>2017-10-19 19:00</Text>
          </View>

          <View style={{flex: 2, justifyContent: 'center', paddingBottom: 5}}>
            <View style={localStyles.floatIcon}>
              <Image source={this.icon} style={{tintColor: this.tintColor, width: 25, height: 25}}></Image>
            </View>
            <Text style={{fontSize: 10, fontWeight: 'bold', textAlign: 'center'}}>
              {this.type}</Text>
          </View>

        </View>

        
        <View style={[Style.colContent, {marginTop: 5}]}>
          <View style={{marginRight: 20}}>
            <Text style={localStyles.priceTitle}>Price (BTC)</Text>
            <Text style={{alignItems:'flex-start'}}>0.00000008</Text>
          </View>

          <View>
            <Text style={localStyles.priceTitle}>Price (BTC)</Text>
            <Text style={{alignItems:'flex-start', fontSize: 12, color: Color.grey}}>+0.66%</Text>
          </View>
        </View> 

          
      </View>
    );
  }
}


var localStyles = StyleSheet.create({
  container: {
    opacity: 0.7,
    padding: 10,
    paddingRight: 0,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    
  },
  priceTitle: {
    fontSize: 14, 
    fontWeight: 'bold', 
    color: Color.whiteGrey1
  },
  timeStampText: {
    fontSize: 10, 
    color: Color.whiteGrey1
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
    backgroundColor: '#808080', 
    padding: 5,
    alignItems: 'center',
  }
});