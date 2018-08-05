import React from 'react';
import { 
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
 } from 'react-native';

 export default (props) => {
    const arr = ['卧室','走廊','卫生间','其他']

    const changeTypeHandle = (type) => {
        props.changeType({lightType: type})
    }
    return (
        <View style={styles.light_tab}>
          {
              arr.map((type) => (
                  <TouchableWithoutFeedback key={type} onPress={() => changeTypeHandle(type)}>
                      <View style={[styles.tab_item, props.type === type ? styles.tab_item_active : '']}> 
                          <Text style={[styles.tab_title, props.type === type ? styles.tab_title_active: '']}>{type}</Text>
                      </View>
                  </TouchableWithoutFeedback>
              ))
          }
        </View>
    )
 }

 const styles = StyleSheet.create({
     light_tab: {
         marginTop: 175,
         flexDirection: 'row'
     },
     tab_item: {
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10 
     },
     tab_item_active: {
        backgroundColor: '#FFFFFF', 
     },
     tab_title: {
         fontSize: 25,
         color: '#fff',
     },
     tab_title_active: {
        color: '#fb7346', 
     }
 })