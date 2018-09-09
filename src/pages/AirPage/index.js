import React from 'react';
import { 
    View,
    ImageBackground,
    StyleSheet
 } from 'react-native'
 import { Tabs } from 'antd-mobile-rn'
 import { connect } from 'react-redux'

 import AirCard from './components/AirCard'
 import { getAirInfo, smartHostControl, getDeviceStatus } from '../../reducers/air.redux'
 import BlankPage from '../../components/BlankPage'

 @connect(
     state => ({app: state.app, air: state.air}), 
     {
         getAirInfo, smartHostControl, getDeviceStatus
     }
 )
 class AirPage extends React.Component {
     state = {  }

     componentDidMount() {
         const { houseId } = this.props.app
         this.props.getAirInfo({
            deviceName: encodeURI('空调'), 
            houseId: houseId 
         })
     }
     
    switchClick = ({deviceId, key }) => {
        const { houseId } = this.props.app
        const { deviceType } = this.props.air
        let data = null
        if (deviceType === 'VIRTUAL_AIR_REMOTE') {
            data = {
                houseId: houseId,
                deviceType: deviceType,
                deviceId: deviceId,
                key: key
            }
        }
        if (deviceType === 'VIRTUAL_CENTRAL_AIR_REMOTE') {
            if (key === 'OFF') {
                data = {
                    houseId: houseId,
                    deviceType: deviceType,
                    deviceId: deviceId,
                    onOff : "OFF",
                    mode: 'COOL',
                    wind: 0,
                    temp: 25
                }
            } else {
                data = {
                    houseId: houseId,
                    deviceType: deviceType,
                    deviceId: deviceId,
                    mode: 'COOL',
                    temp: key,
                    wind: 0
                }
            }
        }
        this.props.smartHostControl(data)
     }

    temChangeHandle = ({deviceId, key, model, speed}) => {
        const { houseId } = this.props.app
        const { deviceType } = this.props.air
        if (deviceType === 'VIRTUAL_AIR_REMOTE') {
            this.props.smartHostControl({
                houseId: houseId,
                deviceType: deviceType,
                deviceId: deviceId,
                key: key
            }) 
        }
        if(deviceType === 'VIRTUAL_CENTRAL_AIR_REMOTE') {
            const _mode = model === 'cold' ? 'COOL' : 'WARM'
            this.props.smartHostControl({
                houseId: houseId,
                deviceType: deviceType,
                deviceId: deviceId,
                mode: _mode,
                temp: key,
                wind: speed
            })  
        } 
    }

    airRender() {
        const { airs, deviceType } = this.props.air
        console.log(airs)
        if(airs.length === 0) {
            return <BlankPage url={require('./assets/kongtiao_kng.png')} desc='无可控空调' color='#5b97fd'></BlankPage>
        }
        if(airs.length === 1) {
            return (
                <View key={airs[0].deviceId} style={styles.tab_wrap}>
                    <AirCard 
                        air={airs[0]} 
                        deviceType={deviceType}
                        switchClick={this.switchClick}
                        temChangeHandle={this.temChangeHandle}
                    />
                </View>
            )
        }
        return (
            <Tabs 
             tabBarUnderlineStyle={{backgroundColor: "#fb7346"}}
             tabBarActiveTextColor='#fb7346'
             tabBarInactiveTextColor='#333'
             tabs={airs} >
            {
                airs.map(air => (
                    <View key={air.deviceId} style={styles.tab_wrap}>
                        <AirCard 
                            air={air} 
                            deviceType={deviceType}
                            switchClick={this.switchClick}
                            temChangeHandle={this.temChangeHandle}
                        />
                    </View>
                ))
            }
            </Tabs> 
        )
    }

     render() {
       
         return (
             <ImageBackground style={styles.container} source={require('./assets/bg_kt.png')} resizeMode='cover'>
                <View style={{flex: 1, width: '100%'}}>
                   {this.airRender()}
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
    tab_wrap: {
        flex: 1,
        alignItems: 'center'
    }
 })
 
 export default AirPage;