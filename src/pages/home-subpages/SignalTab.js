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
  ActivityIndicator
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
      selectedOrder: {},
      loadingSignal: true,
      showModal: false,
    }

    this.requestSignal(year, month, day);
  }

  async requestSignal(year, month, day){
    try {
      this.setState({loadingSignal: true}); // start loading animation          
      var response = await fetch('http://pk-cryptobot.herokuapp.com/api/get_signals?api_key=1&date=' + year + '-' + month + '-' + day);
      var responseJson = await response.json();

      this.setState({loadingSignal: false}); // start loading animation          
      
      var lst = JSON.parse(responseJson);
      this.setState({signalList: lst});
      this.generateSignalComponent();
    } catch(err) {
      console.error(err);
      this.setState({loadingSignal: false}); // start loading animation                
    }
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

  generateSignalComponent() {
    const views = [];
    var signalList = this.state.signalList;
    for(var x in signalList) {
      var obj = signalList[x];
      views.push(
        <SignalComponent value1={obj.price} value2={obj.base_volume} 
          value3={obj.open_buy_order} value4={obj.open_sell_order} key={x}
          timeStamp={obj.datetime} coinType={obj.name} onPress={this.buySelectedOrder.bind(this, obj)}>
          </SignalComponent>
      );
    }
    views.reverse(); // Show lastest data first
    this.setState({signalViews: views});
  }

  buySelectedOrder(obj) {
    this.showModal(true);
    this.setState({selectedOrder: obj});
  }

  showModal(visible) {
    if (visible == true) {
        this.setState({showModal: true});
    } else {
        this.setState({showModal: false});            
    }
  }

  comfirmOrder(selected) {
    alert('Buy the order name: ' + selected.name);
    this.showModal(false);
    this.setState({selectedOrder: {}});
  }

  renderModal() {
    var s = this.state.selectedOrder;
    return(
      <Modal 
        animationType="slide"
        transparent={false}
        visible={this.state.showModal}
        onRequestClose={() => {this.showModal(this, false)}}>

        <View style={{flex: 1, padding: 10, backgroundColor: Color.grey, 
          justifyContent: 'center'}}>

          <View style={{backgroundColor: '#b9babc', padding: 10, borderRadius: 4}}>
            <View style={{paddingHorizontal: 10}}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: Color.grey}}>
                Do you want to buy this order ?</Text>
            </View>

            <View style={{paddingRight: 10}}>
              <SignalComponent value1={s.price} value2={s.base_volume} 
                value3={s.open_buy_order} value4={s.open_sell_order}
                timeStamp={s.datetime} coinType={s.name}>
              </SignalComponent>
            </View>

            <View style={[Style.colContent, {marginTop: 10}]}>
              <View style={{flex: 1, padding: 5}}>
                  <Button
                      onPress={this.comfirmOrder.bind(this, s)}
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

  renderLoading() {
    if(this.state.loadingSignal) {
      return(<ActivityIndicator animating={true} size={'large'} color={Color.pink}></ActivityIndicator>);
    } else {
      return null;
    }
  }

  renderSignalList() {
    if(!this.state.loadingSignal) {
      return(<ScrollView>{this.state.signalViews}</ScrollView>);
    } else {
      return null;
    }
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
        <View style={{flex: 1, paddingBottom: 10, justifyContent: 'center'}}>
          {this.renderLoading()}
          {this.renderSignalList()}
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