import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import firebase from 'firebase';
import * as Animatable from 'react-native-animatable';
import firebaseConfig from '../database/Firebase';
import 'firebase/auth';




export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      isLoading: false,
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  registerUser = () => {
    if (this.state.email === '' && this.state.password === '') {
      alert('Insira seus dados para acessar o app!');
    } else {
      this.setState({
        isLoading: false,
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
            alert('Obrigado por se registrar: ' + res.user.email)
          res.user.updateProfile({
            displayName: this.state.displayName,
          });  
        console.log(res)
        this.setState({
          isLoading: true,
          displayName: '',
          email: '', 
          password: ''
          });
          this.props.navigation.navigate('Login');
        });
    }
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Animatable.Image
            animation="flipInX"
            source={require('../assets/Logo.png')}
            style={{ width: 200, overflow: 'hidden', borderRadius: 120 / 4 }}
            resizeMode={'contain'}
          />
        </View>
        
        <Text style={styles.titulo}> Nome </Text>
        
        <TextInput
          style={styles.inputStyle}
          placeholder="Insira seu nome..."
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
        />
        <Text style={styles.titulo}> Email </Text>
        
        <TextInput
          style={styles.inputStyle}
          placeholder="Seu email..."
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <Text style={styles.titulo}> Senha </Text>
        
        <TextInput
          style={styles.inputStyle}
          placeholder="Sua senha..."
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />

        <Button
          color="#2E2a2a"
          title="Registrar"
          onPress={() => this.registerUser()}
        />

        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Já tem uma conta? Clique aqui.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF9A00',
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  containerLogo: {
    flex: 1,
    backgroundColor: '#2E2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 80,
    marginTop: 30,
  },
  inputStyle: {
    borderBottomWidth: 1,
    height: 30,
    marginBottom: 8,
    fontSize: 13,
    color: '#4F4F4F',
  },
  loginText: {
    color: '#2E2A2A',
    marginTop: 30,
    alignSelf: 'center',
    margin: 50,
    fontSize: 13,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: 'bold',
  },
});
