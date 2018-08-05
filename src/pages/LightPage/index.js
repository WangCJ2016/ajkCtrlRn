import React from 'react';
import { 
    ScrollView,
    ImageBackground,
    StyleSheet
 } from 'react-native';
import { connect } from 'react-redux'

 import LightTab from './components/LightTab'
 import LightCard from './components/LightCard'
 
 import { config } from '../../config'
 import { getSwitchServerId, dataSuccess, lightClick } from '../../reducers/lights.redux'

@connect(
    state => ({app: state.app, lights: state.lights}),
    {
        getSwitchServerId, dataSuccess, lightClick
    }
)
 class LightsPage extends React.Component {
     state = { 
        switchStatus: false
     }

     componentDidMount() {
        const { houseId } = this.props.app
        this.props.getSwitchServerId({houseId: houseId, deviceType: 'SWITCH' })   
     }
     
     componentWillReceiveProps(nextProps) {
         if(nextProps.lights.serverId && !this.websocket) {
             this.websocketHandle(nextProps.lights.serverId)
         }
     }

     websocketHandle = (serveId) => {
        this.websocket = new WebSocket(`ws://${config.api.websocket}/stServlet.st?serverId=` + serveId) 
        this.websocket.onopen = () => {
          console.log('websocket已链接')
        }
        this.websocket.onmessage = (event) => {
          let lights = this.props.lights.lights
          const lightNow = event.data.split('.WAY.')
          const changelihts = lights.map((light, index) => {
            if(light.wayId === lightNow[0]) {
              return {...light, status: lightNow[1]}
            }else {
              return light
            }
          })
         this.props.dataSuccess({lights: changelihts})
         }
     }

     lightClick = (status, wayId) => {
        const { houseId } = this.props.app

        this.props.lightClick({
            houseId: houseId,
            deviceType: 'SWITCH',
            actionType: status === 'ON' ? 'CLOSE' : 'OPEN',
            wayId: wayId,
            brightness: 80
        })
     }

     switchChange = (e) =>  {
        const { houseId } = this.props.app
        this.setState({
          switchStatus: !this.state.switchStatus
        })
       // console.log(e, this.state.switchStatus)
        const {lights, lightType} = this.props.lights
         lights
        .filter((light) => light.name&&light.name.indexOf(lightType) > -1)
        .forEach(light => {
            this.props.lightClick({
                houseId: houseId,
                deviceType: 'SWITCH',
                actionType: e?'OPEN':'CLOSE',
                wayId: light.wayId,
                brightness: 80
            })
        })
     }

     render() {
         const { lightType, lights } = this.props.lights
         const typelights = lights.filter(light => light.name.includes(lightType))
         console.log(this.state.switchStatus)
         return (
            <ImageBackground resizeMode='cover' style={styles.container} source={require('./assets/bg_d.png')}>
                <ScrollView>
                    <LightTab changeType={this.props.dataSuccess} type={lightType}></LightTab>
                    <LightCard lights={typelights} type={lightType} switchStatus={this.state.switchStatus}  lightClick={this.lightClick} switchChange={this.switchChange}></LightCard> 
                </ScrollView>
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
     }
 })
 export default LightsPage;

