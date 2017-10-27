import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import { firebaseConfig, firebaseUID, setUID } from '../globalvars/FirebaseConfig';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
  TextInput,
  AsyncStorage
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export default class SettingPage extends Component {
  static navigationOptions = {
    title: 'Setting',
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    try {
      AsyncStorage.getItem('isNotify').then(
        (value) => {this.setState({isNotify: value})}
      ); AsyncStorage.getItem('isSimulator').then(
        (value) => {this.setState({isSimulator: value})}
      ); AsyncStorage.getItem('isTrading').then(
        (value) => {this.setState({isTrading: value})}
      ); AsyncStorage.getItem('isAuto').then(
        (value) => {this.setState({isAuto: value})}
      ); AsyncStorage.getItem('isSemi').then(
        (value) => {this.setState({isSemi: value})}
      );
      this.setState({
        bitTrexKey: '557-996-4447'
      }); 
    } catch(err) {
      console.log('Err');
    }
  }

  notBool(sbool) {
    if(sbool == 'true'){
      return 'false';
    } else {
      return 'true'
    }
  }

  toggleSwitch(switchName) {
    switch(switchName) {
      case 'notify': 
        {
          var opposite = this.notBool(this.state.isNotify);
          this.setState({isNotify: opposite});
          AsyncStorage.setItem('isNotify', opposite);          
        } break;
      case 'simulator': 
      {
        var opposite = this.notBool(this.state.isSimulator);
        this.setState({isSimulator: opposite});
        AsyncStorage.setItem('isSimulator', opposite);                    
      } break;
      case 'trading': 
      {
        var opposite = this.notBool(this.state.isTrading);          
        this.setState({isTrading: opposite});
        AsyncStorage.setItem('isTrading', opposite);                              
      } break;
      case 'isAuto':
      {
        var opposite = this.notBool(this.state.isAuto);          
        this.setState({isSemi: this.state.isAuto, isAuto: opposite});
        AsyncStorage.setItem('isSemi', this.state.isAuto);                              
        AsyncStorage.setItem('isAuto', opposite);                              
      } break;
      case 'isSemi':
      {
        var opposite = this.notBool(this.state.isSemi);          
        this.setState({isAuto: this.state.isSemi, isSemi: opposite});
        AsyncStorage.setItem('isAuto', this.state.isSemi);                                      
        AsyncStorage.setItem('isSemi', opposite);                              
      } break;
      
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Color.whiteGrey1}}>      
        <View style={Style.headerLabel}>
          <View style={Style.colContent}>
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
        </View>
        <View style={localStyles.settingContainer}>
          <ScrollView>
            <View style={localStyles.settingItem}>
              <View style={{flex: 1, alignItems:'flex-start', justifyContent: 'center'}}>
                <Text style={localStyles.settingItemText}>Notification</Text>
              </View>
              <View style={{flex: 1, alignItems:'flex-end'}}>
                <Switch style={{justifyContent: 'center'}} value={this.state.isNotify == 'true'}
                  onValueChange={(value) => {this.toggleSwitch('notify')}}></Switch>
              </View>
            </View>
            
            <View style={localStyles.settingItem}>
              <View style={{flex: 1, alignItems:'flex-start', justifyContent: 'center'}}>
                <Text style={localStyles.settingItemText}>Simulator</Text>
              </View>
              <View style={{flex: 1, alignItems:'flex-end'}}>
                <Switch style={{justifyContent: 'center'}} value={this.state.isSimulator == 'true'}
                  onValueChange={(value) => { this.toggleSwitch('simulator')}}></Switch>
              </View>
            </View>
            
            <View>
               <View style={localStyles.settingItem}>
                <View style={{flex: 1, alignItems:'flex-start', justifyContent: 'center'}}>
                  <Text style={localStyles.settingItemText}>Trading</Text>
                </View>
                <View style={{flex: 1, alignItems:'flex-end'}}>
                  <Switch style={{justifyContent: 'center'}} value={this.state.isTrading == 'true'}
                    onValueChange={(value) => {this.toggleSwitch('trading')}}></Switch>
                </View>
              </View> 

              <View style={localStyles.settingItem}>
                <View style={{flex: 1, alignItems:'flex-start', justifyContent: 'center'}}>
                  <Text style={localStyles.subItemText}>Auto</Text>
                </View>
                <View style={{flex: 1, alignItems:'flex-end'}}>
                  <Switch style={{justifyContent: 'center'}} value={this.state.isAuto == 'true'}
                    onValueChange={(value) => {this.toggleSwitch('isAuto')}}
                    disabled={this.notBool(this.state.isTrading) == 'true'}></Switch>
                </View>
              </View>

              <View style={localStyles.settingItem}>
                <View style={{flex: 1, alignItems:'flex-start', justifyContent: 'center'}}>
                  <Text style={localStyles.subItemText}>Semi-auto</Text>
                </View>
                <View style={{flex: 1, alignItems:'flex-end'}}>
                  <Switch style={{justifyContent: 'center'}} value={this.state.isSemi == 'true'}
                    onValueChange={(value) => {this.toggleSwitch('isSemi')}}
                    disabled={this.notBool(this.state.isTrading) == 'true'}></Switch>
                </View>
              </View>
            </View>

            <View style={localStyles.settingItem}>
              <View style={{flex: 1, alignItems:'flex-start', justifyContent: 'center'}}>
                <Text style={localStyles.settingItemText}>Bittrex API Key</Text>
              </View>
              <View style={{flex: 1}}>
                <TextInput secureTextEntry={true} onChangeText={(text) => {this.setState({bitTrexKey: text})}}
                  placeholder="555-777-2" selectionColor={Color.grey}
                  underlineColorAndroid={Color.whiteGrey1}
                  placeholderTextColor={Color.whiteGrey1}
                  style={{color: Color.whiteGrey1}}></TextInput>
              </View>
            </View>

          </ScrollView>
        </View>
      </View>
    );
  }
}

var localStyles = StyleSheet.create({
  settingContainer: {
    flex: 1, 
    backgroundColor: 
    Color.lightWhite
  },
  settingItem: {
    flexDirection: 'row',
    padding: 10, 
    borderBottomColor: Color.white,
    borderBottomWidth: 0.5
  },
  settingItemText: {
    fontSize: 16,
    fontWeight: 'bold', 
    justifyContent: 'center',
    color: Color.grey
  },
  subItemText: {
    flexDirection: 'row',
    fontSize: 16,
    paddingLeft: 10,
    color: Color.grey
  },
  settingItem_noline: {
    flexDirection: 'row',
    padding: 10, 
  },
  settingType: {
    padding: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: Color.grey
  },

});