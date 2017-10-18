import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import * as firebase from 'firebase';
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
  ActivityIndicator
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
            loading: false,
        }
    }
    
    componentDidMount() {
        const { navigation } = this.props;
        
        firebase.auth().onAuthStateChanged(function(user) {
            if (user != null) {
                setUID(user.uid);
                FCM.requestPermissions().then(
                    ()=> {}, 
                    (err)=> alert('Notification reject'
                ));
                navigation.navigate('Main');
            } else {
                setUID('');
        }});
    }

    openSignupModal(isVisible) {
        if (isVisible == true) {
            this.setState({signupVisible: true});
        } else {
            this.setState({signupVisible: false});            
        }
    }

  async signUp() {
      if (this.state.newPass == this.state.newPassConfirm) {
        try {
            await firebase.auth().createUserWithEmailAndPassword(this.state.newEmail, this.state.newPass);
            this.openSignupModal(false);
            alert('New account is created.');
        } catch (error) {
            alert(error.toString());
        }
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
            
            <View style={Style.cardContainer}>
                <View style={{marginBottom: 4}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Log in to the system</Text>
                </View>

                <View style={{marginBottom:4}}>
                    <TextInput onChangeText={(text) => {this.setState({email:text})}}
                        placeholder="Enter your email address"></TextInput>
                </View>

                <View style={{marginBottom:4}}>
                    <TextInput secureTextEntry={true} onChangeText={(text) => {this.setState({pass: text})}}
                        placeholder="Enter your password"></TextInput>
                </View>
                
                <View style={Style.colContent}>
                    <View style={{flex: 7, padding: 5}}>
                        <Button title="Sign in" color={Color.blue} 
                            onPress={this.login.bind(this)}>
                        </Button>
                    </View>

                    <View style={{flex: 3, padding: 5}}>
                        <Button title="Sign up" color={Color.red} 
                            onPress={this.openSignupModal.bind(this, true)}>
                        </Button>
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
        backgroundColor: '#333333'        
    },
    imageContainer: {
        flex: 4,
        backgroundColor: '#25292f',
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
        flex: 6,
        backgroundColor: Color.white,
        padding: 10   
    },
    
});