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
            api_key: '',
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

    async sendUserUID(uid) {
        let data = {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              uid: uid,
              api_key: this.state.api_key
            })
          }
        await fetch('http://52.221.73.154:1521/api/register', data)
        .then(
            (res) => {console.log(res.json())}, 
            (err) => {console.log(err.json())},
            () => {console.log('Done')}
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
                this.sendUserUID(user.uid);
            },
            (err) => {
                alert(err.toString());
            }
        );
      } else {
          alert('Passwords must be the same');
      }
    }  

    forgotPassword(){
        console.log('Forgot password !!');
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
            <Image style={{flex: 1, alignSelf: 'center', width: 150, height: 150, resizeMode: 'contain'}} 
            source={require('../assets/images/pk-black.png')}/>
        </View>
        <View style={localStyles.formContainer}>
            <Modal 
                animationType="fade"
                transparent={false}
                visible={this.state.signupVisible}
                onRequestClose={() => {this.openSignupModal(this, false)}}>
                <View style={{padding: 20, flex: 1, backgroundColor: Color.grey}}>
                    <View style={{marginBottom: 4}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: Color.pureWhite}}>Create a new account</Text>
                    </View>

                    <View style={{marginBottom: 4}}>
                        <TextInput onChangeText={(text) => {this.setState({newEmail:text})}} 
                            placeholder={"Email"} selectionColor={Color.pureWhite}
                            underlineColorAndroid={Color.white}
                            placeholderTextColor={'#8c8c8c'}
                            style={{color: Color.pureWhite}}></TextInput>
                    </View>

                    <View style={{marginBottom: 4}}>
                        <TextInput onChangeText={(text) => {this.setState({newPass:text})}} 
                            placeholder={"Password"}
                            secureTextEntry={true} selectionColor={Color.pureWhite}
                            underlineColorAndroid={Color.white}
                            placeholderTextColor={'#8c8c8c'}
                            style={{color: Color.pureWhite}}></TextInput>
                    </View>
                    
                    <View style={{marginBottom: 4}}>
                        <TextInput onChangeText={(text) => {this.setState({newPassConfirm:text})}} 
                            placeholder={"Confirm Password"}
                            secureTextEntry={true} selectionColor={Color.pureWhite}
                            underlineColorAndroid={Color.white}
                            placeholderTextColor={'#8c8c8c'}
                            style={{color: Color.pureWhite}}></TextInput>
                    </View>

                    <View style={{marginBottom: 4}}>
                        <TextInput onChangeText={(text) => {this.setState({api_key:text})}} 
                            placeholder={"API Key"}
                            selectionColor={Color.pureWhite}
                            underlineColorAndroid={Color.white}
                            placeholderTextColor={'#8c8c8c'}
                            style={{color: Color.pureWhite}}></TextInput>
                    </View>

                    <View style={Style.colContent}>
                        <View style={{flex: 6, padding: 5}}>
                            <Button
                                onPress={this.signUp.bind(this)}
                                title="Confirm"
                                color={Color.whiteGrey2}/>
                        </View>
                        <View style={{flex: 4, padding: 5}}>
                            <Button
                                onPress={this.openSignupModal.bind(this, false)}
                                title="Cancel"
                                color={Color.whiteGrey2}/>
                        </View>
                    </View>
                </View>

            </Modal>
            
            <View style={{flex:1, padding: 20, paddingTop: 5}}>
                <View style={{marginBottom:4}}>
                    <TextInput onChangeText={(text) => {this.setState({email:text})}}
                        placeholder="Email" selectionColor={Color.pureWhite}
                        underlineColorAndroid={Color.white}
                        placeholderTextColor={'#8c8c8c'}
                        style={{color: Color.pureWhite}}></TextInput>
                </View>

                <View style={{marginBottom:4}}>
                    <TextInput secureTextEntry={true} onChangeText={(text) => {this.setState({pass: text})}}
                        placeholder="Password" selectionColor={Color.pureWhite}
                        underlineColorAndroid={Color.white}
                        placeholderTextColor={'#8c8c8c'}
                        style={{color: Color.pureWhite}}></TextInput>
                </View>

                <Spinner visible={this.state.loading} textContent={""} textStyle={{color: '#FFF'}} />
                

                <View style={{padding: 5, marginBottom: 5}}>
                    <Button title="Sign in" color={Color.whiteGrey2} 
                        onPress={this.login.bind(this)}>
                    </Button>
                </View>

                <View style={{alignItems: 'center'}}>
                    <Text onPress={this.forgotPassword.bind(this)}
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
        justifyContent: 'center',
    },
    formContainer: {
        flex: 6,
        padding: 10   
    },
    
});