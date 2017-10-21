import React, { Component } from 'react';
import Theme from '../../styles/GlobalStyles';
import SignalComponent from '../../components/SignalComponent';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  DatePickerAndroid,
  TouchableOpacity,
  Modal,
  Button,
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
      selectedDate: day + '/' + month + '/' + year,
      showModal: false,
    }

    this.generateSignalComponent();
  }

  generateSignalComponent() {
    var views = [];
    var coinList = ['Dash', 'BTC', 'QTUM']
    for(var i=0; i < 7; i++) {
      var stamp = new Date().toString();
      var v1 = Math.random(), v3 = Math.random()*1000, 
          v2 = Math.random()*1200, v4 = Math.random()*1100;
      var coin = coinList[i%3];
      views.push(
        <SignalComponent value1={v1.toFixed(6)} value2={v2.toFixed(2)} value3={v3.toFixed(2)} 
          value4={v4.toFixed(2)} key={i}
        timeStamp={stamp} coinType={coin} onPress={this.showModal.bind(this, true)}></SignalComponent>
      );
    }

    this.signalList = views;
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

  showModal(visible) {
    if (visible == true) {
        this.setState({showModal: true});
    } else {
        this.setState({showModal: false});            
    }
}

  buyOrder() {
    alert('Buying is successful');
    this.showModal(false);
  }

  renderModal() {
    return(
      <Modal 
        animationType="slide"
        transparent={false}
        visible={this.state.showModal}
        onRequestClose={() => {this.showModal(this, false)}}>

        <View style={{flex: 1, padding: 20, backgroundColor: Color.grey, 
          justifyContent: 'center'}}>

          <View style={{backgroundColor: '#f5f5f5', padding: 10, opacity: 0.7,}}>
            <View style={{marginBottom: 10}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: Color.grey}}>
                Do you want to buy this order ?</Text>
            </View>

            <View style={Style.colContent}>
              <View style={{flex: 1, padding: 5}}>
                  <Button
                      onPress={this.buyOrder.bind(this)}
                      title="Yes"
                      color={Color.whiteGrey2}/>
              </View>
              <View style={{flex: 1, padding: 5}}>
                  <Button
                      onPress={this.showModal.bind(this, false)}
                      title="No"
                      color={Color.whiteGrey2}/>
              </View>
            </View>
          </View>
        </View>

      </Modal>
    );
  }

  render() {
    return (
      <View style={{flex: 1, paddingLeft: 10, paddingTop: 10, backgroundColor: Color.whiteGrey1}}>
        {this.renderModal()}
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
            {this.signalList}
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