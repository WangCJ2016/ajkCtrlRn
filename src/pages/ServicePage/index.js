import React from 'react';
import { 
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableWithoutFeedback,
    Image
 } from 'react-native'
 import { connect } from 'react-redux'

 import { getServiceInfo, smartHostControl } from '../../reducers/service.redux'

 @connect(
     state=>({app: state.app, service: state.service}),
     {
         getServiceInfo, smartHostControl
     }
 )
 class ServicePage extends React.Component {
     state = {
         disturbStatus: 'OFF',
         swipeStatus: 'OFF'
     }

     componentDidMount() {
         const { houseId } = this.props.app
         this.props.getServiceInfo({
            houseId: houseId,
            deviceType: 'SWITCH' 
         })
     }

     serviceHandle = (type) => {
        if (this.state[type] === 'OFF') {
            const state = {
                disturbStatus: 'OFF',
                swipeStatus: 'OFF',
                [type]: 'ON' 
            }
            this.setState(state, () => this.lightClick(type, this.state[type]))
        } else {
            this.setState({
                [type]: 'OFF' 
            }, () => this.lightClick(type, this.state[type]))
        }
     }
     
     lightClick = (type, status) => {
        const { lights } = this.props.service
        const { houseId } = this.props.app
        if (type==='swipeStatus') {
            const cleanlight = lights.filter(light => light.name === "请即清理")
            this.props.smartHostControl({
                houseId: houseId,
                actionType: status,
                deviceType: 'SWITCH',
                wayId: cleanlight[0].wayId,
                brightness:80
            })
          }
          if (type==='disturbStatus') {
            const cleanlight = lights.filter(light => light.name === "请勿打扰")
            this.props.smartHostControl({
                houseId: houseId,
                actionType: status,
                deviceType: 'SWITCH',
                wayId: cleanlight[0].wayId,
                brightness:80 
            })
          }
     }

     render() {
         console.log(this.props.service)
         return (
             <ImageBackground style={styles.container} resizeMode='cover' source={require('./assets/bg_fw.png')}>
                <View style={styles.wrap}>
                    <Text style={styles.title1}>HOTEL SERVICE</Text>
                    <Text style={styles.title2}>酒店一站式服务</Text>
                </View>
                <View style={styles.lights}>
                    <TouchableWithoutFeedback onPress={() => this.serviceHandle('disturbStatus')} >
                        {
                            this.state.disturbStatus === 'OFF' ?
                            <Image source={require('./assets/disturb_off.png')} style={styles.light}></Image>
                            :
                            <Image source={require('./assets/disturb_on.png')} style={styles.light}></Image>
                        }
                    </TouchableWithoutFeedback>  
                    <TouchableWithoutFeedback onPress={() => this.serviceHandle('swipeStatus')} >
                        {
                            this.state.swipeStatus === 'OFF' ? 
                            <Image source={require('./assets/swipe_off.png')} style={styles.light}></Image>
                            :
                            <Image source={require('./assets/swipe_on.png')} style={styles.light}></Image>
                        }
                    </TouchableWithoutFeedback> 
                  
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
        alignItems: 'center'
    },
    wrap: {
        marginTop: 200,
        marginLeft: -240
    },
    title1: {
        fontSize: 35,
        color: '#fff',
        fontWeight: '300'
    },
    title2: {
        fontSize: 30,
        color: '#333',
        marginTop: 20
    },
    lights: {
        marginTop: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 500
    },
    light: {
        // marginLeft: 12,
        // marginRight: 12
    }
 })

 export default ServicePage;