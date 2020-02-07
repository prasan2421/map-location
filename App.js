import React from 'react';
import { ActivityIndicator,View,Text} from 'react-native';

import Navigation from './src/screens/index';
// import { images} from './src/constants/images'


export default class App extends React.Component {
    state ={
        isReady: false
    };

    componentDidMount(){
        this.cacheAssets()
    }

    cacheAssets = async () => {
        // const imageAssets = cacheImages(Object.values(images));
        // await Promise.all([...imageAssets]);
        this.setState({isReady:true});
    };

    render() {
        if(!this.state.isReady){
            return(
                <View style={{flex:1, alignItems:'center', backgroundColor:'#fff'}}>
                    {/*<Text>Test1</Text>*/}
                    <ActivityIndicator size="large"/>
                </View>
            );
        }
        return (
            <View style={{flex:1}}>
                <Navigation/>
                {/*<Text>Test2</Text>*/}
            </View>
        );
    }
}

