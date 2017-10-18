import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export default class SettingPage extends Component {
  static navigationOptions = {
    title: 'Setting',
  };

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
            <Text style={Style.headerLabelText}>Setting</Text>
          </View>
        </View>
        <View style={{flex: 1, padding: 10}}>
          <View style={[Style.cardContainer, {padding: 4}]}>
            <View style={[Style.colContent, {padding: 4, borderBottomColor: '#ccc', borderBottomWidth: 1}]}>
              <View style={{flex: 1, alignItems:'flex-start'}}>
                <Text style={{fontSize: 16, justifyContent: 'center'}}>Auto Trading</Text>
              </View>
              <View style={{flex: 1, alignItems:'flex-end'}}>
                <Switch style={{justifyContent: 'center'}}></Switch>
              </View>
            </View>

            <View style={[Style.colContent, {padding: 4}]}>
              <View style={{flex: 1, alignItems:'flex-start', justifyContent: 'center'}}>
                <Text style={{fontSize: 16, justifyContent: 'center'}}>Semi-auto Trading</Text>
              </View>
              <View style={{flex: 1, alignItems:'flex-end'}}>
                <Switch style={{justifyContent: 'center'}} value={true}></Switch>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}