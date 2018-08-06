import React from 'react';
import { 
    View,
    Text,
    ImageBackground,
    StyleSheet,
    ScrollView
 } from 'react-native';
 import { Tabs } from 'antd-mobile-rn'
 import { connect } from 'react-redux'

 import { getCurtainInfo, smartHostControl } from '../../reducers/curtain.redux'

 import CurtainCard from './components/CurtainCard'
 import BlankPage from '../../components/BlankPage'

 @connect(
     state => ({app: state.app, curtain: state.curtain}),
     {
         getCurtainInfo, smartHostControl
     }
 )
 class CurtainPage extends React.Component {
     state = {  }

     componentDidMount() {
        const { houseId } = this.props.app
        this.props.getCurtainInfo({
            houseId: houseId,
            deviceType: 'CURTAIN'
        })    
     }

     clickHandle = ({wayId, key, brightness=80}) => {
        const { houseId } = this.props.app
        this.props.smartHostControl({
            houseId:houseId,
            deviceType: 'CURTAIN',
            wayId: wayId,
            actionType: key,
            brightness: brightness
        })
     }

     curtainRender() {
        const { curtains } = this.props.curtain
        if(curtains.length === 0) {
            return <BlankPage url={require('./assets/chlian_kb.png')} desc='无可控窗帘'></BlankPage>
        }
        if( curtains.length === 1) {
          return  <ScrollView contentContainerStyle={styles.tab_wrap}>
                    <CurtainCard ways={curtains[0].ways} clickHandle={this.clickHandle}></CurtainCard>  
                </ScrollView>
        } 
        return (
            <Tabs tabs={curtains} initialPage={1}>
            {
                curtains.map(curtain => (
                    <ScrollView key={curtain.title} contentContainerStyle={styles.tab_wrap}>
                        <CurtainCard ways={curtain.ways} clickHandle={this.clickHandle}></CurtainCard>  
                    </ScrollView>
                ))
            }
           </Tabs> 
        ) 
     }

     render() {
        return (
            <ImageBackground style={styles.container} resizeMode='cover' source={require('./assets/bg_chuang.png')}>
               {this.curtainRender()}
            </ImageBackground>
        );
     }
 }

 const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tab_wrap: {
        alignItems: 'center',
        flex:1
    }
 })
 
 export default CurtainPage;