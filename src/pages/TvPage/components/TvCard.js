import React from 'react';
import { 
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity
 } from 'react-native';

 const SWITCHIMGURL = {
     'OFF': require('../assets/switch_off.png'),
     'ON': require('../assets/switch_on.png')
 }

 class TvCard extends React.Component {
     state = {  
        tv:'OFF',
        tvBox:'OFF'
     }

     numBtnRender (box_deviceId) {
         const nums = [1,2,3,4,5,6,7,8,9,0]
         return nums.map(num => (
             <TouchableHighlight key={num} underlayColor='#ccc' style={styles.num_view} onPress={()=>this.clickHandle(num, box_deviceId)}>
                 <Text style={styles.num}>{num}</Text>
             </TouchableHighlight>
         ))
     }

     switchClick = (key, deviceId) => {
        this.setState({
            [key]: this.state[key] === 'ON' ? 'OFF' : 'ON'
        }, () => {
            this.props.clickHandle({key: this.state[key], deviceId: deviceId}) 
        })
     }

     clickHandle = (key, deviceId) => {
        this.props.clickHandle({key: key, deviceId: deviceId})  
     }

     render() {
         let tv_deviceId,box_deviceId
         for(let i in this.props.tv){
            if (i.indexOf('电视机')>-1) {
              tv_deviceId = this.props.tv[i]
            }
            if (i.indexOf('机顶盒')>-1) {
                box_deviceId = this.props.tv[i]
              }
          }
         return (
             <View style={styles.tv_card}>
                 <View style={styles.tv_view}>
                    <View style={[styles.row_between, {paddingLeft: 38, paddingRight:60}]}>
                        <Text style={styles.tv_title}>电视机控制区</Text>
                        <TouchableOpacity activeOpacity={1} onPress={()=>this.switchClick('tv', tv_deviceId)}>
                            <Image source={SWITCHIMGURL[this.state.tv]}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.row_between, {marginTop: 30, paddingLeft: 50, paddingRight: 50}]}>
                        <TouchableHighlight style={styles.underlay_btn} onPress={()=>this.clickHandle('MENU', tv_deviceId)} underlayColor='#ccc'>
                            <Image source={require('../assets/TVAV.png')}></Image>
                        </TouchableHighlight >
                        <TouchableHighlight style={styles.underlay_btn}  onPress={()=>this.clickHandle('VOL_SUB', tv_deviceId)} underlayColor='#ccc'>
                            <Image source={require('../assets/voice_j.png')}></Image>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.underlay_btn}  onPress={()=>this.clickHandle('VOL_PLUS', tv_deviceId)} underlayColor='#ccc'>
                            <Image source={require('../assets/voice_jj.png')}></Image>
                        </TouchableHighlight>
                    </View>
                 </View>
                 <View style={[styles.tv_view, {marginTop: 30}]}>
                    <View style={[styles.row_between, {paddingLeft: 50, paddingRight: 50}]}>
                        <TouchableHighlight style={styles.underlay_btn} onPress={()=>this.clickHandle('HOME', box_deviceId)} underlayColor='#ccc'>
                            <Image source={require('../assets/home.png')}></Image>
                        </TouchableHighlight> 
                        <Text style={styles.tv_title}>机顶盒</Text>
                        <TouchableOpacity activeOpacity={1} onPress={()=>this.switchClick('tvBox', box_deviceId)} underlayColor='#ccc'>
                            <View style={styles.underlay_btn}>
                             <Image source={SWITCHIMGURL[this.state.tvBox]}></Image> 
                            </View>
                        </TouchableOpacity>
                    </View >
                    <View style={[styles.row_between, {paddingLeft: 50, paddingRight: 50, marginTop: 40}]}>
                        <View style={styles.channel_voice_view}>
                            <TouchableHighlight style={[styles.channel_voice_btn, {borderTopLeftRadius: 29, borderTopRightRadius: 29}]} onPress={()=>this.clickHandle('VOL_PLUS', box_deviceId)} underlayColor='#ccc'>
                                <Image source={require('../assets/+.png')}></Image>
                            </TouchableHighlight> 
                            <Text style={{fontSize: 20}}>音量</Text>
                            <TouchableHighlight style={[styles.channel_voice_btn, {borderBottomLeftRadius: 29, borderBottomRightRadius: 29}]} onPress={()=>this.clickHandle('VOL_SUB', box_deviceId)} underlayColor='#ccc'>
                                <Image source={require('../assets/-.png')}></Image>
                            </TouchableHighlight> 
                        </View>
                        <View style={[styles.round_view, {transform: [{rotateZ: '45deg'}]}]}>
                            <TouchableHighlight style={[styles.round_view_btn]} onPress={()=>this.clickHandle('UP', box_deviceId)} underlayColor='#ccc'>
                                <Image style={{transform: [{rotateZ:'-45deg'}]}} source={require('../assets/up.png')}></Image>
                            </TouchableHighlight>
                            <TouchableHighlight style={[styles.round_view_btn]} onPress={()=>this.clickHandle('LEFT', box_deviceId)} underlayColor='#ccc'>
                                <Image style={{transform: [{rotateZ:'-45deg'}]}} source={require('../assets/left.png')}></Image>
                            </TouchableHighlight>
                            <TouchableHighlight style={[styles.round_view_btn]} onPress={()=>this.clickHandle('RIGHT', box_deviceId)} underlayColor='#ccc'>
                                <Image style={{transform: [{rotateZ:'-45deg'}]}} source={require('../assets/right.png')}></Image>
                            </TouchableHighlight>
                            <TouchableHighlight style={[styles.round_view_btn]} onPress={()=>this.clickHandle('DOWN', box_deviceId)} underlayColor='#ccc'>
                                <Image style={{transform: [{rotateZ:'-45deg'}]}} source={require('../assets/down.png')}></Image>
                            </TouchableHighlight>
                            <TouchableOpacity style={styles.round_ok} onPress={()=>this.clickHandle('OK', box_deviceId)}>
                                <Text style={{fontSize: 26, color: '#fff'}}>ok</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.channel_voice_view}>
                            <TouchableHighlight style={[styles.channel_voice_btn, {borderTopLeftRadius: 29, borderTopRightRadius: 29}]} onPress={()=>this.clickHandle('UP', box_deviceId)} underlayColor='#ccc'>
                                <Image source={require('../assets/+.png')}></Image>
                            </TouchableHighlight> 
                            <Text style={{fontSize: 20}}>频道</Text>
                            <TouchableHighlight style={[styles.channel_voice_btn, {borderBottomLeftRadius: 29, borderBottomRightRadius: 29}]} onPress={()=>this.clickHandle('DOWN', box_deviceId)} underlayColor='#ccc'>
                                <Image source={require('../assets/-.png')}></Image>
                            </TouchableHighlight> 
                        </View>
                    </View>
                    <View style={[styles.row_between, {marginTop: 30, paddingLeft: 40, paddingRight: 50}]}>
                        <TouchableHighlight underlayColor='#ccc' style={{borderRadius: 5}} onPress={()=>this.clickHandle('RETURN', box_deviceId)}>
                            <View style={styles.action_btn}>
                                <Image style={{marginTop: 10}} source={require('../assets/back.png')}></Image>
                                <Text style={styles.action_btn_desc}>返回</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='#ccc' style={{borderRadius: 5}} onPress={()=>this.clickHandle('PLAY', box_deviceId)}>
                            <View style={styles.action_btn}>
                                <Image style={{marginTop: 10}} source={require('../assets/huik.png')}></Image>
                                <Text style={styles.action_btn_desc}>回看</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='#ccc' style={{borderRadius: 5}} onPress={()=>this.clickHandle('MUTE', box_deviceId)}>
                            <View style={styles.action_btn}>
                                <Image style={{marginTop: 10}} source={require('../assets/mute.png')}></Image>
                                <Text style={styles.action_btn_desc}>静音</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='#ccc' style={{borderRadius: 5}} onPress={()=>this.clickHandle('STOP', box_deviceId)}>
                            <View style={styles.action_btn}>
                                <Image style={{marginTop: 10}} source={require('../assets/db.png')}></Image>
                                <Text style={styles.action_btn_desc}>点播</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.nums_view}>
                        { this.numBtnRender(box_deviceId) }
                    </View>
                 </View>
             </View>
         );
     }
 }
 

 const styles = StyleSheet.create({
     tv_card: {
         width: 490,
     },
     tv_view: {
         backgroundColor: '#f4f4f4',
         borderRadius: 16,
        //  paddingLeft: 50,
        //  paddingRight: 50,
         paddingTop: 30,
         paddingBottom: 30
     },
     row_between: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center'
     },
     tv_title: {
         fontSize: 26,
         color: '#333'
     },
     underlay_btn: {
         padding: 10,
         borderRadius: 3
     },
     channel_voice_view: {
         width: 58,
         height: 203,
         borderRadius: 29,
         backgroundColor: '#FFFFFF',
         alignItems: 'center',
         justifyContent: 'space-between'
     },
     channel_voice_btn: {
         width: 58,
         height: 58,
         justifyContent: 'center',
         alignItems: 'center',
     },
     round_view: {
         width: 206,
         height: 206,
         borderRadius: 103,
         backgroundColor: '#FFFFFF',
         flexWrap: 'wrap',
         overflow: 'hidden'
     },
     round_ok: {
         position: 'absolute',
         width: 80,
         height: 80,
         borderRadius: 40,
         backgroundColor: '#fb7346',
         top: 63,
         left: 63,
         alignItems: 'center',
         justifyContent: 'center',
         transform: [{rotateZ: '-45deg'}]
     },
     round_view_btn: {
         width: 103,
         height: 103,
         alignItems: 'center',
         justifyContent: 'center'
     },
     action_btn: {
         padding: 5,
         alignItems: 'center',
         justifyContent: 'space-around',
         height: 100,
     },
     action_btn_desc: {
         fontSize: 20,
         color: '#000',
         marginTop: 15
     },
     nums_view: {
         flexWrap: 'wrap',
         paddingLeft: 50,
         paddingRight: 50,
         flexDirection: 'row',
         justifyContent: 'center'
     },
     num_view: {
         width: '25%',
         height: 70,
         justifyContent: 'center',
         alignItems: 'center',
         borderColor: '#d8d8d8',
         borderBottomWidth: 1,
         borderRadius: 3
     },
     num: {
         fontSize: 36,
         color: '#999'
     }
 })

 export default TvCard;