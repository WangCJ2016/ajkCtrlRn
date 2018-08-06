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

     render() {
        const { curtains } = this.props.curtain
        console.log(curtains)
        return (
            <ImageBackground style={styles.container} resizeMode='cover' source={require('./assets/bg_chuang.png')}>
               {
                   curtains.length === 1?
                    <ScrollView contentContainerStyle={styles.tab_wrap}>
                        <CurtainCard ways={curtains[0].ways} clickHandle={this.clickHandle}></CurtainCard>  
                    </ScrollView>
                   :
                   <Tabs tabs={curtains} initialPage={1}>
                    {
                        curtains.map(curtain => (
                            <ScrollView key={curtain.title} contentContainerStyle={styles.tab_wrap}>
                                <CurtainCard ways={curtain.ways} clickHandle={this.clickHandle}></CurtainCard>  
                            </ScrollView>
                        ))
                    }
                   </Tabs> 
               }
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