import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image
 } from 'react-native';

 export default (props) => (
    <View style={styles.container}>
       <Image source={props.url}></Image>
       <Text style={[styles.desc, {color: props.color}]}>{props.desc}</Text>
    </View>
 )    

 const styles = StyleSheet.create({
     container: {
         width: '100%',
         height: '100%',
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: '#FFFFFF'
     },
     desc: {
         color: '#5f71f1',
         fontSize: 26,
         marginTop: 60
     }
 })