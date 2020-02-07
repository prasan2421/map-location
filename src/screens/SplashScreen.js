import React, { Component} from 'react';
import {AsyncComponent,AsyncStorage, Alert,View} from 'react-native';

import {Image} from 'react-native';
import {images} from '../constants/images';
import OnboardingLogo from '../commons/OnboardingLogo';



class SplashScreen extends Component{
    state = { };
    /*_retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                // We have data!!
                this.props.navigation.navigate('navTabs');
            }
            else{
                this.props.navigation.navigate('Auth');s
            }
        } catch (error) {
            // Error retrieving data
        }
    };*/

    componentDidMount(){
        this.checkAuth()
    }
    checkAuth = () => {
        setTimeout(() => {
         // this._retrieveData()
            AsyncStorage.getItem('role')
                .then((value)=>{
                    if (value == 'bride') {
                        // We have data!!
                        // alert('hghgh');
                        this.props.navigation.navigate('navTabs');
                    }

                    else{

                        this.props.navigation.navigate('Auth');
                    }
                })
        },2000);

    };
    render(){
        return(
<View style={{flex:1,justifyContent:'center',backgroundColor:'#32c5a9'}}>
   <OnboardingLogo/>

</View>

        );
    }
}
export default SplashScreen;