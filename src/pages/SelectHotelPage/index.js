import React from 'react';
import { 
    View,
    Text,
    FlatList,
    ImageBackground,
    TouchableOpacity,
    Image,
    StyleSheet,
 } from 'react-native';
 import { connect } from 'react-redux'
 //import { ListView } from 'antd-mobile-rn'
 import { getHotelList, dataSuccess } from '../../reducers/hotelList.redux'
 import SearchInput from '../../components/SearchInput'


 @connect(
     state=>({hotelList: state.hotelList}), 
     {
         getHotelList, dataSuccess
     }
 )
 class SelectHotel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          dataSource: []
        };
    }

    static navigationOptions = ({navigation}) => ({  
        headerRight: (  
          <TouchableOpacity onPress={()=>{navigation.state.params.submitHandle()}}> 
            <View style={{marginRight:10}}>
               <Text>确定</Text>
            </View>
          </TouchableOpacity>   
            
        ),  
    })

     componentDidMount() {
        this.props.navigation.setParams({submitHandle: this.submitHandle})

         this.props.getHotelList({
            operate: 'V1ZNeGNVeFhjM1JqTWpGb1kyNVNSR1JJU25NPQ=='
         })
     }

     componentWillReceiveProps(nextProps) {
         this.setState({
             dataSource: nextProps.hotelList.hotelList,
             selectId: nextProps.hotelList.BindHotel? nextProps.hotelList.BindHotel.id:''
         })
     }

     submitHandle = () => {
        this.props.dataSuccess({
            BindHotel: this.props.hotelList.hotelList.filter(item => item.id === this.state.selectId)[0],
            BindRoom: null
        })
        this.props.navigation.goBack()
     }

     _keyExtractor = (item) => item.id

     _renderItem = ({item}) => {
         return (
             <TouchableOpacity onPress={()=> this.setState({ selectId: item.id})}>
                <View style={styles.item_wrap}>
                    <ImageBackground style={styles.hotel_image} source={require('./assets/hotel_default_icon.png')}>
                        {
                            this.state.selectId === item.id ? 
                            <View style={styles.check_wrap}>
                                <Image source={require('./assets/right1.png')}></Image>
                            </View>
                            : null
                        }
                    </ImageBackground>
                    <Text style={styles.hotel_name}>{item.name}</Text> 
                </View>
             </TouchableOpacity>
         )
     }

     _renderHeader = () => (
         <View style={styles.header}>
             <SearchInput submitHandle={this.searchHandle}></SearchInput>
         </View>
     )

     searchHandle = (e) => {
         if(e) {
            const data = this.state.dataSource.filter( item => item.name.indexOf(e) > -1)
            this.setState({
                dataSource: data
            })
         } else {
             this.setState({
                 dataSource: this.props.hotelList.hotelList 
             })
         }
       
     }

     render() {
        
         return (
                <ImageBackground style={{flex:1}} source={require('./assets/bg_fw.png')} resizeMode='cover'>
                    <FlatList
                        contentContainerStyle={{alignItems: 'center'}}
                        ListHeaderComponent={this._renderHeader}
                        data={this.state.dataSource}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        numColumns={3}
                        columnWrapperStyle={{marginTop: 40}}
                    />
                </ImageBackground>
        );
     }
 }

 const styles = StyleSheet.create({
     header: {
         paddingTop: 20,
         width: 580,
         alignItems:'flex-end'
     },
     item_wrap: {
         width: 218,
         alignItems: 'center'
     },
     hotel_image: {
         width: 160,
         height: 160
     },
     hotel_name: {
         marginTop: 27,
         fontSize: 23,
         color: '#fff',
         width: 160,
         textAlign: 'center'
     },
     check_wrap: {
         width: 160,
         height: 160,
         borderRadius: 80,
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: 'rgba(0, 0, 0, 0.35)'
     }
 })
 
 export default SelectHotel;