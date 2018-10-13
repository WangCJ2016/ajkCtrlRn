import React from 'react';
import { 
    View,
    Text,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet
 } from 'react-native';
import { Toast } from 'antd-mobile-rn'

 class BindVerPage extends React.Component {
     state = { 
         value: ''
      }

     checkVerCode = () => {
         if(this.state.value === '') {
            Toast.info('验证密码不能为空')
            return
         }
        if(this.state.value === 'ajk05710586') {  // ajk05710586
            this.props.navigation.navigate('Bind')
        } else {
            //this.props.navigation.navigate('Bind')
            Toast.info('验证密码不正确')
        }
     } 

     render() {
         return (
            <ImageBackground style={styles.container} source={require('../SelectHotelPage/assets/bg_fw.png')} resizeMode='cover'>
                <Text style={styles.title}>智能生活体验</Text>
                <View style={styles.textinput}>
                    <TextInput 
                        style={{fontSize: 28}}
                        placeholder='请输入验证密码'
                        placeholderTextColor='#999'
                        onChangeText={(e)=>this.setState({value: e})}
                        ></TextInput> 
                </View>
                <TouchableOpacity onPress={this.checkVerCode}>
                    <Image source={require('./assets/jixu.png')}></Image>
                </TouchableOpacity>
            </ImageBackground>
         );
     }
 }
 
 const styles = StyleSheet.create({
     title: {
         fontSize: 43,
         color: '#fff'
     },
     textinput:{
         width: 600,
         height: 80,
         borderRadius: 40,
         backgroundColor: '#fff',
         marginTop: 77,
         marginBottom: 180,
         justifyContent: 'center',
         paddingLeft: 56
     },
     container: {
         flex:1,
         alignItems: 'center',
         justifyContent: 'center'
     }
 })
 export default BindVerPage;