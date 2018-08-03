import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    ImageBackground
 } from 'react-native';

 class CurtainCard extends React.Component {
     state = {  }
     render() {
         return (
             <View style={styles.container}>
                <View style={styles.curtain_view}>
                    <View style={styles.curtain_left}>
                        <Image source={require('../assets/chuanglian.png')}></Image>
                        <Text style={styles.left_title}>窗帘</Text>
                    </View>
                    <TouchableWithoutFeedback>
                        <ImageBackground style={styles.btn_view} source={require('../assets/button.png')}>
                            <Text style={styles.btn_title}>打开</Text>   
                        </ImageBackground>
                    </TouchableWithoutFeedback> 
                    <TouchableWithoutFeedback>
                        <ImageBackground style={styles.btn_view} source={require('../assets/button.png')}>
                            <Text style={styles.btn_title}>停止</Text>   
                        </ImageBackground> 
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <ImageBackground style={styles.btn_view} source={require('../assets/button.png')}>
                            <Text style={styles.btn_title}>停止</Text>   
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                </View>
             </View>
         );
     }
 }

 const styles = StyleSheet.create({
     container: {
        marginTop: 120,
     },
     curtain_view: {
         width: 470,
         flexDirection: 'row',
         alignItems: 'center'
     },
     curtain_left: {
         width: 120,
         height: 120,
         borderRadius: 10,
         backgroundColor: 'rgba(255,255,255,.2)',
         alignItems: 'center',
         justifyContent: 'center',
         marginRight: 20,
     },
     left_title: {
         fontSize: 20,
         color: '#333',
         marginTop: 10
     },
     btn_view: {
         justifyContent: 'center',
         alignItems: 'center',
         width: 86,
         height: 86,
         borderRadius: 42,
         marginRight: 15
     },
     btn_title: {
         fontSize: 22
     }
 })
 
 export default CurtainCard;