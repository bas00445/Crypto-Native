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
            targetResetEmail: '',
            email: '',
            pass: '',
            newEmail: '',
            newPass: '',
            newPassConfirm: '',
            reg_code: '',
            signupVisible: false,
            forgotVisible: false,
            correctCode: false,
            loading: false,
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

    async validateUser() {
        try {
        let data = {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              reg_code: this.state.reg_code
            })
          }
         var response = await fetch('http://pk-cryptobot.herokuapp.com/api/verify_code', data);
         var responseJson = await response.json();
         if (responseJson == 'Invalid reg_code') {
             alert('Invalid Registeration Code');
         } else {
             this.signUp();
         }
        } catch(err) {
            console.error(err);
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

    async sendUserUID(uid) {
        let data = {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              uid: uid,
            })
          }
         var response = await fetch('http://pk-cryptobot.herokuapp.com/api/register', data);
         var responseJson = await response.json();
         if (responseJson == 'OK') {
            this.openSignupModal(false);
         } else if (responseJson == 'not found') {
             // do something
         }
    }

    openForgotModal(visible) {
        if (visible == true) {
            this.setState({forgotVisible: true});
        } else {
            this.setState({forgotVisible: false});            
        }
    }

    openSignupModal(visible) {
        if (visible == true) {
            this.setState({signupVisible: true});
        } else {
            this.setState({signupVisible: false});            
        }
    }

    forgotPassword() {
        this.openForgotModal(true);
    }

    getFCMToken() {
        FCM.getFCMToken().then(token => {
            alert('Token' + token.toString());
            // store fcm token in your server
        });
    }

  login() {
    try {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass);
    } catch (error) {
        alert(error.toString());
    }

    }

    confirmResetPassword() {
        firebase.auth().sendPasswordResetEmail(this.state.targetResetEmail).then(
            () => {
                alert('Please check the new password in your email address');
                this.openForgotModal(false);
            }
        ).catch(
            (err) => {
                alert(err);
            }
        )
       
    }
    renderForgotPasswordModal() {
        return(
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.forgotVisible}
                onRequestClose={() => {this.openForgotModal(this, false)}}>
                <View style={{flex: 1, padding: 20, backgroundColor: Color.grey}}>
                    <View style={{paddingBottom: 10}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: Color.pureWhite}}>
                        Reset Password</Text>
                    </View>

                    <TextInput onChangeText={(text) => {this.setState({targetResetEmail:text})}} 
                    placeholder={"Email"} selectionColor={Color.pureWhite}
                    underlineColorAndroid={Color.white}
                    placeholderTextColor={'#8c8c8c'}
                    style={{color: Color.pureWhite}}>
                    </TextInput>
                            
                    <View style={[Style.colContent, {marginTop: 10}]}>
                    <View style={{flex: 1, padding: 5}}>
                        <Button
                            onPress={this.confirmResetPassword.bind(this)}
                            title="ok"
                            color={Color.whiteGrey2}/>
                    </View>
                    <View style={{flex: 1, padding: 5}}>
                        <Button
                            onPress={this.openForgotModal.bind(this, false)}
                            title="cancel"
                            color={Color.whiteGrey2}/>
                    </View>
                    </View>
                </View>

            </Modal>
        );
    }

    renderModal() {
        return(
            <Modal 
            animationType="slide"
            transparent={false}
            visible={this.state.signupVisible}
            onRequestClose={() => {this.openSignupModal(this, false)}}>
            <View style={{padding: 20, flex: 1, backgroundColor: Color.grey}}>
                <View style={{marginBottom: 4}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: Color.pureWhite}}>
                        Create a new account</Text>
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
                    <TextInput onChangeText={(text) => {this.setState({reg_code:text})}} 
                        placeholder={"Registeration Code"}
                        selectionColor={Color.pureWhite}
                        underlineColorAndroid={Color.white}
                        placeholderTextColor={'#8c8c8c'}
                        style={{color: Color.pureWhite}}></TextInput>
                </View>

                <View style={Style.colContent}>
                    <View style={{flex: 6, padding: 5}}>
                        <Button
                            onPress={this.validateUser.bind(this)}
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
        );
    }

  render() {
    return (
      <View style={localStyles.container}>
        {this.renderModal()}
        {this.renderForgotPasswordModal()}
        <View style={localStyles.imageContainer}>
            <Image style={{flex: 1, alignSelf: 'center', width: 150, height: 150, resizeMode: 'contain'}} 
            source={require('../assets/images/pk-black.png')}/>
        </View>
        <View style={localStyles.formContainer}>
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

                <Spinner visible={this.state.loading} textContent={""} color={Color.pink}>
                </Spinner>
                

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