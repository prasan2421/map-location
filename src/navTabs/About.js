import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    AsyncStorage,
    StyleSheet,
    FlatList,
    Alert,
    Picker,
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,
    Linking,
    ActivityIndicator, Keyboard, StatusBar, Image
} from 'react-native';

import { Button } from 'react-native-elements';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import {images} from "../constants/images";
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleModal: false,
            data:{}
        }
    }

    componentDidMount() {
        this.getAsyncstorage();
    }

    getAsyncstorage= async () =>{
        const data = await AsyncStorage.getItem('user_data');
        this.setState({
            data:JSON.parse(data)
        })

    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor='#258a50'
                />

                <View style={styles.containerInside}>

                <View style={styles.box}>
                    <View style={styles.touchbox}>
                        <Text style={[styles.text,{  fontSize:20, fontWeight: 'bold',}]}>Building and Containment Information Collection System (IMIS)</Text>
                        <Text style={[styles.text,{  fontSize:16,fontWeight: 'bold',marginTop:60 }]}>Powered by</Text>
                        <Text style={[styles.text,{  fontSize:18, fontWeight: 'bold',}]}>Biz Tech Nepal Pvt. Ltd.</Text>
                    </View>
                </View>
                </View>
            </ScrollView>
        );
    }
}

export default Home;

const styles= StyleSheet.create({
    container:{
        backgroundColor:'#ebeef3',
    },
    containerInside: {
        width: '100%',
        alignItems: 'center',
        marginBottom:2
    },
    mainBox:{
        width:'95%',
        flexDirection:'row',
        alignItems:'center',
        elevation: 1,
        backgroundColor:'#fff',
        marginTop:10,
        padding:10,
        borderRadius:5
    },
    bottomModal: {
        justifyContent: 'center',
        alignItems:'center',
        margin: 0,
    },
    buttonContainer: {
        width:'100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginVertical: 15
    },
    content: {
        width:'95%',
        backgroundColor: '#fff',
        paddingVertical:10,
        paddingHorizontal: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    touchbox:{
        width:'100%',

    },
    box:{
        // height:90,
        width:'95%',
        elevation: 1,backgroundColor:'#fff',
        marginTop:10,
        padding:15,
        borderRadius:5
    },
    text:{

        paddingLeft:20,

        color:'#707070'
    },
    bottom:{
        width:'100%',
        backgroundColor:'#f4f4f4',
        borderRadius:5,
        elevation:1
    },
    headingtext:{
        color:'#4d4d4d'
    },
    bodytext:{
        fontWeight:'bold',
        color:'#2f2f2f',
        fontSize: 16
    }
})