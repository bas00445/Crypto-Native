import React, { Component } from 'react';
import Theme from '../../styles/GlobalStyles';
import SignalComponent from '../../components/SignalComponent';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export default class SecondTab extends Component {
  static navigationOptions = {
    title: 'Signal',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/icons/alarm.png')}
        style={[Style.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <View style={{flex: 1, padding: 10}}>
        <View style={[Style.cardContainer, {marginBottom: 5}]}>
          <Text style={localStyles.signalText}>Signals</Text>
        </View>
        <View style={[Style.cardContainer, {flex: 1}]}>
          <ScrollView>
            <SignalComponent signalType={'signal'} coinType={'OMG'} 
              detail={'detail'} value={100}></SignalComponent>    
            <SignalComponent signalType={'signal'} coinType={'DASH'} 
              detail={'detail'} value={300}></SignalComponent>    
            <SignalComponent signalType={'signal'} coinType={'OMG'} 
              detail={'detail'} value={25}></SignalComponent>    
            <SignalComponent signalType={'signal'} coinType={'QTUM'} 
              detail={'detail'} value={5000}></SignalComponent>    
            <SignalComponent signalType={'signal'} coinType={'OMG'} 
              detail={'detail'} value={100}></SignalComponent>    
            <SignalComponent signalType={'signal'} coinType={'BTC'} 
              detail={'detail'} value={1000}></SignalComponent>    
            <SignalComponent signalType={'signal'} coinType={'OMG'} 
              detail={'detail'} value={25}></SignalComponent>    
            <SignalComponent signalType={'signal'} coinType={'QTUM'} 
              detail={'detail'} value={5000}></SignalComponent>    
            <SignalComponent signalType={'signal'} coinType={'OMG'} 
              detail={'detail'} value={100}></SignalComponent>    
            <SignalComponent signalType={'signal'} coinType={'BTC'} 
              detail={'detail'} value={1000}></SignalComponent>    
            <SignalComponent signalType={'signal'} coinType={'OMG'} 
              detail={'detail'} value={100}></SignalComponent>    
            <SignalComponent signalType={'signal'} coinType={'BTC'} 
              detail={'detail'} value={1000}></SignalComponent>    
          </ScrollView>
        </View>
      </View>
    );
  }
}

var localStyles = StyleSheet.create({
  signalText: {
    paddingLeft: 4, 
    color: Color.grey,
    fontSize: 18,
    fontWeight: 'bold'
  },
});