import React, { Component } from 'react';
import {
    Alert,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView, AsyncStorage, Image, PermissionsAndroid,
} from 'react-native';
// import { DrawerItems } from 'react-navigation';
import MyDrawerItem from '../commons/MyDrawerItem';

import {images} from "../constants/images";


const styles = StyleSheet.create({
    customDrawerTouch: {
        paddingLeft: 13,
        paddingTop: 15,
    },
    customDrawerIcon: { paddingRight: 10 },
    backButtonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 17,
        paddingLeft: 3,
        borderBottomColor: '#7f7f7f',
        borderBottomWidth: 1,
    },
});

class MainDrawer extends Component{

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {

    }

    render() {
        const { routeName } = this.props.navigation.state.routes[this.props.navigation.state.index];
            return (
                <ScrollView style={{flex:1,backgroundColor:'#2fb99f'}}>
                    {/*drawer header*/}
                    <View style={{backgroundColor:'#fff',justifyContent:'center',alignItems:'center',paddingTop:5,paddingBottom:15}}>
                        {/*<Image style={{height:60,width:127,marginBottom:10}}  source={images.logo}/>*/}
                        <Text style={{fontSize:22,fontWeight:'bold',color:'#30b067',marginBottom:10}}>IMIS</Text>

                        <View style={{height:90,width:90,backgroundColor:'#aa3f00',borderRadius:90,justifyContent:'center',borderColor:'#30b067',borderWidth:3}}>
                            {/*<Image style={{height:84,width:84,backgroundColor:'#aa3f00',borderRadius:84,justifyContent:'center',borderColor:'#f3f7ec',borderWidth:2}}  source={images.face}/>*/}
                        </View>
                        <View>
                            <Text style={{fontSize:14,color:'#30b067',/*fontWeight:'bold',width:'100%'*/}}>test name</Text>
                        </View>
                    </View>
                    <View style={{marginTop:20}}>
                        <MyDrawerItem
                            onPress={() => {
                                this.props.navigation.navigate('Home');
                                this.props.navigation.closeDrawer();
                            }}
                            style={{
                                marginLeft: 20,
                                color: '#fff'}}
                            iconColor={'#fff'}
                            active={routeName == 'Home'}
                            icon="md-home"
                            text="Home"
                        />


                        <Text style={{paddingLeft: 15,marginTop:20,alignItems:'flex-end'}}>Version : 1.0.0</Text>
                    </View>
                </ScrollView>
            );

    }
}

export default MainDrawer;
