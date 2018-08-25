import React from 'react';
import { 
    TextInput,
    View,
    StyleSheet,
    Image,
    TouchableOpacity
 } from 'react-native';

 class SeachInput extends React.Component {
     state = { 
        focusIf: false
     }

     onChangeText = (e) => {
         
         clearTimeout(this.timer)
         this.timer = setTimeout(()=>{
            this.props.submitHandle(e)
         }, 250)
     }
     render() {
         const { focusIf } = this.state
         return (
            <View style={styles.search_wrap}>
                {
                    !focusIf ? 
                    <TouchableOpacity onPress={()=>this.setState({focusIf: true})}>
                        <Image source={require('./asstes/sousuo.png')}></Image>
                    </TouchableOpacity>
                    :
                    <TextInput style={{width: 500}} 
                        enablesReturnKeyAutomatically={true}
                        returnKeyType={'search'}
                       // onEndEditing={ this.onEndEditing }
                        onChangeText={this.onChangeText}
                    />
                }
                
            </View> 
         );
     }
 }
 
 export default SeachInput;


 const styles = StyleSheet.create({
     search_wrap: {
         height: 50,
         borderRadius: 25,
         backgroundColor: 'rgba(255, 255, 255, .2)',
         alignItems: 'center',
         justifyContent: 'center',
         paddingLeft: 20,
         paddingRight: 20
     }
 })