import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
  TextInput
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
      isNotify: false,
      isSimulator: false,
      isAuto: false,
      isSemi: false,
      bitTrexKey: '557-996-4447'
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
                <Switch style={{justifyContent: 'center'}}></Switch>
              </View>
            </View>
            
            <View style={localStyles.settingItem}>
              <View style={{flex: 1, alignItems:'flex-start', justifyContent: 'center'}}>
                <Text style={localStyles.settingItemText}>Simulator</Text>
              </View>
              <View style={{flex: 1, alignItems:'flex-end'}}>
                <Switch style={{justifyContent: 'center'}}></Switch>
              </View>
            </View>
            
            <View>
              <Text style={localStyles.settingType}>Trading</Text>

              <View style={localStyles.settingItem}>
                <View style={{flex: 1, alignItems:'flex-start', justifyContent: 'center'}}>
                  <Text style={localStyles.subItemText}>Auto</Text>
                </View>
                <View style={{flex: 1, alignItems:'flex-end'}}>
                  <Switch style={{justifyContent: 'center'}}></Switch>
                </View>
              </View>

              <View style={localStyles.settingItem}>
                <View style={{flex: 1, alignItems:'flex-start', justifyContent: 'center'}}>
                  <Text style={localStyles.subItemText}>Semi-auto</Text>
                </View>
                <View style={{flex: 1, alignItems:'flex-end'}}>
                  <Switch style={{justifyContent: 'center'}}></Switch>
                </View>
              </View>
            </View>

            <View style={localStyles.settingItem}>
              <View style={{flex: 1, alignItems:'flex-start', justifyContent: 'center'}}>
                <Text style={localStyles.settingItemText}>Bitrex API Key</Text>
              </View>
              <View style={{flex: 1}}>
                <TextInput secureTextEntry={true} onChangeText={(text) => {this.setState({pass: text})}}
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
    fontSize: 14,
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