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

 import { getTvInfo, smartHostControl } from '../../reducers/tv.redux'
 import TvCard from './components/TvCard'
 import BlankPage from '../../components/BlankPage'

 @connect(
     state => ({app: state.app, tv: state.tv}),
     {
         getTvInfo, smartHostControl
     }
 )
 class TvPage extends React.Component {
     state = {  }

     componentDidMount() {
        const { serverId, houseId } = this.props.app
        this.props.getTvInfo({
            serverId: serverId,
            houseId: houseId
        })    
     }

     clickHandle = ({deviceId, key}) => {
        const { houseId } = this.props.app
        this.props.smartHostControl({
            houseId:houseId,
            deviceType: 'VIRTUAL_TV_DVD_REMOTE',
            deviceId: deviceId,
            key:key
        })
     }

     tvRender() {
        const {tvs} = this.props.tv
         if(tvs.length === 0) {
             return <BlankPage url={require('./assets/wuleixing.png')} desc='无可控电视' color='#fb7346'></BlankPage>
         }
         if(tvs.length === 1) {
            return <ScrollView contentContainerStyle={styles.tab_wrap}>
                    <TvCard  
                        tv={tvs[0]}
                        clickHandle={this.clickHandle}
                    /> 
                </ScrollView> 
         }
         return (
            <Tabs
             //renderTab = {() => (<View style={{width: 50, height: 100}}><Text>fsdfs</Text></View>)}
             tabBarUnderlineStyle={{backgroundColor: "#fb7346"}}
             tabBarActiveTextColor='#fb7346'
             tabBarInactiveTextColor='#333'
             tabs={tvs} >
                {
                tvs.map((tv, index) => (
                    <ScrollView key={index} contentContainerStyle={styles.tab_wrap}>
                        <TvCard  
                            tv={tv}
                            clickHandle={this.clickHandle}
                        /> 
                    </ScrollView>
                    ))
                }
            </Tabs>  
         )

     }

     render() {
         const {tvs} = this.props.tv
         return (
             <ImageBackground style={styles.container} source={require('./assets/bg_ds.png')} >
                <View style={{flex: 1, width: '100%'}}>
                   {this.tvRender()} 
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
        alignItems: 'center',
    },
    tab_wrap: {
        paddingTop: 45,
        alignItems: 'center',
    }
 })
 
 export default TvPage;