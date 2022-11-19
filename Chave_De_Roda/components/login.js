import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import {firebaseConfig} from 'firebase'
import * as Animatable from 'react-native-animatable';

export default class Login extends Component {

  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: false
    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = () => {
    if(this.state.email === '' && this.state.password === '') {
      alert('Informe seu login, por gentileza.')
      this.setState({
        isLoading: false,
      })
    } else {
      this.setState({
        isLoading: true,
      })
      firebase.auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
        this.setState({
          isLoading: true,
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Dashboard')
      })
      .catch(error => this.setState({ errorMessage: error.message }))
    }
  }

render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#FF9A00"/>
        </View>
      )
    }    
    return (
      <View style={styles.container}>  
         <View style={styles.containerLogo}>
          <Animatable.Image
            animation="flipInY"
            source={require('../assets/Logo.png')}
            style={{ width: 200, overflow: 'hidden', borderRadius: 120 / 4 }}
            resizeMode={'contain'}
          />
        </View>
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />   
        <Button
          color="#FF9A00"
          title="Logar"
          onPress={() => this.userLogin()}
        />   
        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Cadastro')}>
          Nao tem conta? Clique aqui para se realizar o cadastro.
        </Text>                          
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#2E2a2a'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#FF9A00",
    color:"#FF9A00",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#FF9A00',
    marginTop: 15,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E2A2A'
  },
  containerLogo: {
    flex: 1,
    backgroundColor: '#2E2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 80,
    marginTop: 5
    }
});