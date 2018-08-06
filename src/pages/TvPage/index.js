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

 @connect(
     state => ({app: state.app, tv: state.tv}),
     {
         getTvInfo, smartHostControl
     }
 )
 class TvPage extends React.Component {
     state = {  }

     componentDidMount() {
        const { houseId } = this.props.app
        this.props.getTvInfo({
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

     render() {
         const {tvs} = this.props.tv
         console.log(this.props)
         return (
             <ImageBackground style={styles.container} source={require('./assets/bg_ds.png')} >
                <View style={{flex: 1}}>
                {
                 tvs.length === 1 ? 
                 <ScrollView contentContainerStyle={styles.tab_wrap}>
                    <TvCard  
                        tv={tvs[0]}
                        clickHandle={this.clickHandle}
                    /> 
                </ScrollView>:
                <Tabs tabs={tvs} >
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
               }
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