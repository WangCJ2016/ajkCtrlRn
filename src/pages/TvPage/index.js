import React from 'react';
import { 
    View,
    Text,
    ImageBackground,
    StyleSheet,
    ScrollView
 } from 'react-native';
 import { Tabs } from 'antd-mobile-rn'

 import TvCard from './components/TvCard'

 class TvPage extends React.Component {
     state = {  }
     render() {
        const tabs = [
            { title: 'First Tab' },
            { title: 'Second Tab' },
            { title: 'Third Tab' },
          ];
         return (
             <ImageBackground style={styles.container} source={require('./assets/bg_ds.png')} >
                <View style={{flex: 1}}>
                    <Tabs tabs={tabs} initialPage={1}>
                        {
                            tabs.map(tab => (
                                <ScrollView key={tab} contentContainerStyle={styles.tab_wrap}>
                                    <TvCard ></TvCard>  
                                </ScrollView>
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
        alignItems: 'center',
    },
    tab_wrap: {
        paddingTop: 45,
        alignItems: 'center',
    }
 })
 
 export default TvPage;