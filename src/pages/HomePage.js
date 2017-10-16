import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export default class HomePage extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>      
        <View style={[Style.headerLabel, Style.colContent]}>
          <View style={{marginRight: 10, justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Image style={[Style.icon, {tintColor: Color.pureWhite}]}
                source={require('../assets/icons/hamburger.png')}></Image>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={Style.headerLabelText}>Home</Text>
          </View>
        </View>
      </View>
    );
  }
}