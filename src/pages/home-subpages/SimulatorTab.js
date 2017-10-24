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
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export default class SimulatorTab extends Component {
  static navigationOptions = {
    title: 'Simulator',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/icons/game.png')}
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
      selectedDate: year + '/' + month + '/' + day,
      loadingBuySell: true
    }

    this.requestBuySell(year, month, day);
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
          month: month + 1,
          year: year
        };
        this.setState({
          date: selectedDate, 
          selectedDate: year + '/' + (month+1) + '/' + day
        });
        
        this.requestBuySell(year, month+1, day);        
      }
    } catch ({code, message}) {
      alert('Cannot open date picker', message);
    }
  }

  async requestBuySell(year, month, day){
    try {
      this.setState({loadingBuySell: true}); // start loading animation        
      var response = await fetch('http://pk-cryptobot.herokuapp.com/api/get_sell_orders?api_key=1&date=' + year + '-' + month + '-' + day);
      var responseJson = await response.json();

      this.setState({loadingBuySell: false}); // stop loading animation    

      var lst = JSON.parse(responseJson);
      this.setState({buySellList: lst});
      this.generateBuySellComponent();
    } catch(err) {
      console.error(err);
      this.setState({loadingBuySell: false}); // stop loading animation          
    }
  }

  generateBuySellComponent() {
    const views = [];
    var buySellList = this.state.buySellList;
    for(var x in buySellList) {
      var obj = buySellList[x];      
      views.push(<BuySellComponent value1={obj.price} value2={obj.profit} key={x} signalType={'buy'}
        timeStamp={obj.datetime} coinType={obj.name}></BuySellComponent>);
    }
    views.reverse(); // Show lastest data first    
    this.setState({buySellViews: views, loadingBuySell: false});
  }

  renderLoading() {
    if(this.state.loadingBuySell) {
      return(<ActivityIndicator animating={true} size={'large'} color={Color.pink}></ActivityIndicator>);
    } else {
      return null;
    }
  }

  renderBuySellList() {
    if(!this.state.loadingBuySell) {
      return(<ScrollView>{this.state.buySellViews}</ScrollView>);
    } else {
      return null;
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
        <View style={{flex: 1, paddingBottom: 10, justifyContent: 'center'}}>
          {this.renderLoading()}
          {this.renderBuySellList()}
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