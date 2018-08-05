import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
 } from 'react-native';
 import { Switch } from 'antd-mobile-rn'

 import { lightsUrl } from '../../../utils'

 export default (props) => {
     return (
            <View style={styles.light_card}>
            {
                props.lights.length>0? 
                props.lights.map(light => {
                    const name = light.name.replace(props.type, '')
                    return  <TouchableWithoutFeedback key={light.id} onPress={() => props.lightClick(light.status, light.wayId)}>
                        <View style={styles.light_item}>
                            <Image source={lightsUrl(name, light.status)}></Image>
                            <Text style={[styles.title, light.status === 'ON' ? styles.title_active: '']}>{name}</Text>
                        </View>
                    </TouchableWithoutFeedback> 
                })
                : 
                <View style={styles.blank_view}>
                    <Image source={require('../assets/wuleixing.png')}></Image>
                    <Text style={styles.blank_title}>无此类型的灯</Text>
                </View>  
            }
            {
                props.type === '卫生间' ? 
                <View style={styles.switch_view}>
                    <Text style={{fontSize: 26, color: '#000'}}>全开</Text>
                    <Switch checked={props.switchStatus} onChange={props.switchChange}></Switch>
                    <Text style={{fontSize: 26, color: '#000'}}>全关</Text>
                </View>
                :null
            }
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
         borderRadius: 10,
         flexDirection: 'row',
         flexWrap: 'wrap',
     },
     light_item: {
         width: 130,
         height: 160,
         alignItems: 'center',
         justifyContent: 'center'
     },
     title: {
         fontSize: 24,
         marginTop: 30,
         color: '#333'
     },
     title_active: {
         color: '#fb7346',
     },
     blank_view: {
        width: '100%',
        paddingTop: 90,
        paddingBottom: 90,
        alignItems: 'center',
        justifyContent: 'center'
     },
     blank_title: {
         fontSize: 25,
         color: '#fb7346',
         marginTop: 50,
         textAlign: 'center'
     },
     switch_view: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         marginTop: 50,
         width: '100%',
         paddingLeft: 50,
         paddingRight: 50
     }
 })