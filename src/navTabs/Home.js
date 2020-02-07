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
                <View style={styles.mainBox}>
                    {/*<Modal*/}
                        {/*isVisible={this.state.visibleModal}*/}
                        {/*style={styles.bottomModal}*/}
                        {/*onRequestClose={()=>this.setState({visibleModal:false})}*/}
                    {/*>*/}
                        {/*{this.renderModalContent()}*/}
                    {/*</Modal>*/}
                    <View style={{width:'30%',paddingRight:15,alignItems:'center',justifyContent:'center'}}>
                        <Image style={{width:100,height:102}}  source={images.logo}/>
                    </View>
                    <View style={{width:'70%'}}>
                        <View style={[styles.bottom,{padding:10,marginBottom: 5}]}>
                            <Text style={styles.headingtext}>Name :</Text>
                            <Text style={styles.bodytext}>{this.state.data.name}</Text>
                        </View>
                        <View style={[styles.bottom,{padding:10,marginBottom: 5}]}>
                            <Text style={styles.headingtext}>Email :</Text>
                            <Text style={styles.bodytext}>{this.state.data.email}</Text>
                        </View>
                        <View style={[styles.bottom,{padding:10,}]}>
                            <Text style={styles.headingtext}>Username :</Text>
                            <Text style={styles.bodytext}>{this.state.data.username}</Text>
                        </View>
                    </View>
                </View>
                <TouchableHighlight
                    underlayColor={"#b7b7b7"}
                    style={styles.box}
                    onPress={()=>this.props.navigation.navigate('BuildingMap')}
                    // onPress={()=>this.setState({visibleModal:true})}
                >
                    <View style={styles.touchbox}>
                        <Image style={{width:60,height:60}}  source={images.map}/>
                        <Text style={styles.text}>Collect Building Data</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor={"#b7b7b7"}
                    style={styles.box}
                    onPress={()=>this.props.navigation.navigate('ContainmentMap')}>
                    <View style={styles.touchbox}>
                        <Image style={{width:60,height:60}}  source={images.map}/>
                    <Text style={styles.text}>Collect Containment Data</Text>
                    </View>
                </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={"#b7b7b7"}
                        style={styles.box} onPress={()=>this.props.navigation.navigate('BuildingData')}>
                        <View style={styles.touchbox}>
                            <Image style={{width:60,height:60}}  source={images.list}/>
                       <Text style={styles.text}>Upload Building Data</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={"#b7b7b7"}
                        style={[styles.box,{marginBottom:10}]} onPress={()=>this.props.navigation.navigate('ContainmentData')}>
                        <View style={styles.touchbox}>
                            <Image style={{width:60,height:60}}  source={images.list}/>
                        <Text style={styles.text}>Upload Containment Data</Text>
                        </View>
                    </TouchableHighlight>
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
        flexDirection:'row',
        width:'100%',
        alignItems:'center'
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
        fontSize:20,
        paddingLeft:20,
        fontWeight: 'bold',
        color:'#4d4d4d'
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