import React from 'react';
import { 
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet
 } from 'react-native';

 export default () => {
    const arr = ['卧室','走廊','卫生间','其他']

    return (
        <View style={styles.light_tab}>
          {
              arr.map((type) => (
                  <TouchableWithoutFeedback key={type}>
                      <View style={styles.tab_item}> 
                          <Text style={styles.tab_title}>{type}</Text>
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
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10 
     },
     tab_title: {
         fontSize: 25,
         color: '#fb7346',
     }
 })