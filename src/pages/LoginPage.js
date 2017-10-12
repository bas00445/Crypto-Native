import React, { Component } from 'react';
import Theme from '../styles/GlobalStyles';
import * as firebase from 'firebase';
import firebaseConfig from '../services/FirebaseConfig';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Modal
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
            modalVisible: false
        }
    }
    
    setModalVisible(isVisible) {
        if (isVisible == true) {
            this.setState({modalVisible: true});
        } else {
            this.setState({modalVisible: false});            
        }
    }

  async signUp() {
    try {
        await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass);
        // If success
        this.setModalVisible(false);
        this.alert('Sign in successfully');
        this.props.navigation.navigate('Main');
    } catch (error) {
        alert('Error: ' + error.toString());
    }
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
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {this.setModalVisible(this, false)}}>
                <View style={{padding: 10, flex: 1}}>
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
                                onPress={this.setModalVisible.bind(this, false)}
                                title="Cancel"
                                color={Color.red}/>
                        </View>
                    </View>
                    
                </View>
            </Modal>

            <View style={Style.colContent}>
                <View style={{flex: 3, justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text>Email:</Text>
                </View>
                <View style={{flex: 7}}>
                    <TextInput onChangeText={(text) => {this.setState({email:text})}}></TextInput>
                </View>
            </View>

            <View style={Style.colContent}>
                <View style={{flex: 3, justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text>Password:</Text>
                </View>
                <View style={{flex: 7}}>
                    <TextInput secureTextEntry={true} onChangeText={(text) => {this.setState({pass: text})}}></TextInput>
                </View>
            </View>

            <View style={Style.colContent}>
                <View style={{flex: 1, padding: 5}}>
                    <Button
                        onPress={this.setModalVisible.bind(this, true)}
                        title="Sign up"
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