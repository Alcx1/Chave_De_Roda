import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, Dimensions, Image, IconLabel, FlatList} from 'react-native'
import {Card, Icon} from 'react-native-elements'
import firebase from 'firebase'
import styled from 'styled-components/native'
import {ScrollView, TextInput} from 'react-native-gesture-handler'
import {Feather} from '@expo/vector-icons'
import New from './services';
import { useNavigation} from '@react-navigation/native'
import Comentarios from  './Comentarios'



export default class Dashboard extends Component {
  
  
  constructor() {
    super();
    this.state = { 
      uid: '',
      displayName:'',
    }
  }
  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  
  render() {
    this.setState = { 
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid
    }
    return (
      <ScrollView
        showVerticalScrollIndicator={false}
        style={{backgroundColor: '#2E2A2A',}}
        >
        <View style={styles.header}>
          <View style={styles.inputArea}>
          <Feather name='search' size={25} color='2E2A2A'/>
          <TextInput
          placeholder="O que você procura?"
          style={styles.input}
          />

        
        
        </View>
        </View>

        <View style={styles.contentServ}>
          <Text style={styles.servicos}>Serviços</Text>
        </View>      
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingHorizontal:15,}}>

          <New
            cover={require('../assets/alinhamento-app.jpeg')}
            name="ALINHAMENTO"
            description="ALINHAMENTO PARA SEU CARRO"
            onPress={() => this.props.navigation.navigate('Alinhamento')}
          />
          <New
            cover={require('../assets/Manutencao_ar.jpeg')}
            name="MANUTENÇÃO"
            description="MANUTENÇÃO PARA AR-CONDICIONADO"
            onPress={() =>{this.props.navigation.navigate('Manutencao')}}
          />
          <New
            cover={require('../assets/troca_oleo.jpg')}
            name="TROCA DE OLEO"
            description="TROCA DE OLEO"
            onPress={() =>{}}
          />
          <New
            cover={require('../assets/alinhamento-app.jpeg')}
            name="REVISAO"
            description="REVISAO"
            onPress={() => this.props.navigation.navigate('Revisao')}
          />
        

        </ScrollView>

        <View style={{flexDirection:'row',
         marginBottom:10,
         alignItems:'center'}}>

          <Text style={[styles.title,{marginTop:20, color:'#fff', fontSize:24,}]}>Comentários</Text>
        
        </View>

        <ScrollView vertical showVerticalScrollIndicator={false} style={{paddingHorizontal:15}}>
          <Comentarios
          cover={require('../assets/user.jpg')}/>
           <Comentarios
          cover={require('../assets/user.jpg')}/>
           <Comentarios
          cover={require('../assets/user.jpg')}/>
           <Comentarios
          cover={require('../assets/user.jpg')}/>
           <Comentarios
          cover={require('../assets/user.jpg')}/>
          
        </ScrollView>
        


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    paddingHorizontal:15,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    marginVertical:20,
  },
  inputArea:{
    paddingHorizontal:15,
    flexDirection:'row',
    alignItems:'center',
    width:'90%',
    backgroundColor:'#FF9A00',
    elevation:4,
    height:37,
    borderRadius:20
  },
  input:{
    fontFamily:'Montserrat_500Medium',
    paddingHorizontal:20,
    fontSize:18,
    width:'92%',
  },
  contentServ:{
    flexDirection:'row',
    width:'100%',
    alignItems:'center',
  },
  servicos:{
    paddingHorizontal:15,
    fontFamily:'Monteserrat_700Bold',
    fontSize:24,
    color:'#fff',
    alignItems:'center',
    width:'50%',
    justifyContent:'center',
    borderTopEndRadius:10,
  },
  title:{
    marginTop:20,
    paddingHorizontal:15,
    fontFamily:'Monteserrat_700Bold',
    fontSize:20,
    color:'#black',
    alignItems:'center',
    width:'50%',
    justifyContent:'center',
    borderTopEndRadius:10,
  },
  });