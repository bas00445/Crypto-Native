import React, { Component } from 'react';
import Theme from '../../styles/GlobalStyles';
import BuySellComponent from '../../components/BuySellComponent';
import {
  StyleSheet,
  Text,
  View,
  Image,
  DatePickerAndroid,
  ScrollView,
  TouchableOpacity
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export default class SimulatorTab extends Component {
  static navigationOptions = {
    title: 'Simulator',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/icons/line-chart.png')}
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

    this.generateBuySellComponent();
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
          selectedDate: year + '/' + month + '/' + day
        });
        
        
      }
    } catch ({code, message}) {
      alert('Cannot open date picker', message);
    }
  }

  generateBuySellComponent() {
    var views = [];
    var coinList = ['Dash', 'BTC', 'QTUM'];
    var typeList = ['buy', 'sellUp', 'sellDown']
    for(var i=0; i < 7; i++) {
      var stamp = new Date().toString();
      var v1 = Math.random(), v3 = Math.random()*1000, 
          v2 = Math.random()*1200, v4 = Math.random()*1100;
      var coin = coinList[i%3];
      var type = typeList[i%3];
      views.push(<BuySellComponent value1={v1.toFixed(8)} value2={v2.toFixed(2)} key={i} signalType={type}
        timeStamp={stamp} coinType={coin}></BuySellComponent>);
    }

    this.buySellList = views;
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
        <View style={{flex: 1, paddingBottom: 10}}>
          <ScrollView>
            {this.buySellList}
          </ScrollView>  
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
    borderRadius: 4, 
    backgroundColor: Color.white, 
    position: 'absolute', 
    right: 20, 
    zIndex: 2, 
    padding: 10
  }
});