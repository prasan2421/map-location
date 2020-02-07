import React, {Component} from 'react';
import {Image, StatusBar, StyleSheet, View,Text} from 'react-native';

import {images} from "../constants/images";

const OnboardingLogo = () => (
    <View style={styles.container}>
        <StatusBar
            barStyle="dark-content"
            backgroundColor='#fff'
        />
        <View style={styles.box}>
            {/*<Text style={{fontSize:28,fontWeight:'bold',color:'#262626'}}>IMIS</Text>*/}
            <Image style={{width:220,height:222}}  source={images.logo}/>
        </View>
        <View style={{alignItems:'center'}}>
        <Text style={styles.text}>{"Building and Containment\nInformation Collection System\n(BCICS) - IMIS"}</Text>

        </View>
        {/*<View style={{borderBottomWidth:1,width:'40%',borderColor:'#d5845f',marginTop:15,marginBottom:15}}/>*/}
        {/*<View style={{alignItems:'center'}}>*/}
            {/*<Text style={styles.text}>वपतंजलि स्वावलंबन अभियान</Text>*/}
            {/*<Text style={styles.text}>अखण्ड ,प्रचण्ड पुरुषार्थ ।</Text>*/}
        {/*</View>*/}
        {/*<View style={{borderBottomWidth:1,width:'40%',borderColor:'#d5845f',marginTop:15,marginBottom:15}}/>*/}
        {/*<View style={{alignItems:'center'}}>*/}
            {/*<Text style={styles.text}>स्वदेशी से स्वावलंबी</Text>*/}

        {/*</View>*/}
    </View>
    );


export default OnboardingLogo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },


    box:{

        flexDirection: 'column',
        width:'90%',
        alignItems:'center',
        justifyContent: 'center',
        marginBottom: 20

    },
    text:{
        color:'#5e5e5e',
        fontSize:24,
        fontWeight:'bold',
        textAlign:'center'
    },

    containerBox:{
        padding: 10,
        paddingBottom:20,
        paddingTop:20,
        position:'absolute',
        top:'30%',
        justifyContent:'center',
        width: '90%',
        backgroundColor: '#fff',
        elevation: 4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius:10,
    },
    inputIcon:{
        width:30,
        height:30,
        marginLeft:15,

        alignSelf: 'flex-end'
    },
    buttonContainer: {
        height:60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:200,

    },
    loginButton: {
        position: 'absolute',
        top:0,
        left:0,
        backgroundColor: "#ff4b98",
    },
    forgotText:{
        position: 'absolute',
        bottom:20,



    },
    loginText: {
        color: 'white',
    },

});
