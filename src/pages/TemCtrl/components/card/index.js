import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity
 } from 'react-native';

 class Card extends React.Component {
    constructor(props) {
        super(props)

        const { ways } = this.props.device
        this.state = { 
            status: ways[0].status || 'OFF'
        }
    }


     statusChange = (flag) => {
        this.setState({
            status: flag
        })
        const status = flag === 'ON' ? "OPEN" : 'CLOSE'
        const { ways } = this.props.device
        const data = {
            actionType: status,
            wayId: ways[0].wayId,
        }
        this.props.swtichClick(data)
     }

     render() {
         const { status } = this.state
         return (
            <ImageBackground style={styles.card} source={require('../../assets/card_bg.png')}>
                <ImageBackground style={[styles.cir_bg]} source={ status==='ON' ? require('../../assets/cir_pad.png'): require('../../assets/cir_padoff.png')}>
                    <View>
                        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                            <Text style={{fontSize: 88, color: '#fff', fontWeight: '200'}}>26</Text>
                            <Text style={{fontSize: 26, fontWeight: '200', color: '#fff'}}>℃</Text>
                        </View>
                        <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={require('../../assets/dndn.png')}></Image>
                            <Text style={{fontSize: 22, color: '#fff', marginLeft: 13}}>室内温度</Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.btn_wrap}>
                    <TouchableOpacity onPress={()=>this.statusChange("ON")} style={[styles.btn, {backgroundColor:  status==='ON' ? '#ea775a': '#fff'}]}>
                        <Text style={[styles.bnt_text, {color: status==='ON' ? '#fff':'#333'}]}>开</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.statusChange('OFF')} style={[styles.btn,{backgroundColor:  status==="OFF" ? '#666': '#fff'}]}>
                        <Text style={[styles.bnt_text, {color: status==="OFF" ? '#fff':'#333'}]}>关</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
         );
     }
 }
 

 const styles = StyleSheet.create({
    card: {
        width: '58.6%',
        borderRadius: 10,
        backgroundColor: '#f4f4f4',
        marginTop: 153,
        marginTop: 91,
        alignItems: 'center',
        paddingBottom: 94,
        paddingTop: 91
    },
    cir_bg: {
        width: 238,
        height: 238,
        borderRadius: 119,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn_wrap: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 27,
        overflow: 'hidden',
        marginTop: 105
    },
    btn: {
        width: 124,
        height: 54,
        borderRadius: 27,
        alignItems: 'center',
        justifyContent:'center'
    },
    bnt_text: {
        color: '#fff',
        fontSize: 24
    }
 })
 export default Card;