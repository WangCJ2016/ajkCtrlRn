import React from 'react';
import { 
    View,
    Text,
    ImageBackground,
    StyleSheet,
    ScrollView
 } from 'react-native';
 import { connect } from 'react-redux'
 import { Tabs } from 'antd-mobile-rn'
 import Card from './components/card'

 import { getDevices, smartControl } from '../../reducers/temCtrl.redux'

 @connect(
    state=>({temCtrl: state.temCtrl, app: state.app}),
    {
        getDevices, smartControl
    }
)
 class TemCtrl extends React.Component {
     state = {  }

    //  componentDidMount() {
    //      this.props.getDevices({
    //         serverId: this.props.app.serverId
    //      })
    //  }

     swtichClick = (data) => {
        const { houseId } = this.props.app
        this.props.smartControl({
            houseId: houseId,
            deviceType: 'SWITCH',
            brightness: 80,
            ...data
        })
     }

     deviceRender() {
        const {devices} = this.props.temCtrl
        
         if(devices.length === 1) {
            return <ScrollView contentContainerStyle={styles.tab_wrap}>
                    <Card  
                        device={devices[0]}
                        swtichClick={this.swtichClick}
                    /> 
                </ScrollView> 
         }
         return (
            <Tabs
             //renderTab = {() => (<View style={{width: 50, height: 100}}><Text>fsdfs</Text></View>)}
             tabBarUnderlineStyle={{backgroundColor: "#fb7346"}}
             tabBarActiveTextColor='#fb7346'
             tabBarInactiveTextColor='#333'
             tabs={devices} >
                {
                devices.map((device, index) => (
                    <ScrollView key={index} contentContainerStyle={styles.tab_wrap}>
                        <Card  
                            device={device}
                            swtichClick={this.swtichClick}
                        /> 
                    </ScrollView>
                    ))
                }
            </Tabs>  
         )

     }

     render() {
         console.log(this.props)
         return (
             <ImageBackground style={styles.container} source={require('./assets/bg.png')}>
                <View style={{flex: 1, width: '100%'}}>
                   {this.deviceRender()} 
                </View>
             </ImageBackground>
         );
     }
 }

 const styles = StyleSheet.create({
     container: {
         flex: 1,
         alignItems: 'center'
     },
     tab_wrap: {
        paddingTop: 45,
        alignItems: 'center',
    }
 })
 
 export default TemCtrl;