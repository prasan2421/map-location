import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import 'react-native-gesture-handler'
import React, {Component} from 'react';
// import { Box,} from 'react-native-design-utility';

import {Image,Text,View,TouchableOpacity} from 'react-native';

import navTabs from "./MainNav.js";
import LoginScreen from "./LoginScreen";
// import test from '../navTabs/Home'
import Icon from "react-native-vector-icons/Ionicons";
import BuildingMap from '../navTabs/BuildingMap'
import ContainmentMap from '../navTabs/ContainmentMap'
import About from '../navTabs/About'
import BuildingData from '../navTabs/BuildingData'
import ContainmentData from '../navTabs/ContainmentData'
import Test from '../navTabs/Test'
const AuthNavigator = createStackNavigator(
    {
        Login: {screen:LoginScreen,
            navigationOptions: {
                header: null,
            }} ,
    });

const UserNavigator =  createStackNavigator({

    navTabs: {screen:navTabs,navigationOptions: {
            header: null,
        }
    } ,

    BuildingMap:{
        screen: BuildingMap,
        navigationOptions: ({navigation}) => ({
            // topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{
                // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
                // height: 56 + Platform.select({'android': StatusBar.currentHeight, 'ios': 0}),
                backgroundColor: '#30b067',
                // elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Maps</Text>,


        })
    },
    ContainmentMap:{
        screen: ContainmentMap,
        navigationOptions: ({navigation}) => ({
            // topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{
                // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
                // height: 56 + Platform.select({'android': StatusBar.currentHeight, 'ios': 0}),
                backgroundColor: '#30b067',
                // elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Maps</Text>,


        })
    },
    About:{
        screen: About,
        navigationOptions: ({navigation}) => ({
            // topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{
                // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
                // height: 56 + Platform.select({'android': StatusBar.currentHeight, 'ios': 0}),
                backgroundColor: '#30b067',
                // elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>About</Text>,

            headerRight:<View>

            </View>
        })
    },
    BuildingData:{
        screen: BuildingData,
        navigationOptions: ({navigation}) => ({
            // topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{
                // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
                // height: 56 + Platform.select({'android': StatusBar.currentHeight, 'ios': 0}),
                backgroundColor: '#30b067',
                // elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Building Data</Text>,

            headerRight:<View>

            </View>
        })
    },
    ContainmentData:{
        screen: ContainmentData,
        navigationOptions: ({navigation}) => ({
            // topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{
                // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
                // height: 56 + Platform.select({'android': StatusBar.currentHeight, 'ios': 0}),
                backgroundColor: '#30b067',
                // elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Containment Data</Text>,

            headerRight:<View>

            </View>
        })
    },
    Test:{
        screen: Test,
        navigationOptions: ({navigation}) => ({
            // topBarElevationShadowEnabled: false,
            headerTintColor: 'white',
            headerStyle:{
                // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
                // height: 56 + Platform.select({'android': StatusBar.currentHeight, 'ios': 0}),
                backgroundColor: '#30b067',
                // elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",width:"100%",textAlign:'center',fontSize:18,justifyContent:'center'}}>Test</Text>,

            headerRight:<View>

            </View>
        })
    },

});

const AppNavigator =  createSwitchNavigator(
    {
        Splash: {
            getScreen: () => require('./SplashScreen').default,
        },
        Auth: AuthNavigator,
        // Baker:BakerNavigator,
        User:UserNavigator


    },{
initialRouteName: 'Splash',
    });
const AppContainer = createAppContainer(AppNavigator);

class Navigation extends React.Component{
    state = {};
    render(){
        return <AppContainer/>
    }
}

export default Navigation;
