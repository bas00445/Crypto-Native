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

    this.timeStamp = this.props.timeStamp;
    this.value1 = this.props.value1;
    this.icon = require('../assets/icons/dollar.png');
    this.tintColor = Color.white;
  }

  render() {
    return (
      <View style={[localStyles.container, {marginTop: 20}]}>
        <View style={[Style.colContent]}>
          <View style={{flex: 8, borderBottomWidth: 1, borderBottomColor: '#576275', 
            paddingBottom: 2}}>
            <Text style={localStyles.titleName}>Summary</Text>
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
            <Text style={localStyles.priceTitle}>Total Profit</Text>
            <Text style={localStyles.valueText}>{this.value1 + '%'}</Text>
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
    backgroundColor: Color.whiteGreyBlue,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    
  },
  priceTitle: {
    fontSize: 12, 
    fontWeight: 'bold', 
    color: Color.white
  },
  titleName: {
    fontSize: 24, 
    fontWeight: 'bold', 
    color: Color.pink
  },
  floatIcon: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: Color.whiteGrey1, 
    padding: 5,
    alignItems: 'center',
  },
  valueText: {
    alignItems:'flex-start', 
    fontSize: 12, 
    color: Color.white    
  }
});