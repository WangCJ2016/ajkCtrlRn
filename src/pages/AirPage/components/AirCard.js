import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    TouchableOpacity
 } from 'react-native';

 const MODELIMGURL = {
     'hot': require('../assets/hot.png'),
     'cold': require('../assets/cold.png')
 }

 class AirCard extends React.Component {
     state = { 
        speed:3,
        switchKey:'OFF',
        temIndex:-1,
        currentTemArray:[],
        model:'cold'
     }

     componentDidMount(){
        this.setState({
          currentTemArray:this.props.air.coolWays
        })
      }

     switchClick = (deviceId) => {
        const key = this.state.switchKey === 'ON'?'OFF':'ON'
        if (key === 'ON') {
            const {coolWays} = this.props.air
            const temIndex =  Math.round(coolWays.length/2)
            this.props.switchClick({key: coolWays[temIndex],deviceId: deviceId})
            this.setState({
              switchKey:key,
              temIndex:temIndex
            })
        }else {
           this.props.switchClick({deviceId: deviceId, key: key})
           this.setState({
             switchKey:key,
             temIndex:0
           })
        }
     }

     speedChange = () => {
        if (this.props.deviceType === 'VIRTUAL_AIR_REMOTE') return
        this.setState({
          speed:(this.state.speed+1)%4
        },function(){
           this.props.temChangeHandle({key: this.state.currentTemArray[this.state.temIndex],deviceId: deviceId,model: this.state.model,speed: this.state.speed})
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

     modelChange = (deviceId) => {
        if(this.state.switchKey==='OFF') return
        const currentModel = this.state.model==='cold'?'制热':'制冷'
        const currentTemArray = currentModel==='制冷'?this.props.air.coolWays:this.props.air.warmWays
        const centerIndex = currentTemArray.indexOf(25) > -1 ? currentTemArray.indexOf(25) : 0
        if(this.props.deviceType === 'VIRTUAL_AIR_REMOTE'){
           this.setState({
             model:this.state.model==='cold'?'hot':'cold',
             temIndex:0,
             currentTemArray:currentTemArray
          },function(){ 
            this.props.temChangeHandle({key: this.state.currentTemArray[this.state.temIndex],deviceId: deviceId})
          })
        }
        if(this.props.deviceType === 'VIRTUAL_CENTRAL_AIR_REMOTE'){
          this.setState({
            model:this.state.model==='cold'?'hot':'cold',
            temIndex: centerIndex,
            currentTemArray:currentModel==='制冷'?this.props.air.coolWays:this.props.air.warmWays
          },function(){
            this.props.temChangeHandle({key: this.state.currentTemArray[this.state.temIndex],deviceId: deviceId,model: this.state.model,speed: this.state.speed})
          })
        }
        
     }

    temChange(type,deviceId){
        if (this.props.deviceType === 'VIRTUAL_AIR_REMOTE'){
            const index = type === 'plus'?(this.state.temIndex+1 >=this.state.currentTemArray.length?this.state.temIndex:this.state.temIndex+1):
                                          (this.state.temIndex-1 >= 0?this.state.temIndex-1:0)
            this.setState({
              temIndex:index,
              switchKey:'ON'
            },function(){
              this.props.temChangeHandle({key: this.state.currentTemArray[this.state.temIndex],deviceId: deviceId})
            })
          
        }
    
        if(this.props.deviceType === 'VIRTUAL_CENTRAL_AIR_REMOTE'){
            const index = type === 'plus'?(this.state.temIndex+1 >=this.state.currentTemArray.length?this.state.temIndex:this.state.temIndex+1):
                                       (this.state.temIndex-1 > 0?this.state.temIndex-1: 0)
            this.setState({
              temIndex:index,
              switchKey:'ON'
            },function(){
               this.props.temChangeHandle({key: this.state.currentTemArray[this.state.temIndex],deviceId: deviceId,model: this.state.model,speed: this.state.speed})
            })
        }
    }
     
     render() {
        const { switchKey, speed, currentTemArray, temIndex } = this.state
        const { air, deviceType } = this.props
        return (
            <View style={styles.air_card}>
               <View style={[styles.row_center, {marginTop: 45}]}>
                   <TouchableOpacity style={styles.tem_btn} onPress={()=>this.temChange('minus', air.deviceId)}>
                       <Image source={switchKey==='OFF'?require('../assets/c-1.png'):require('../assets/c-.png')}></Image>
                       <Text style={styles.tem_desc}>温度-</Text>
                   </TouchableOpacity>
                   <ImageBackground style={styles.tem_round} source={switchKey==='OFF'?require('../assets/round.png'):require('../assets/round_active.png')}>
                       
                           <View style={styles.tem_text_view}>
                               <Text style={{fontSize: 70, color: '#fff'}}>{switchKey==='ON'? (deviceType === 'VIRTUAL_CENTRAL_AIR_REMOTE' ? currentTemArray[temIndex]:currentTemArray[temIndex].slice(-2)):25}</Text>
                               <Text style={{fontSize: 23, color: '#fff', marginTop: 5}}>℃</Text>
                           </View>
                           <Text style={{fontSize: 19, color: '#fff', marginTop: 25}}>预设的温度</Text>
                       
                   </ImageBackground>
                   <TouchableOpacity style={styles.tem_btn} onPress={()=>this.temChange('plus', air.deviceId)}>
                       <Image source={switchKey==='OFF'? require('../assets/c+1.png'): require('../assets/c+.png')}></Image>
                       <Text style={styles.tem_desc}>温度+</Text>
                   </TouchableOpacity>
               </View>
               <View style={styles.line}></View>
               <View style={[styles.row_center, {marginLeft: 7, marginRight: 7}]}>
                   <TouchableOpacity style={styles.action_btn} onPress={() => this.switchClick(air.deviceId, this.state.switchKey === 'OFF' ? 'ON' : 'OFF')}>
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
                   <TouchableOpacity style={styles.action_btn} onPress={() => this.modelChange(air.deviceId)}>
                       <View style={styles.white_bg}>
                           <Image source={switchKey==='OFF'?require('../assets/hot1.png'): MODELIMGURL[this.state.model]}></Image>
                       </View>
                       <Text style={[styles.btn_desc,{color: switchKey==='OFF'?"#666":'#6095f0'}]}>模式</Text> 
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