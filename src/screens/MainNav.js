import React from 'react';
import {StatusBar,Platform,StyleSheet, Text, View, Image, Dimensions, ScrollView, Alert, AsyncStorage,TouchableOpacity} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons'
import { createDrawerNavigator,DrawerItems,  } from 'react-navigation-drawer';
import App from "../commons/PopUp"

import Home from '../navTabs/Home'
export default createStackNavigator({
    Home:{
        screen: Home,
        navigationOptions: ({navigation}) => ({
            // topBarElevationShadowEnabled: false,
            headerStyle:{
                // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
                // height: 56 + Platform.select({'android': StatusBar.currentHeight, 'ios': 0}),
                backgroundColor: '#30b067',
                // elevation: 0,
            },
            headerTitle: <Text style={{color:"#fff",fontSize:18,marginLeft:20}}>BCICS - IMIS</Text>,
            // headerLeft: <View></View>,
            headerRight:
                        <App/>

        })
    },



});

