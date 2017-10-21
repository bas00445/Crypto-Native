import React, { Component } from 'react';
import Theme from '../../styles/GlobalStyles';
import BuySellComponent from '../../components/BuySellComponent';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  DatePickerAndroid,
  TouchableOpacity
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export default class SignalTab extends Component {
  static navigationOptions = {
    title: 'Signal',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/icons/alarm.png')}
        style={[Style.icon, {tintColor: tintColor}]}
      />
    ),
  };

  constructor(props) {
    super(props);

    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    this.state = {
      date: {
        day: day,
        month: month,
        year: year
      },
      selectedDate: day + '/' + month + '/' + year
    }
  }

  async openDatePicker() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // If selected a date
        var selectedDate = {
          day: day,
          month: month,
          year: year
        };
        this.setState({
          date: selectedDate, 
          selectedDate: day + '/' + month + '/' + year
        });
      }
    } catch ({code, message}) {
      alert('Cannot open date picker', message);
    }
  }

  render() {
    return (
      <View style={{flex: 1, paddingLeft: 10, paddingTop: 10, backgroundColor: Color.whiteGrey1}}>
        <View style={Style.datePickerContainer}>
          <TouchableOpacity onPress={this.openDatePicker.bind(this)}>  
            <View style={Style.colContent}>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <Text style={{fontSize: 16, color: Color.pureWhite}}>Select a date</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text style={{fontSize: 16, color: Color.pureWhite}}>
                  {this.state.selectedDate}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <ScrollView>
            <BuySellComponent signalType={'signal'} coinType={'OMG'} 
              detail={'detail'} value={100}></BuySellComponent>    
            <BuySellComponent signalType={'signal'} coinType={'DASH'} 
              detail={'detail'} value={300}></BuySellComponent>    
            <BuySellComponent signalType={'signal'} coinType={'OMG'} 
              detail={'detail'} value={25}></BuySellComponent>    
            <BuySellComponent signalType={'signal'} coinType={'QTUM'} 
              detail={'detail'} value={5000}></BuySellComponent>    
            <BuySellComponent signalType={'signal'} coinType={'OMG'} 
              detail={'detail'} value={100}></BuySellComponent>    
            <BuySellComponent signalType={'signal'} coinType={'BTC'} 
              detail={'detail'} value={1000}></BuySellComponent>    
            <BuySellComponent signalType={'signal'} coinType={'OMG'} 
              detail={'detail'} value={25}></BuySellComponent>    
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