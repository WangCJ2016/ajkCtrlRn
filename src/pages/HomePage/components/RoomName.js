import React from 'react';
import { 
    View,
    Text,
    StyleSheet
 } from 'react-native';

 export default () => (
    <View>
        <Text style={styles.name}><Text style={styles.num}>501</Text>房间</Text>
        <Text style={styles.desc}>WELCOME!</Text>
    </View>
 )

 const styles = StyleSheet.create({
    name: {
        fontSize: 54,
        fontWeight: '200'
    },
    num: {
        fontWeight: 'bold' 
    },
    desc: {
        marginTop: 30,
        fontSize: 45,
        color: '#FFFFFF',
        fontWeight: '200'
    }
 })