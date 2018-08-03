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
            title: '窗帘'
        }
    }
},
{
    initialRouteName:'Home', 
     navigationOptions: {
        headerTitleStyle: {fontSize: 20, color: '#333'},
        headerStyle: {height: 48, backgroundColor: '#fff'},
        headerBackTitleStyle:{color:'#333'},
        headerTintColor:'#333',
        headerTruncatedBackTitle:'返回'
    },
})



export default AppNavigator