import React from 'react';
import { 
    View,
    Text,
    ImageBackground,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image
 } from 'react-native';
 import { connect } from 'react-redux'

 import { getHotelRoomsList, dataSuccess } from '../../reducers/hotelList.redux'
 import SearchInput from '../../components/SearchInput'

 @connect(
    state=>({hotelList: state.hotelList}), 
    {
        getHotelRoomsList, dataSuccess
    }
)
 class SelectRoomPage extends React.Component {
     state = { 
         dataSource: []
      }


     componentDidMount() {
        const {BindHotel} = this.props.hotelList
        this.props.navigation.setParams({submitHandle: this.submitHandle})

         this.props.getHotelRoomsList({
            operate: 'V1ZNeGNVeFhjM1JqTWpGb1kyNVNSR1JJU25NPQ==',
            hotelId: BindHotel.id
         })
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

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: nextProps.hotelList.hotelRoomList,
            selectId: nextProps.hotelList.BindRoom? nextProps.hotelList.BindRoom.id:''
        })
    }

    submitHandle = () => {
       this.props.dataSuccess({
           BindRoom: this.props.hotelList.hotelRoomList.filter(item => item.id === this.state.selectId)[0]
       })
       this.props.navigation.goBack()
    }

    _keyExtractor = (item) => item.id

    _renderItem = ({item}) => {
        const ifSelect = item.id === this.state.selectId
        return (
            <TouchableOpacity onPress={()=> this.setState({ selectId: item.id})}>
               <View style={[styles.item_wrap, {backgroundColor: ifSelect?'#FF9141':'#fff'}]}>
                   {
                       ifSelect ? 
                       <Image source={require('./assets/fangjian.png')}></Image>
                       :
                       <Image source={require('./assets/fangjian1.png')}></Image>
                   }
                   <Text style={[styles.hotel_name, {color: ifSelect?'#fff':'#555'}]}>{item.name}</Text> 
               </View>
            </TouchableOpacity>
        )
    }

    _renderHeader = () => (
        <View style={styles.header}>
            <SearchInput submitHandle={this.searchHandle}></SearchInput>
            {this._renderHotelTile()}
        </View>
    )

    _renderHotelTile = () => {
       const { BindHotel } = this.props.hotelList
       return <View style={styles.hotelTitle_wrap}>
            <Image style={styles.hotel_thumb} source={require('../SelectHotelPage/assets/hotel_default_icon.png')}></Image>
            <Text style={styles.hotel_title}>{BindHotel.name}</Text>
        </View>
    }

    searchHandle = (e) => {
        if(e) {
           const data = this.state.dataSource.filter( item => item.name.indexOf(e) > -1)
           this.setState({
               dataSource: data
           })
        } else {
            this.setState({
                dataSource: this.props.hotelList.hotelRoomList 
            })
        }
      
    }

     render() {
         return (
            <ImageBackground style={{flex:1}} source={require('../SelectHotelPage/assets/bg_fw.png')} resizeMode='cover'>
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
        width: 160,
        height: 185,
        borderRadius: 16,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        marginLeft: 26,
        marginRight: 26
    },
   
    hotel_name: {
        marginTop: 27,
        fontSize: 25,
        color: '#555',
        width: 160,
        textAlign: 'center',
        marginTop: 26
    },
    check_wrap: {
        width: 160,
        height: 160,
        borderRadius: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.35)'
    },
    hotelTitle_wrap: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 580,
        marginTop: 11,
        marginBottom: 40
    },
    hotel_thumb: {
        width: 74,
        height: 74,
        borderRadius: 37,
    },
    hotel_title: {
        color: '#FFFFFF',
        fontSize: 33,
        marginLeft: 26,
    }
})


 export default SelectRoomPage;