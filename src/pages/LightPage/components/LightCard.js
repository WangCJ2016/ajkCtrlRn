import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Image
 } from 'react-native';

 export default () => {
     return (
         <View style={styles.light_card}>
            <TouchableWithoutFeedback>
                <View style={styles.light_item}>
                    <Image source={require('../assets/tonyon_off.png')}></Image>
                    <Text style={styles.title}>背景灯</Text>
                </View>
            </TouchableWithoutFeedback>
         </View>
     )
 }

 const styles = StyleSheet.create({
     light_card: {
         marginTop: 85,
         width: 420,
         paddingLeft: 15,
         paddingRight: 15,
         paddingTop: 18,
         paddingBottom: 18,
         backgroundColor: '#fafafa',
         borderRadius: 10
     },
     light_item: {
         width: 130,
         height: 160,
         alignItems: 'center',
         justifyContent: 'center'
     },
     title: {
         fontSize: 24,
         color: '#333',
         marginTop: 30
     }
 })