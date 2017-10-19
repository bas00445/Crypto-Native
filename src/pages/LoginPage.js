import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import * as firebase from 'firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import { firebaseConfig, firebaseUID, setUID } from '../globalvars/FirebaseConfig';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Modal,
} from 'react-native';

// Firebase config
firebase.initializeApp(firebaseConfig);

var Style = Theme.Style;
var Color = Theme.Color;

export default class LoginPage extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            newEmail: '',
            newPass: '',
            newPassConfirm: '',
            signupVisible: false,
            loading: false
        }
    }
    
    componentWillMount() {
        const { navigation } = this.props;
        this.auth = firebase.auth().onAuthStateChanged(
            function(user) {
              if (user) {
                setUID(user.uid);
                this.setState({loading: true});
                setTimeout(() => {
                    navigation.navigate('Main');
                    this.setState({loading: false});
                }, 1000);
              } else {
                setUID('');
              }
            }.bind(this)
          );

    }

    openSignupModal(isVisible) {
        if (isVisible == true) {
            this.setState({signupVisible: true});
        } else {
            this.setState({signupVisible: false});            
        }
    }

    signUp() {
      if (this.state.newPass == this.state.newPassConfirm) {
        firebase.auth().createUserWithEmailAndPassword(this.state.newEmail, this.state.newPass).then(
            (user) => {
                this.openSignupModal(false);

                fetch('http://52.221.73.154:1521/api/register', {
                    method: 'POST',
                    header: 'Create a user',
                    body: JSON.stringify({
                        api_key: 'sj234k32432j4',
                        uid: user.uid
                    })
                }).then(
                    (res) => {alert('Uid was sent to server')},
                    (err) => {alert('Unale to send uid to server')}
                );
            },
            (err) => {
                alert(err.toString());
            }
        );
      } else {
          alert('Passwords must be the same');
      }
  }  
  getFCMToken() {
    FCM.getFCMToken().then(token => {
        alert('Token' + token.toString());
        // store fcm token in your server
    });
  }

  async login() {
    try {
        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass);
    } catch (error) {
        alert(error.toString());
    }

    }

  render() {
    return (
      <View style={localStyles.container}>
        <View style={localStyles.imageContainer}>
            <Image style={{flex: 1, alignSelf: 'stretch', width: undefined, height: undefined, resizeMode: 'contain'}} 
            source={require('../assets/images/pk-black.png')}/>
        </View>

        <View style={localStyles.formContainer}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.signupVisible}
                onRequestClose={() => {this.openSignupModal(this, false)}}>
                <View style={{padding: 10, flex: 1}}>
                    <View style={{marginBottom: 4}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Create a new account</Text>
                    </View>

                    <View style={{marginBottom: 4}}>
                        <TextInput onChangeText={(text) => {this.setState({newEmail:text})}} 
                            placeholder={"Email"}></TextInput>
                    </View>

                    <View style={{marginBottom: 4}}>
                        <TextInput onChangeText={(text) => {this.setState({newPass:text})}} 
                            placeholder={"Password"}
                            secureTextEntry={true}></TextInput>
                    </View>
                    
                    <View style={{marginBottom: 4}}>
                        <TextInput onChangeText={(text) => {this.setState({newPassConfirm:text})}} 
                            placeholder={"Confirm Password"}
                            secureTextEntry={true}></TextInput>
                    </View>

                    <View style={Style.colContent}>
                        <View style={{flex: 1, padding: 5}}>
                            <Button
                                onPress={this.signUp.bind(this)}
                                title="Confirm"
                                color={Color.blue}/>
                        </View>
                        <View style={{flex: 1, padding: 5}}>
                            <Button
                                onPress={this.openSignupModal.bind(this, false)}
                                title="Cancel"
                                color={Color.red}/>
                        </View>
                    </View>
                    
                </View>
            </Modal>
            
            <View style={{flex:1, padding: 20, paddingTop: 5}}>
                <View style={{marginBottom:4}}>
                    <TextInput onChangeText={(text) => {this.setState({email:text})}}
                        placeholder="Email" selectionColor={Color.white}
                        underlineColorAndroid={'#8c8c8c'}
                        placeholderTextColor={'#8c8c8c'}
                        style={{color: Color.white}}></TextInput>
                </View>

                <View style={{marginBottom:4}}>
                    <TextInput secureTextEntry={true} onChangeText={(text) => {this.setState({pass: text})}}
                        placeholder="Password" selectionColor={Color.white}
                        underlineColorAndroid={'#8c8c8c'}
                        placeholderTextColor={'#8c8c8c'}
                        style={{color: Color.white}}></TextInput>
                </View>

                <Spinner visible={this.state.loading} textContent={"Logging in..."} textStyle={{color: '#FFF'}} />
                

                <View style={{padding: 5, marginBottom: 5}}>
                    <Button title="Sign in" color={Color.whiteGrey2} 
                        onPress={this.login.bind(this)}>
                    </Button>
                </View>

                <View style={{alignItems: 'center'}}>
                    <Text
                        style={{color: Color.white, fontSize: 14}}>Forgot your password ?</Text>
                </View>
                
            </View>

            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <View style={{alignItems: 'center'}}>
                    <View style={Style.colContent}>
                        <Text style={{color: Color.white, fontSize: 14}}>Don't have an account?</Text>
                        <Text style={{color:Color.white, fontWeight: 'bold', marginLeft: 5, fontSize: 14}}
                            onPress={this.openSignupModal.bind(this, true)}>
                            Create one</Text>
                    </View>
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
        backgroundColor: Color.grey        
    },
    imageContainer: {
        flex: 4,
        backgroundColor: '#25292f',
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
        flex: 6,
        padding: 10   
    },
    
});