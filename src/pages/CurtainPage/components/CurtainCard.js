import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ImageBackground,
 } from 'react-native';
import { Slider } from 'antd-mobile-rn'

 class CurtainCard extends React.Component {
     state = {  }

     slideChange = (params, e) => {
        this.props.clickHandle({...params, brightness: Math.floor(e)})
     }

     curtainRender() {
         if(!this.props.ways) return
         return this.props.ways.map((way, index) => (
            <View key={way.id}>
                <View style={styles.curtain_view}>
                    <View style={styles.curtain_left}>
                        <Image source={require('../assets/chuanglian.png')}></Image>
                        <Text style={styles.left_title}>{way.name}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.props.clickHandle({wayId: way.wayId, key: 'OPEN'})}>
                        <ImageBackground style={styles.btn_view} source={way.btn === 'OPEN' ? require('../assets/blue_y.png'):require('../assets/button.png')}>
                            <Text style={[styles.btn_title, { color: way.btn === 'OPEN' ? '#fff': '#333'}]}>打开</Text>   
                        </ImageBackground>
                    </TouchableOpacity> 
                    <TouchableOpacity activeOpacity={1} onPress={() => this.props.clickHandle({wayId: way.wayId, key: 'STOP'})}>
                        <ImageBackground style={styles.btn_view} source={way.btn === 'STOP' ? require('../assets/blue_y.png'):require('../assets/button.png')}>
                            <Text style={[styles.btn_title, { color: way.btn === 'STOP' ? '#fff': '#333'}]}>停止</Text>   
                        </ImageBackground> 
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.props.clickHandle({wayId: way.wayId, key: 'CLOSE'})}>
                        <ImageBackground style={styles.btn_view} source={way.btn === 'CLOSE' ? require('../assets/blue_y.png'):require('../assets/button.png')}>
                            <Text style={[styles.btn_title, { color: way.btn === 'CLOSE' ? '#fff': '#333'}]}>关闭</Text>   
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 50}}>
                    <Slider 
                        style={{marginTop: 50}}
                        min={0}
                        max={100}
                        maximumTrackTintColor='#fff'
                        minimumTrackTintColor='#7487f5'
                        defaultValue={50}
                        trackStyle={{height: 7,backgroundColor: '#7487f5', borderRadius: 3}}
                        onAfterChange={(e) => this.slideChange({wayId: way.wayId, key: 'OPEN'}, e)}
                    /> 
                </View>
            </View> 
         ))
     }
     render() {
         
         return (
             <View style={styles.container}>
                {this.curtainRender()} 
             </View>
         );
     }
 }

 const styles = StyleSheet.create({
     container: {
        marginTop: 120,
     },
     curtain_view: {
        // width: 470,
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
         borderRadius: 43,
         marginLeft: 15
     },
     btn_title: {
         fontSize: 22
     }
 })
 
 export default CurtainCard;