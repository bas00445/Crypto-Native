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
  AsyncStorage
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
      selectedDate: year + '/' + month + '/' + day,
      signalList: null,
      showModal: false,
    }

    
    const value = AsyncStorage.getItem('isNotify').then(
      (value) => {
        console.log(value);
      }
    )
  }

  async requestSignal(year, month, day){
    try {
      var response = await fetch('http://pk-cryptobot.herokuapp.com/api/get_signals?api_key=1&date=' + year + '-' + month + '-' + day);
      var responseJson = await response.json();
      var lst = JSON.parse(responseJson);
      this.setState({signalList: lst});
      this.generateSignalComponent();
      console.log(lst);
    } catch(err) {
      console.error(err);
    }
  }

  generateSignalComponent() {
    const views = [];
    var signalList = this.state.signalList;
    for(var x in signalList) {
      var signal = signalList[x];
      views.push(
        <SignalComponent value1={signal.price} value2={signal.base_volume} 
          value3={signal.open_buy_order} value4={signal.open_sell_order} key={x}
          timeStamp={signal.datetime} coinType={signal.name} onPress={this.showModal.bind(this, true)}>
          </SignalComponent>
      );
    }

    this.setState({signalViews: views});
  }

  async openDatePicker() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // If selected a date
        var selectedDate = {
          day: day,
          month: (month+1),
          year: year
        };
        this.setState({
          date: selectedDate, 
          selectedDate: year + '/' + (month+1) + '/' + day
        });

        this.requestSignal(year, month+1, day);
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

          <View style={{backgroundColor: '#f5f5f5', padding: 10, opacity: 0.7, borderRadius: 4}}>
            <View style={{marginBottom: 10}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: Color.grey}}>
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
            {this.state.signalViews}
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