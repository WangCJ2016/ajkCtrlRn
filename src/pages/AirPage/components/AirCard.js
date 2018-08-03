import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    TouchableOpacity
 } from 'react-native';

 class AirCard extends React.Component {
     state = { 
        speed:3,
        switchKey:'OFF',
        temIndex:-1,
        currentTemArray:[],
        model:'cold'
     }

     switchClick = () => {
        const key = this.state.switchKey === 'ON'?'OFF':'ON'
        if (key === 'ON') {
         // this.props.actions.airswitch('OFF',deviceId)
          this.setState({
            switchKey:key,
            temIndex:0
          })
        }else{
        //   const {coolWays} = this.props.air
        //   const temIndex =  Math.round(coolWays.length/2)
        //   this.props.actions.airswitch(coolWays[temIndex],deviceId)
          this.setState({
            switchKey:key,
            //temIndex:temIndex
          })
        }
     }

     speedChange = () => {
       // if (this.props.deviceType === 'VIRTUAL_AIR_REMOTE') return
        this.setState({
          speed:(this.state.speed+1)%4
        },function(){
         // this.props.actions.centerchangeTem(this.state.currentTemArray[this.state.temIndex],deviceId,this.state.model,this.state.speed)
        })
     }

     speedImgUrl(num) {
         const speeds = {
             0: require('../assets/speed0.png'),
             1: require('../assets/speed1.png'),
             2: require('../assets/speed2.png'),
             3: require('../assets/speed3.png'), 
         }
         return speeds[num]
     }
     render() {
        const { switchKey, speed } = this.state
        return (
            <View style={styles.air_card}>
               <View style={[styles.row_center, {marginTop: 45}]}>
                   <TouchableOpacity style={styles.tem_btn}>
                       <Image source={switchKey==='OFF'?require('../assets/c-1.png'):require('../assets/c-.png')}></Image>
                       <Text style={styles.tem_desc}>温度-</Text>
                   </TouchableOpacity>
                   <ImageBackground style={styles.tem_round} source={require('../assets/round_active.png')}>
                       
                           <View style={styles.tem_text_view}>
                               <Text style={{fontSize: 70, color: '#fff'}}>{switchKey==='OFF'?'': 26}</Text>
                               <Text style={{fontSize: 23, color: '#fff', marginTop: 5}}>℃</Text>
                           </View>
                           <Text style={{fontSize: 19, color: '#fff', marginTop: 25}}>预设的温度</Text>
                       
                   </ImageBackground>
                   <TouchableOpacity style={styles.tem_btn}>
                       <Image source={switchKey==='OFF'? require('../assets/c+1.png'): require('../assets/c+.png')}></Image>
                       <Text style={styles.tem_desc}>温度+</Text>
                   </TouchableOpacity>
               </View>
               <View style={styles.line}></View>
               <View style={[styles.row_center, {marginLeft: 7, marginRight: 7}]}>
                   <TouchableOpacity style={styles.action_btn} onPress={this.switchClick}>
                       <View style={styles.white_bg}>
                           <Image source={switchKey==='OFF'?require('../assets/off1.png'):require('../assets/off.png')}></Image>
                       </View>
                       <Text style={[styles.btn_desc, {color: switchKey==='OFF'?"#666":'#6095f0'}]}>开关</Text> 
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.action_btn} onPress={this.speedChange}>
                       <View style={styles.white_bg}>
                           <Image source={switchKey==='OFF'?require('../assets/speed0.png'):this.speedImgUrl(speed)}></Image>
                       </View>
                       <Text style={[styles.btn_desc,{color: switchKey==='OFF'?"#666":'#6095f0'}]}>风速</Text> 
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.action_btn}>
                       <View style={styles.white_bg}>
                           <Image source={switchKey==='OFF'?require('../assets/hot1.png'):require('../assets/hot.png')}></Image>
                       </View>
                       <Text style={[styles.btn_desc,{color: switchKey==='OFF'?"#666":'#6095f0'}]}>开关</Text> 
                   </TouchableOpacity>
               </View>
            </View>
        )
     }
 }
 
 export default AirCard;

 const styles = StyleSheet.create({
     air_card: {
         marginTop: 90,
         width: 450,
         borderRadius: 16,
         backgroundColor: "#f4f4f4",
         padding: 25,
     },
     row_center: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center'
     },
     tem_btn: {
        alignItems: 'center'
     },
     tem_desc: {
         fontSize: 19,
         color: '#666',
         marginTop: 10
     },
     tem_text_view: {
        flexDirection: 'row',
        marginLeft: 12
      //  alignItems: 'flex-start'
     },
     tem_round: {
         width: 210,
         height: 210,
         borderRadius: 105,
         alignItems: 'center',
         justifyContent: 'center'
     },
     line: {
         height: 1,
         width: '100%',
         backgroundColor: '#d8d8d8',
         marginTop: 70,
         marginBottom: 60
     },
     action_btn: {
         alignItems: 'center'
     },
     white_bg: {
         width: 88,
         height: 88,
         borderRadius: 44,
         backgroundColor: '#fff',
         justifyContent: 'center',
         alignItems: 'center'
     },
     btn_desc: {
         fontSize: 23,
         color: '#333',
         marginTop: 10
     }
 })