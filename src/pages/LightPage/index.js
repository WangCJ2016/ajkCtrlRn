import React from 'react';
import { 
    View,
    Text,
    ImageBackground,
    StyleSheet
 } from 'react-native';
 import LightTab from './components/LightTab'
 import LightCard from './components/LightCard'


 class LightsPage extends React.Component {
     state = {  }
     render() {
         return (
             <ImageBackground resizeMode='cover' style={styles.container} source={require('./assets/bg_d.png')}>
                 <LightTab></LightTab>
                 <LightCard></LightCard>
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
     }
 })
 export default LightsPage;

