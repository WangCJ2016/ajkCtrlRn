import React from 'react';
import { 
    View, 
    Text,
    ImageBackground,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image
} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import {connect} from 'react-redux'
import { Toast, Button } from 'antd-mobile-rn'
import SplashScreen from 'react-native-splash-screen'

import RoomName from './components/RoomName'
import EnvirParams from './components/EnvirParams'

import { getHouseInfo } from '../../reducers/app.redux'
import { getLockInfo, smartHostControl } from '../../reducers/lock.redux'

const WIDTH = Dimensions.get('window').width

@connect(
    state=>({app: state.app, lock: state.lock}),
    {
        getHouseInfo, getLockInfo, smartHostControl
    }
)
class HomePage extends React.Component {
    state = {
        lockState: false
    }

    componentDidMount = () => {
      SplashScreen.hide()

      this.deviceID = DeviceInfo.getUniqueID()
      this.props.getHouseInfo({pid: this.deviceID})  // 101-101
      
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.app.isBindDevice) {
            this.goRouter('BindVer')
        }
        if(nextProps.app.houseId && !nextProps.lock.deviceId) {
            const { houseId } = nextProps.app
            this.props.getHouseInfo({pid: this.deviceID})
            this.props.getLockInfo({
              houseId: houseId, 
              deviceType: 'FINGERPRINT_LOCK' 
            }) 
        }
    }

    pageRoutersRender = () => {
        let figures = [
            {img:require(`./assets/light.png`),title:'灯',path:`Light`},
            {img:require(`./assets/air.png`),title:'空调',path:`Air`},
            {img:require(`./assets/tv.png`),title:'电视',path:`Tv`},
            {img:require(`./assets/curtain.png`),title:'窗帘',path:`Curtain`},
            {img:require(`./assets/model.png`),title:'情景',path:`Model`},
            {img:require(`./assets/service.png`),title:'服务',path:`Service`},
         ]
         return figures.map((figure, index) => (
             <TouchableOpacity key={index} onPress={() => this.goRouter(figure.path)}>
                 <View style={[styles.router_item, index<4?styles.border_bottom:'',index===figures.length-1?styles.border_right:'']}>
                     <Image source={figure.img}></Image>
                     <Text style={{marginTop: 15, fontSize:25, color:'#666'}}>{figure.title}</Text>
                 </View>
             </TouchableOpacity>
         ))
    }

    goRouter = (url) => {
        this.props.navigation.navigate(url)
    }

    lockClick = () => {
        const { deviceId } = this.props.lock
        const { houseId } = this.props.app
        this.props.smartHostControl({
            houseId: houseId,
            deviceType: 'FINGERPRINT_LOCK',
            deviceId: deviceId,
           // customerId: customerId
        }, () => Toast.success('开锁成功'))
    }

    render() {
        const { houseId } = this.props.app
        return (
            <View style={styles.container}>
                {
                    houseId ? <View>
                        <ImageBackground source={require('./assets/bg_sy.png')} style={{width: WIDTH, height: WIDTH * 0.666}}>
                            <View style={styles.room_status}>
                                <RoomName roomName={this.props.app.roomName} />
                                <EnvirParams />
                            </View>
                        </ImageBackground>
                        <View style={{alignItems:'center',marginTop: -107}}>
                            <TouchableWithoutFeedback 
                                onPressIn={()=>this.setState({lockState: true})}
                                onPressOut={()=>this.setState({lockState: false})}
                                onPress={this.lockClick}>
                                <Image source={this.state.lockState ? require('./assets/door_active.png'):require('./assets/door.png')}></Image>
                            </TouchableWithoutFeedback> 
                        </View>
                        <View style={{alignItems:'center'}}>
                            <View style={styles.router_wrap}>
                                {this.pageRoutersRender()}
                            </View> 
                        </View> 
                    </View>:
                    <Button type='primary' style={{width:200,marginTop: 200, alignSelf:'center'}} inline={true} onClick={this.componentDidMount}>点击刷新信息</Button>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    room_status: {
        marginLeft: 114,
        marginRight: 140,
        marginTop: 100,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 218
    },
    router_wrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 600,
        marginTop: 50
    },
    router_item: {
        width: 150,
        height: 135,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#eee',
        borderLeftWidth: 1
    },
    border_bottom: {
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    border_right: {
        borderRightWidth: 1,
        borderColor: '#eee',
    }
})

export default HomePage 

