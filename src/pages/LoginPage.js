import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button
} from 'react-native';

var Style = Theme.Style;
var Color = Theme.Color;

export default class LoginPage extends Component {

    static navigationOptions = {
        header: null
    }

  signIn() {
    this.props.navigation.navigate('Main');
  }  

  signInWithGoogle() {

  }

  render() {
    return (
      <View style={localStyles.container}>
        <View style={localStyles.imageContainer}>
            <Image style={{resizeMode: 'stretch'}} source={require('../assets/images/pksLogo.png')}/>
        </View>
        <View style={localStyles.formContainer}>
            <View style={Style.colContent}>
                <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>ID</Text>
                </View>
                <View style={{flex: 7}}>
                    <TextInput></TextInput>
                </View>
            </View>

            <View style={Style.colContent}>
                <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Password</Text>
                </View>
                <View style={{flex: 7}}>
                    <TextInput></TextInput>
                </View>
            </View>

            <View style={Style.colContent}>
                <View style={{flex: 1, padding: 5}}>
                    <Button
                        onPress={this.signIn.bind(this)}
                        title="Sign in"
                        color={Color.blue}/>
                </View>
                <View style={{flex: 1, padding: 5}}>
                    <Button
                        onPress={this.signInWithGoogle.bind(this)}
                        title="Google+"
                        color={Color.red}/>
                </View>
            </View>

        </View>
      </View>
    );
  }
}

var localStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333333'        
    },
    imageContainer: {
        flex: 4,
        backgroundColor: '#444444',
        alignItems: 'center'
    },
    formContainer: {
        flex: 6,
        backgroundColor: Color.white,
        padding: 10   
    }
});