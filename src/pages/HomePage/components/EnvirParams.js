import React from 'react';
import { 
    View,
    Text,
    ImageBackground,
    StyleSheet
 } from 'react-native';

 export default () => (
     <View>
        <ImageBackground source={require('../assets/wendu.png')} style={styles.item_bg}>
            <Text style={styles.title}>24℃</Text>
        </ImageBackground>
        <ImageBackground source={require('../assets/shidu.png')} style={[styles.item_bg, styles.margin_top]}>
            <Text style={styles.title}>50%</Text>
        </ImageBackground>
        <ImageBackground source={require('../assets/pm25.png')} style={[styles.item_bg, styles.margin_top]}>
            <Text style={styles.title}>优</Text>
        </ImageBackground>
     </View>
 )

 const styles = StyleSheet.create({
     item_bg: {
         width: 155,
         height: 66,
         justifyContent: 'center'
     },
     margin_top: {
         marginTop: 10
     },
     title: {
         fontSize: 30,
         color: '#fb7346',
         marginLeft:70
     }
 })