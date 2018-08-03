import React from 'react';
import { 
    View,
    Text,
    ImageBackground,
    StyleSheet,
    ScrollView
 } from 'react-native';
 import { Tabs } from 'antd-mobile-rn'

 import CurtainCard from './components/CurtainCard'

 class CurtainPage extends React.Component {
     state = {  }
     render() {
        const tabs = [
            { title: 'First Tab' },
            { title: 'Second Tab' },
            { title: 'Third Tab' },
         ];
         return (
             <ImageBackground style={styles.container} resizeMode='cover' source={require('./assets/bg_chuang.png')}>
                <Tabs tabs={tabs} initialPage={1}>
                    {
                        tabs.map(tab => (
                            <ScrollView key={tab} contentContainerStyle={styles.tab_wrap}>
                                <CurtainCard ></CurtainCard>  
                            </ScrollView>
                        ))
                    }
                </Tabs>
             </ImageBackground>
         );
     }
 }

 const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tab_wrap: {
        alignItems: 'center',
        flex:1
    }
 })
 
 export default CurtainPage;