import React from 'react';
import { 
    View,
    Text,
    ScrollView,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity
 } from 'react-native';
 import { connect } from 'react-redux'
 import { getHostScenes, actionCtrl } from '../../reducers/model.redux'
 import { modelArr } from '../../utils'

 @connect(
     state => ({app: state.app, model: state.model}),
     {
        getHostScenes, actionCtrl
     }
 )
 class ModelPage extends React.Component {
     state = {
         selectIndex: -1
     }

     componentDidMount() {
         const { houseId } = this.props.app
         this.props.getHostScenes({houseId: houseId})
     }

     normalTypeRender = () => {
        const { models, type } = this.props.model
        if(!models) return 
        return models.map((model, index) => {
            const modelName = type===0?model.name.replace('情景', ''):(model.name.indexOf('模式') > -1 ? model.name.slice(0, -2): model.name)  
           return <TouchableOpacity key={model.id} activeOpacity={1} onPress={()=>this.modelClickHandle(index, model.sceneId)}>
                <ImageBackground  style={styles.model_view} source={modelArr(modelName).bg}>
                    <Image source={modelArr(modelName).icon}></Image>
                    <Text style={styles.model_desc}>{modelName}</Text>
                    {
                        this.state.selectIndex === index ? 
                        <Image style={styles.check} source={require('./assets/goux.png')}></Image>
                        :
                        null
                    }
                </ImageBackground>  
            </TouchableOpacity>
           
        })
     }

     modelClickHandle = (index, sceneId) => {
        const { houseId } = this.props.app
        this.setState({
            selectIndex: index
        })
        this.props.actionCtrl({
            deviceType: 'SCENE',
            houseId: houseId,
            sceneId: sceneId
        })
     }

     render() {
         const {type} = this.props.model 
         return (
             <ScrollView contentContainerStyle={{alignItems:'center', flex: 1}}>
                 <View style={styles.models_view}>
                     {
                         this.normalTypeRender()
                     }
                 </View>
             </ScrollView>
         );
     }
 }
 
 const styles = StyleSheet.create({
     models_view: {
         width: 600,
         flexWrap: 'wrap',
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'space-between',
         marginTop: 45
     },
     model_view: {
         width: 275,
         height: 150,
         borderRadius: 5,
         overflow: 'hidden',
         alignItems: 'center',
         justifyContent: 'center',
         marginBottom: 33
     },
     model_desc: {
         fontSize: 22,
         color: '#fff',
         marginTop: 15
     },
     check: {
         position: 'absolute',
         right: 0,
         top: 0
     }
 })
 export default ModelPage;