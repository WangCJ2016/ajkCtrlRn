import React from 'react';
import { 
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableWithoutFeedback,
    Image
 } from 'react-native'
 import { Modal } from 'antd-mobile-rn'

 class ServicePage extends React.Component {
     state = {
         disturbStatus: 'OFF',
         swipeStatus: 'OFF'
     }

     checkoutHandle = () => {
        Modal.alert('确认退房？', '' , 
            [{
                text: '取消',
                onPress: () => {}
            },{
                text: '确认',
                onPress: () => {}
            }]
        )
     }

     serviceHandle = (type) => {
        if (this.state[type] === 'OFF') {
            const state = {
                disturbStatus: 'OFF',
                swipeStatus: 'OFF',
                [type]: 'ON' 
            }
            this.setState(state)
        } else {
            this.setState({
                [type]: 'OFF' 
            })
        }
     }

     render() {
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
                    <TouchableWithoutFeedback onPress={this.checkoutHandle} >
                        <Image source={require('./assets/checkout_off.png')} style={styles.light}></Image>
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
        flexDirection: 'row'
    },
    light: {
        marginLeft: 12,
        marginRight: 12
    }
 })

 export default ServicePage;