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
    this.timeStamp = this.props.timeStamp;
    this.value1 = this.props.value1;
    this.value2 = this.props.value2;
    this.value3 = this.props.value3;
    this.value4 = this.props.value4;

    this.icon = require('../assets/icons/star.png');
  }

  render() {
    return (
      <View style={[localStyles.container, {marginTop: 20}]}>
        <View style={[Style.colContent]}>
          <View style={{flex: 8, borderBottomWidth: 1, borderBottomColor: Color.whiteGrey1, 
            paddingBottom: 5}}>
            <Text style={localStyles.coinTypeText}>{this.coinType}</Text>
            <Text style={localStyles.timeStampText}>{this.timeStamp}</Text>
          </View>

          <View style={{flex: 2, justifyContent: 'center', paddingBottom: 5}}>
            <TouchableOpacity style={localStyles.floatIcon} onPress={this.props.onPress}>
              <Image source={this.icon} style={{tintColor: Color.yellow, width: 25, height: 25}}></Image>
            </TouchableOpacity>
            <Text style={{fontSize: 10, fontWeight: 'bold', textAlign: 'center'}}>
              Signal</Text>
          </View>

        </View>

        
        <View style={[Style.colContent, {marginTop: 5}]}>
          <View style={{marginRight: 10}}>
            <Text style={localStyles.priceTitle}>Price (BTC)</Text>
            <Text style={localStyles.valueText}>{this.value1}</Text>
          </View>

          <View style={{marginRight: 10}}>
            <Text style={localStyles.priceTitle}>Base Volume</Text>
            <Text style={localStyles.valueText}>{this.value2}</Text>
          </View>

          <View style={{marginRight: 10}}>
            <Text style={localStyles.priceTitle}>Buy Order</Text>
            <Text style={localStyles.valueText}>{this.value3}</Text>
          </View>

          <View>
            <Text style={localStyles.priceTitle}>Sell Order</Text>
            <Text style={localStyles.valueText}>{this.value4}</Text>
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
    backgroundColor: '#b9babc',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    
  },
  priceTitle: {
    fontSize: 12, 
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
    backgroundColor: Color.signalIcon, 
    padding: 5,
    alignItems: 'center',
  },
  valueText: {
    alignItems:'flex-start', 
    fontSize: 12, 
  }
});