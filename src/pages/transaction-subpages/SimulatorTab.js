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

  renderSignalComponent() {
    return (
      <View>
        <BuySellComponent signalType={'buy'} coinType={'BTC'} 
        detail={'detail'} value={100}></BuySellComponent>
        <BuySellComponent signalType={'sellUp'} coinType={'QTUM'} 
        detail={'detail'} value={2000}></BuySellComponent>
        <BuySellComponent signalType={'sellDown'} coinType={'DASH'} 
        detail={'detail'} value={54}></BuySellComponent>
        <BuySellComponent signalType={'buy'} coinType={'QTUM'} 
        detail={'detail'} value={100}></BuySellComponent>
        <BuySellComponent signalType={'sellDown'} coinType={'BTC'} 
        detail={'detail'} value={100}></BuySellComponent>    
        <BuySellComponent signalType={'sellUp'} coinType={'OMG'} 
        detail={'detail'} value={100}></BuySellComponent>    
      </View> 
    );
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
            {this.renderSignalComponent()}          
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