import React from 'react';
import { 
    View,
    Text,
    ImageBackground,
    StyleSheet
 } from 'react-native'
 import { Tabs } from 'antd-mobile-rn'

 import AirCard from './components/AirCard'

 class AirPage extends React.Component {
     state = {  }
     render() {
        const tabs = [
            { title: 'First Tab' },
            { title: 'Second Tab' },
            { title: 'Third Tab' },
          ];
        const style = {
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
           
          } 
         return (
             <ImageBackground style={styles.container} source={require('./assets/bg_kt.png')} resizeMode='cover'>
                <View style={{flex: 1}}>
                    <Tabs tabs={tabs} initialPage={1}>
                        {
                            tabs.map(tab => (
                                <View key={tab} style={styles.tab_wrap}>
                                    <AirCard title={tab.title}></AirCard>  
                                </View>
                            ))
                        }
                    </Tabs>
                </View>
             </ImageBackground>
         );
     }
 }

 const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    tab_wrap: {
        flex: 1,
        alignItems: 'center'
    }
 })
 
 export default AirPage;