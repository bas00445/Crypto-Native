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
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export default class SettingPage extends Component {
  static navigationOptions = {
    title: 'Setting',
  };

  constructor(props) {
    super(props);
    this.state = {
      isNotify: true,
      isSimulator: false,
      isTrading: false,
      isAuto: false,
      isSemi: true,
      bitTrexKey: '557-996-4447'
    } 

  }

  toggleSemiAndAuto() {
    var temp = this.state.isSemi, temp2 = this.state.isAuto;
    this.setState({
      isAuto: temp,
      isSemi: temp2
    })
  }

  toggleTrading() {
    this.setState({
      isTrading: !this.state.isTrading
    })
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
                <Switch style={{justifyContent: 'center'}} value={this.state.isNotify}
                  onValueChange={(value) => { this.setState({isNotify: !this.state.isNotify})}}></Switch>
              </View>
            </View>
            
            <View style={localStyles.settingItem}>
              <View style={{flex: 1, alignItems:'flex-start', justifyContent: 'center'}}>
                <Text style={localStyles.settingItemText}>Simulator</Text>
              </View>
              <View style={{flex: 1, alignItems:'flex-end'}}>
                <Switch style={{justifyContent: 'center'}} value={this.state.isSimulator}
                  onValueChange={(value) => { this.setState({isSimulator: !this.state.isSimulator})}}></Switch>
              </View>
            </View>
            
            <View>
               <View style={localStyles.settingItem}>
                <View style={{flex: 1, alignItems:'flex-start', justifyContent: 'center'}}>
                  <Text style={localStyles.settingItemText}>Trading</Text>
                </View>
                <View style={{flex: 1, alignItems:'flex-end'}}>
                  <Switch style={{justifyContent: 'center'}} value={this.state.isTrading}
                    onValueChange={(value) => {this.toggleTrading()}}></Switch>
                </View>
              </View> 

              <View style={localStyles.settingItem}>
                <View style={{flex: 1, alignItems:'flex-start', justifyContent: 'center'}}>
                  <Text style={localStyles.subItemText} value={this.state.isAuto}>Auto</Text>
                </View>
                <View style={{flex: 1, alignItems:'flex-end'}}>
                  <Switch style={{justifyContent: 'center'}} value={this.state.isAuto}
                    onValueChange={(value) => {this.toggleSemiAndAuto()}}
                    disabled={!this.state.isTrading}></Switch>
                </View>
              </View>

              <View style={localStyles.settingItem}>
                <View style={{flex: 1, alignItems:'flex-start', justifyContent: 'center'}}>
                  <Text style={localStyles.subItemText}>Semi-auto</Text>
                </View>
                <View style={{flex: 1, alignItems:'flex-end'}}>
                  <Switch style={{justifyContent: 'center'}} value={this.state.isSemi}
                    onValueChange={(value) => {this.toggleSemiAndAuto()}}
                    disabled={!this.state.isTrading}></Switch>
                </View>
              </View>
            </View>

            <View style={localStyles.settingItem}>
              <View style={{flex: 1, alignItems:'flex-start', justifyContent: 'center'}}>
                <Text style={localStyles.settingItemText}>Bitrex API Key</Text>
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