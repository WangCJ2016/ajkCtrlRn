import React from 'react';
import { 
  Text,
  Image
 } from 'react-native'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator,TabNavigator,withNavigation,NavigationActions } from 'react-navigation';

import HomePage from '../pages/HomePage'
import LightsPage from '../pages/LightPage'

const AppNavigator = StackNavigator({
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
    }
   // initialRouteName:'Light',
    // navigationOptions: {
    //     headerTitleStyle: {fontSize: 20, color: '#333'},
    //     headerStyle: {height: 48, backgroundColor: '#fff'},
    //     headerBackTitleStyle:{color:'#333'},
    //     headerTintColor:'#333',
    //     headerTruncatedBackTitle:'返回'
    // },
},
{
    initialRouteName:'Light', 
     navigationOptions: {
        headerTitleStyle: {fontSize: 20, color: '#333'},
        headerStyle: {height: 48, backgroundColor: '#fff'},
        headerBackTitleStyle:{color:'#333'},
        headerTintColor:'#333',
        headerTruncatedBackTitle:'返回'
    },
})


export default AppNavigator