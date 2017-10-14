import React, { Component } from 'react';
import Theme from '../../styles/GlobalStyles';
import {
  StyleSheet,
  Text,
  View,
  Image,
  DatePickerAndroid
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export default class FirstTab extends Component {
  static navigationOptions = {
    title: 'First Tab',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/icons/line-chart-shape.png')}
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
        this.setState({date: selectedDate});
      }
    } catch ({code, message}) {
      alert('Cannot open date picker', message);
    }
  }

  render() {
    return (
      <View style={{flex: 1, padding: 10}}>
        <View style={Style.cardContainer}>
          <View style={Style.colContent}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Text style={{fontSize: 18}}>Select a date</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={{fontSize: 18}}
                onPress={this.openDatePicker.bind(this)}>
                {this.state.selectedDate}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}