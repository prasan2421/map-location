import React, {Component} from 'react';

import {
    AppRegistry,
    ImageBackground,
    Dimensions,
    Alert,
    ScrollView,
    Button,
    Image,
    TextInput,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Animated,
    StatusBar,
    StyleSheet, Keyboard, Linking
} from 'react-native';

import {Text} from 'react-native';
import ActivityIcon from "../commons/ActivityIcon";
import ErrorText from '../commons/ErrorText';
import {AsyncStorage} from 'react-native';
// import VersionNumber from 'react-native-version-number';
// import {images} from "../constants/images";
import Icon from "react-native-vector-icons/Ionicons";
import Url from "../constants/Url";
import {images} from "../constants/images";

class LoginScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            username: '',
            password: '',
            usernameError: '',
            passwordError: '',
            opacity: new Animated.Value(0),
            position: new Animated.Value(0),
        }
    }
    componentDidMount(){
        this.opacityAnim();
        this.positionAnim();
    }

    login = () => {
        // alert(Url.baseUrl);return;
        let username = this.state.username.trim();
        let password = this.state.password;
        let usernameError = '';
        let passwordError = '';

        if(username==""){
            usernameError = 'Please enter the username';
        }

        if(password==""){
            passwordError = 'Please enter the password';
        }

        this.setState({
            usernameError: usernameError,
            passwordError: passwordError
        });

        if(usernameError ||  passwordError) {
            return;
        }

        this.showLoader();
        const data = new FormData();
        data.append('username', this.state.username);
        data.append('password', this.state.password);

        fetch(Url.baseUrl+'/login-building-survey',{
            method:'POST',
            headers:{
                // 'Accept':'application/json',
                // 'Content-Type':'application/json',
                // 'version':VersionNumber.buildVersion,
            },
                body: data,
            // body: JSON.stringify({
            //     username: this.state.username,
            //     password: this.state.password,
            // })
        })
            .then((response)=> response.json())
            .then ((responseJson) => {
                    // alert(JSON.stringify(responseJson));return;
                if(responseJson.success){
                    this.saveToAsyncStorage(responseJson);
                    // this.props.navigation.navigate('LoginScreenOtp',{ Email: this.state.email,Token:responseJson.data.token});
                }
                else{
                    this.hideLoader();
                    // alert(JSON.stringify(responseJson.error.login));return;
                    if(responseJson.error.login){
                        // alert(Object.values(responseJson.error.login).join('\n'));
                        alert(responseJson.error.login);
                    }

                    else{
                        alert(Object.values(responseJson.error).join('\n'));
                        // alert(JSON.stringify(responseJson.error));
                    }
                }
            })
            .catch((error) => {
                this.hideLoader();
                alert(error);
            })
            .done();
    };

    saveToAsyncStorage = async (data) => {
        // alert(JSON.stringify(data));return;
        let user_data= JSON.stringify(data.data);
        await AsyncStorage.multiSet([
            ['role', 'bride'],
            // ['name', data.data.name],
            // ['email', data.data.email],
            // ['username', data.data.username],
            ['user_data',user_data],
            ['access_token',data.data.api_token],
        ]);
        this.props.navigation.navigate('navTabs');
        this.hideLoader();
    };

    showLoader = () => {
        this.setState({ isLoading: true });
    };

    hideLoader = () => {
        this.setState({ isLoading: false });
    };

    opacityAnim=() =>{
        Animated.timing(this.state.opacity,{
            toValue:1,
            duration:200
        }).start()
    };

    positionAnim=() =>{
        Animated.timing(this.state.position,{
            toValue:1,
            duration:300,
            useNativeDriver:true,
        }).start()
    };

    render(){
        const logoTranslate = this.state.position.interpolate({
            inputRange:[0,1],
            outputRange:[245,20],
        });
        const width = (Dimensions.get('window').width)-170;
        const height = width/2.118;
        return(
            <View style={styles.wrapper}>
                <ScrollView contentContainerStyle={{flexGrow: 1,justifyContent : 'center'}}>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor='#258a50'
                    />
                <ActivityIcon visible={this.state.isLoading}
                              indicatorColor={'#333333'}
                              messageColor={'#afafaf'}
                              message='Please wait, logging in...'
                />
                <View style={{paddingLeft:25,paddingRight:25}}>
                    <View style={{alignItems:'center', marginBottom:20}} >
                        <Image style={{width:150,height:152}}  source={images.logo}/>
                        {/*<Image style={{width,height}}  source={images.logo}/>*/}
                    </View>
                    <View contentContainerStyle={{justifyContent : 'center'}} style={styles.container}>

                        <View style={styles.containerInside}>

                            <View style={{alignItems:'center',marginBottom:20}} >
                                <Text style={{fontSize:22,color:'#32c5a9'}}>LOGIN</Text>
                            </View>

                            <View style={{marginBottom:15}}>
                                <View style={styles.inputContainer}>
                                    <Icon name="md-person" color="#488A5F" style={{paddingHorizontal: 5,width:'8%'}} />
                                    <TextInput style={styles.inputs}
                                               placeholder="Enter the username"
                                               returnKeyType='next'
                                               onSubmitEditing={() => this.passwordRef.focus()}
                                               autoCapitalize = 'none'
                                               underlineColorAndroid='transparent'
                                               onChangeText={(username) => this.setState({username})}/>

                                </View>
                                <ErrorText text={this.state.usernameError} />

                            </View>
                            <View style={{marginBottom:30}}>
                                <View style={styles.inputContainer}>
                                    <Icon name="md-lock" color="#488A5F" style={{paddingHorizontal: 5,width:'8%'}} />
                                    <TextInput style={styles.inputs}
                                               placeholder="Enter the password"
                                               ref={passwordRef => this.passwordRef = passwordRef}
                                               returnKeyType='done'
                                               onSubmitEditing={Keyboard.dismiss}
                                               secureTextEntry={true}
                                               underlineColorAndroid='transparent'
                                               onChangeText={(password) => this.setState({password})}/>

                                </View>
                                <ErrorText text={this.state.passwordError} />
                            </View>
                            <View style={styles.loginWrapper}>

                                <TouchableHighlight onPress={(this.login)} style={styles.loginButton}>
                                    <Text style={styles.loginText}>Login</Text>
                                </TouchableHighlight>
                                {/*<TouchableHighlight style={[styles.forgotText]}*/}
                                    {/*// onPress={() => this.props.navigation.navigate('ForgotPasswordFirst')}*/}
                                {/*>*/}
                                    {/*<Text style={{fontSize:14,color:'#9b9b9b'}}>Forgot your password?</Text>*/}
                                {/*</TouchableHighlight>*/}

                            </View>
                        </View>
                    </View>
                </View>
                </ScrollView>
            </View>
        );
    }
}
export default LoginScreen;

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:'#e8e8e8'
    },
    container: {
        width:'100%',
        backgroundColor:'#fff',
        borderRadius:10,
        elevation:2
    },
    containerInside:{
        width:'100%',
        paddingHorizontal:20,
        paddingVertical:30,
    },

    inputContainer: {
        alignItems:'center',
        flexDirection:'row',
        elevation:2,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        paddingLeft:5,
        paddingRight:5,
        borderRadius:10,
        backgroundColor:'#fff',
    },


    inputs:{
width:'92%'
    },
    inputIcon:{
        marginTop:5,
        width:40,
        height:15,
        marginLeft:15,
        alignSelf: 'flex-end'
    },
    loginWrapper: {
        alignItems:'center',
        marginBottom:10
    },
    loginButton:{
        width:'50%',
        elevation:3,
        alignItems:'center',
        paddingTop:15,
        paddingBottom:15,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:30,
        // marginBottom:20,
        backgroundColor:'#258a50',

    },

    loginText: {
        color: 'white',
    }

});
