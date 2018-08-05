import React from 'react';
import { 
  Text,
  Image
 } from 'react-native'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator,createStackNavigator,withNavigation,NavigationActions } from 'react-navigation';

import HomePage from '../pages/HomePage'
import LightsPage from '../pages/LightPage'
import ServicePage from '../pages/ServicePage'
import AirPage from '../pages/AirPage'
import TvPage from '../pages/TvPage'
import CurtainPage from '../pages/CurtainPage'
import ModelPage from '../pages/ModelPage'

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            title:'Home',
        }
    },
    Light: {
        screen: LightsPage,
        navigationOptions: {
            title:'灯',
        }
    },
    Service: {
        screen: ServicePage,
        navigationOptions: {
            title: '服务',
        } 
    },
    Air: {
        screen: AirPage,
        navigationOptions: {
            title: '空调',
        }  
    },
    Tv: {
        screen: TvPage,
        navigationOptions: {
            title: '电视'
        }
    },
    Curtain: {
        screen: CurtainPage,
        navigationOptions: {
            title: '窗帘/窗纱'
        }
    },
    Model: {
        screen: ModelPage,
        navigationOptions: {
            title: '情景模式'
        }
    }
},
{
    initialRouteName:'Home', 
     navigationOptions: {
        headerTitleStyle: {fontSize: 24, color: '#000', fontWeight: '300'},
        headerStyle: {height: 48, backgroundColor: '#fff'},
        headerBackTitleStyle:{color:'#333'},
        headerTintColor:'#333',
        headerTruncatedBackTitle:'返回'
    },
})



export default AppNavigator