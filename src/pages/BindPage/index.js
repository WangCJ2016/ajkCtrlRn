import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableHighlight,
    Image,
    TouchableOpacity
 } from 'react-native';
import { List, Toast } from 'antd-mobile-rn'
import { connect } from 'react-redux'



@connect(
    state => ({
        app: state.app,
        hotelList: state.hotelList
    })
)
 class BindPage extends React.Component {

     submitHandle = () => {
        const { BindHotel, BindRoom } = this.props.hotelList 

        if(!BindHotel) {
            Toast.info('请先选择酒店')
            return
        }

        if(!BindRoom) {
            Toast.info('请先选择房间')
            return
        }
     }

     selectRoomRouter = () => {
        const { BindHotel } = this.props.hotelList 
         if(!BindHotel) {
            Toast.info('请先选择酒店')
            return 
         }
         this.props.navigation.navigate('SelectRoom')
     }

     render() {
         const { BindHotel, BindRoom } = this.props.hotelList
         const { navigate, goBack } = this.props.navigation
         console.log(BindHotel, BindRoom)
         return (
             <ImageBackground style={{flex:1}} source={require('../SelectHotelPage/assets/bg_fw.png')} resizeMode='cover'>
                <View style={styles.form_container}>
                    <TouchableHighlight onPress={()=>navigate('SelectHotel')}>
                        <View style={styles.item_view}>
                            <Image source={require('./assets/hotel.png')}></Image>
                            <Text style={styles.item_text}>{BindHotel?BindHotel.name:'请选择酒店'}</Text>  
                            <Text></Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='transparent' onPress={this.selectRoomRouter}>
                        <View style={[styles.item_view, {marginTop: 30}]}>
                            <Image source={require('./assets/fj.png')}></Image>
                            <Text style={styles.item_text}>{BindRoom?BindRoom.name:'请选择房间'}</Text>  
                            <Text></Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.btn_wrap}>
                        <TouchableOpacity onPress={()=> goBack()}>
                            <View style={styles.btn}>
                                <Text style={styles.btn_text}>取消</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.submitHandle}>
                            <View style={styles.btn}>
                                <Text style={styles.btn_text}>确定</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> 
             </ImageBackground>
         );
     }
 }


 const styles = StyleSheet.create({
     form_container: {
         width: 600,
         alignSelf: 'center',
         marginTop: 178,
     },
     item_view: {
         backgroundColor: '#FFFFFF',
         borderRadius: 15,
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         paddingLeft: 50,
         paddingRight: 50,
         height: 100,
     },
     item_text: {
         color: '#373737',
         fontSize: 28
     },
     btn_wrap: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         marginTop: 232
     },
     btn: {
         width: 200,
         height: 60,
         borderRadius: 30,
         backgroundColor: '#F96C40',
         alignItems: 'center',
         justifyContent: 'center'
     },
     btn_text: {
         color: '#fff',
         fontSize: 30
     }
 })
 
 export default BindPage