import React, { Component, useEffect, useState, useRef } from 'react';
import { View , Text, StyleSheet, FlatList, Button, TouchableOpacity, SafeAreaView, Image, Animated} from 'react-native';
import {ScrollView, TextInput, Input} from 'react-native-gesture-handler'
import { useNavigation} from '@react-navigation/native'
import MapView, {Marker} from 'react-native-maps'




export default class Alinhamento extends Component {
  
  
  constructor(props) {
    super(props);
    this.state = {
      region:{
        latitude:-3.7668161,
        longitude:-38.5774931,
        latitudeDelta:0.0922,
        longitudeDelta:0.0421
      },
      markers:[
        {key:0,coords:{latitude:-3.7668161,longitude:-38.5774931},pinColor:'#FF0000'},
        {key:1,coords:{latitude:-3.7668222,longitude:-38.57749444},pinColor:'#FF0000'},
        {key:2,coords:{latitude:-3.7668333,longitude:-38.5774931},pinColor:'#FF0000'}
      ]
      
    };
    this.newMarker= this.newMarker.bind(this)
    }
    newMarker(e){
      let state = this.state;
      state.markers.push({
        key:state.markers.length,
        coords:{
          latitude:e.nativeEvent.coordinate.latitude,
          longitude:e.nativeEvent.coordinate.longitude
        },
        pinColor:'green'
      })
      this.setState(state)
    }
  
  render() {
    const{region,markers} = this.state
    return (
      <View style={styles.container}>
    <Text>{region.latitude} | {region.longitude} </Text>

    <MapView
      onPress={this.newMarker}
      mapType='standart'
      showsTraffic={true}
      onMapReady={()=>{alert('Trajeto para nossa oficina')}}
      style={styles.mapa}
      region={region}
    >
    {markers.map((marker)=>{
      return(
        <Marker key={marker.key} coordinate={marker.coords}/>
      );
    })}
    
    </MapView>
  </View>
    );
  }
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#2E2A2A'
  },
  mapa:{
    width:'100%',
    height:550,
  }
})