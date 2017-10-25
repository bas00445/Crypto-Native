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

export default class BuySellComponent extends Component {

  constructor(props) {
    super(props);

    this.coinType = this.props.coinType;
    this.timeStamp = this.props.timeStamp;
    this.value1 = this.props.value1;
    this.value2 = this.props.value2;
    this.type = '';
    if (this.value2 == null) {
      this.signalType = 'buy'
    } else {
      this.signalType = this.value2 >= 0 ? 'sellUp' : 'sellDown'
    }

    switch(this.signalType) {
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

  renderProfitArea() {
    if(this.value2 != null){
      return(
      <View>
        <Text style={localStyles.priceTitle}>Profit (%)</Text>
        <Text style={localStyles.valueText}>{this.value2 + '%'}</Text>
      </View>
      );
    }
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
            <Text style={localStyles.valueText}>{this.value1}</Text>
          </View>
          {this.renderProfitArea()}
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
    backgroundColor: '#808080', 
    padding: 5,
    alignItems: 'center',
  },
  valueText: {
    alignItems:'flex-start', 
    fontSize: 12, 
  }
});