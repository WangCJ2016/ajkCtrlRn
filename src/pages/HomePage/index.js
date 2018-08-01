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
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import RoomName from './components/RoomName'
import EnvirParams from './components/EnvirParams'

const WIDTH = Dimensions.get('window').width
class HomePage extends React.Component {
    state = {  }
    componentDidMount() {
        DeviceInfo.getMACAddress()
        .then(res => {
            console.log(res)
        })
        console.log(DeviceInfo.getUniqueID())
    }

    pageRoutersRender = () => {
        let figures = [
            {img:require(`./assets/light.png`),title:'灯',path:`Light`},
            {img:require(`./assets/air.png`),title:'空调',path:`air?`},
            {img:require(`./assets/tv.png`),title:'电视',path:`tv?`},
            {img:require(`./assets/curtain.png`),title:'窗帘',path:`curtain`},
            {img:require(`./assets/model.png`),title:'情景',path:`model`},
            {img:require(`./assets/service.png`),title:'服务',path:`service?`},
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

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./assets/bg_sy.png')} style={{width: WIDTH, height: WIDTH * 0.666}}>
                    <View style={styles.room_status}>
                        <RoomName />
                        <EnvirParams />
                    </View>
                </ImageBackground>
                <View style={{alignItems:'center',marginTop: -107}}>
                    <TouchableWithoutFeedback>
                        <Image source={require('./assets/door.png')}></Image>
                    </TouchableWithoutFeedback> 
                </View>
                <View style={{alignItems:'center'}}>
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
export default HomePage;

