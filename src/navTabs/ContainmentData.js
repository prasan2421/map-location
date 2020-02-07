import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    AsyncStorage,
    Button,
    TextInput,
    Alert,
    Picker,
    StyleSheet,
    Modal,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    TouchableHighlight,
    Dimensions,
    Image,
    ActivityIndicator, Keyboard, StatusBar, Linking, PermissionsAndroid
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
import {images} from "../constants/images";
import moment from "moment";
import Url from "../constants/Url";
import ActivityIcon from "../commons/ActivityIcon";
import RNFetchBlob from "rn-fetch-blob";


class New extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing:false,
            showEmptyView: false,
            modalVisible: false,
            data:[],
            isLoading:false

        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        const asyncBuildingData = await AsyncStorage.getItem('containment_data');
        if(asyncBuildingData) {
            try {
                let cart = JSON.parse(asyncBuildingData);
                // alert(JSON.stringify(cart))
                this.setState({
                    showEmptyView: true,
                    data:cart
                })
            }
            catch(e) {
                alert('Error: '+e)
            }
        }
        else{
            this.setState({
                showEmptyView: true,

            })
        }
    };

    renderEmptyView() {
        if(this.state.showEmptyView) {
            return (
                <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:100}}>
                    <Image style={{width:150,height:152}}  source={images.empty}/>
                    <Text style={{fontSize:24}}>No Data..</Text>
                </View>
            )
        }
        else {
            return<ActivityIndicator size="small" color="#353535" />;
        }
    }

    cross=(id)=>{
        Alert.alert(
            'Confirm',
            'Do you want to remove this item from the list ?',
            [
                {text: 'OK', onPress: ()=>this.removeItem(id)},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
        )
    };

    confirmSave=(id)=>{
        Alert.alert(
            'Confirm',
            'Do you want to upload this item ?',
            [
                {text: 'OK', onPress: ()=>this.save(id)},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
        )
    };

    removeItem = async (id) =>{
        const asyncBuildingData = await AsyncStorage.getItem('containment_data');
        if(asyncBuildingData) {
            try {
                let cart = this.state.data.filter(cat=>cat._id !== id);
                this.setState({
                    showEmptyView: true,
                    data:cart
                })
                await AsyncStorage.multiSet([
                    ['containment_data',JSON.stringify(cart)],
                ]);
            }
            catch(e) {
                alert('Error: '+e)
            }
        }
        else{
            this.setState({
                showEmptyView: true,
            })
        }
    }
    removeItem = async (id) =>{
        const asyncBuildingData = await AsyncStorage.getItem('containment_data');
        if(asyncBuildingData) {
            try {
                let cart = this.state.data.filter(cat=>cat._id !== id);
                this.setState({
                    showEmptyView: true,
                    data:cart
                })
                await AsyncStorage.multiSet([
                    ['containment_data',JSON.stringify(cart)],
                ]);
            }
            catch(e) {
                alert('Error: '+e)
            }
        }
        else{
            this.setState({
                showEmptyView: true,
            })
        }
    }
    showLoader = () => {
        this.setState({ isLoading: true });
    };
    hideLoader = () => {
        this.setState({ isLoading: false });
    };



    save = async (item) =>{
        const asyncToken = await AsyncStorage.getItem('access_token');
        let itemData=[{containcd:item.building,longitude:item.coords[0].longitude,latitude:item.coords[0].latitude,collected_date:item.created_date}]

        // alert(Url.baseUrl+'/upload-building-kml');return;
        this.showLoader();
        const data = new FormData();
        data.append('json', JSON.stringify(itemData));

        fetch(Url.baseUrl+'/save-containment',{
            method: 'POST',
            headers:{
                'Authorization': 'Bearer '+ asyncToken,
                'Accept':'application/json',
            },
            body: data,
        })
            .then((response) => {
                this.hideLoader();
                // console.log(response);
                if (response.ok) {
                    this.removeItem(item._id)
                    Alert.alert('Success','Data saved successfully !!')
                }
                else{
                    alert(JSON.stringify(response))
                }
            })
            .catch((error) => {
                this.hideLoader();
                alert(error);
            })
            .done();

    }

    approvalList(){
        return(
            <FlatList
                ListEmptyComponent={this.renderEmptyView()}
                data={this.state.data}
                // extraData={this.state.data}
                keyExtractor={item => '' + item._id}
                renderItem={({item})=> {
                    return (
                        <View
                            style={{ marginTop: 10,marginBottom:2, alignItems: 'center',}}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '95%',
                                    backgroundColor:'#ffffff',
                                    elevation: 1,
                                    // alignItems:'space-between',
                                    padding: 10,
                                    borderRadius: 5
                                }}
                            >
                                <View style={{position:'relative',justifyContent:'space-between',flexDirection:'row',width:'100%',alignItems:'center'}}>
                                    <View style={{width:'100%'}}>
                                        <View style={[styles.box2,{paddingBottom:4}]}>
                                            <Text style={[styles.text,{fontWeight: 'bold'}]}>Containment Code: </Text>
                                            <Text style={styles.text}>{item.building}</Text>
                                        </View>

                                        <View style={[styles.box,styles.box2,{padding:4}]}>
                                            <Text style={[styles.text,{fontWeight: 'bold'}]}>Created On: </Text>
                                            <Text style={styles.text}>{moment(item.created_date).format('DD-MM-YYYY, h:mm:ss a')}</Text>
                                        </View>
                                        <View style={{paddingTop:4}}>
                                            <Text style={[styles.text,{fontWeight: 'bold'}]}>Coordinates: </Text>
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={[styles.text,{width:'80%'}]}>{item.coords[0].latitude},{item.coords[0].longitude}</Text>
                                                <View style={{width:'20%',alignItems:'flex-end',justifyContent:'flex-end'}}>
                                                    <TouchableOpacity
                                                        onPress={()=>this.confirmSave(item)}
                                                        style={{backgroundColor:'#258a50',borderRadius:5}}
                                                    >
                                                        <Text style={{color:'#fff',paddingVertical:5,paddingHorizontal:10}}>Upload</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        onPress={()=>this.cross(item._id)}
                                        style={{position:'absolute',top:0,right:0}}>
                                        <Icon name="md-close-circle" size={22} color="red"/>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    );
                }}
            />
        )

    }

    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={()=>this.getData()}
                    />
                }
                style={{backgroundColor:'#ebeef3'}}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor='#258a50'
                />
                <ActivityIcon visible={this.state.isLoading}
                              indicatorColor={'#333333'}
                              messageColor={'#afafaf'}
                              message='Please wait, Saving data...'
                />
                <View style={{width:'100%'}}>
                    {this.approvalList()}
                </View>
            </ScrollView>
        );
    }
}


export default New;
const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 5,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonWrapper: {

        marginTop:30,
        alignItems:'center',
    },

    text:{
        color:'#717171',
        fontSize: 17
    },
    box:{
        flexDirection:'row',
        width:'100%'
    },
    box2:{
        borderBottomColor:'#e2e2e2',
        borderBottomWidth:1.3,
    }

});
