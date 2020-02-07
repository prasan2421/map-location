import React from 'react';

import { View, Text ,Alert} from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/Ionicons'
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
class App extends React.PureComponent {
    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };
    about=()=>{
        this._menu.hide();
        this.props.navigation.navigate('About')
    }

    showMenu = () => {
        this._menu.show();
    };
    logout=()=>{
        Alert.alert(
            'Confirm',
            'Do you want to Logout from this account ?',
            [
                {text: 'OK', onPress: ()=>this._signOutAsync()},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
        )
    };
    _signOutAsync= async () =>{
        this._menu.hide();
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Menu
                    animationDuration={150}
                    ref={this.setMenuRef}
                    button={<View style={{marginRight:10}}><Icon onPress={this.showMenu} name="md-more" size={24} color="#fff" style={{padding:10}}/></View>}
                >
                    <MenuItem onPress={this.about}>About</MenuItem>

                    <MenuDivider />
                    <MenuItem onPress={this.logout}>Logout</MenuItem>
                </Menu>
            </View>
        );
    }
}

export default withNavigation(App);