import React from 'react';
import { 
    View, 
    Text,
    ImageBackground,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    DeviceEventEmitter
} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import {connect} from 'react-redux'
import { Toast } from 'antd-mobile-rn'
import SplashScreen from 'react-native-splash-screen'

import RoomName from './components/RoomName'
import EnvirParams from './components/EnvirParams'

import { getHouseInfo } from '../../reducers/app.redux'
import { getLockInfo, smartHostControl } from '../../reducers/lock.redux'
import { getDevices } from '../../reducers/temCtrl.redux'


const WIDTH = Dimensions.get('window').width

@connect(
    state=>({
        app: state.app, 
        lock: state.lock,
        temCtrl: state.temCtrl
    }),
    {
        getHouseInfo, getLockInfo, smartHostControl, getDevices
    }
)
class HomePage extends React.Component {
    static navigationOptions = ({navigation,screenProps}) => ({  
        header: null
    });  

    state = {
        lockState: false
    }
    
    componentDidMount = () => {
      SplashScreen.hide()

      this.deviceID = DeviceInfo.getUniqueID()

      this.props.getHouseInfo({pid: this.deviceID}, () => this.goRouter('BindVer')) 
      
     // 监听
     this.listener = DeviceEventEmitter.addListener('addHouse', () => {
        this.deviceID = DeviceInfo.getUniqueID()
        this.props.getHouseInfo({pid: this.deviceID}, () => this.goRouter('BindVer')) 
         // 获取温控
        this.props.getDevices({
            serverId: this.props.app.serverId
        })
      })
    }

    componentWillReceiveProps(nextProps) {
       
        if(nextProps.app.houseId && !nextProps.lock.deviceId) {
            const { houseId, serverId } = nextProps.app
           // this.props.getHouseInfo({pid: this.deviceID})
            this.props.getLockInfo({
              houseId: houseId, 
              deviceType: 'FINGERPRINT_LOCK' 
            }) 
          // 获取温控
            this.props.getDevices({
                serverId: serverId
             })
        }
    }

    componentWillUnmount(){
        this.listener.remove();
    }

    pageRoutersRender = () => {
        const {temCtrl} = this.props
        let figures = [
            {img:require(`./assets/light.png`),title:'灯',path:`Light`},
            {img:require(`./assets/air.png`),title:'空调',path:`Air`},
            {img:require(`./assets/tv.png`),title:'电视',path:`Tv`},
            {img:require(`./assets/curtain.png`),title:'窗帘',path:`Curtain`},
            {img:require(`./assets/model.png`),title:'情景',path:`Model`},
            {img:require(`./assets/service.png`),title:'服务',path:`Service`},
         ]
         if(temCtrl.temCltrIf) {
            figures = [...figures, {img:require(`./assets/tem_icon.png`),title:'温控',path:`TemCtrl`}]
         }
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
        const { app } = this.props
        console.log(app)
        return (
            <View style={styles.container}>
            
                <ImageBackground source={app.lock ? require('./assets/bg_sy.png') : require('./assets/-s-backgrpad.png')} style={{width: WIDTH, height: WIDTH * 0.666}}>
                    <View style={styles.room_status}>
                        <RoomName roomName={this.props.app.roomName} />
                        <EnvirParams />
                    </View>
                </ImageBackground>
                {
                    app.lock ? 
                    <View style={{alignItems:'center',marginTop: -107}}>
                        <TouchableWithoutFeedback 
                            onPressIn={()=>this.setState({lockState: true})}
                            onPressOut={()=>this.setState({lockState: false})}
                            onPress={this.lockClick}>
                            <Image source={this.state.lockState ? require('./assets/door_active.png'):require('./assets/door.png')}></Image>
                        </TouchableWithoutFeedback> 
                    </View>
                    : null
                }
                <View style={{alignItems:'center', justifyContent: 'center', flex:1}}>
                    <View style={styles.router_wrap}>
                        {this.pageRoutersRender()}
                    </View> 
                </View> 
            
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
        // marginLeft: 114,
        // marginRight: 140,
        marginTop: 100,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 218
    },
    router_wrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 600,
        // marginTop: 50
    },
    router_item: {
        width: 150,
        height: 135,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#eee',
        borderLeftWidth: 1,
        // marginTop: 50
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

