import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    Dimensions,
    // FlatList,
    ScrollView,
    TouchableOpacity, PermissionsAndroid, TextInput, Keyboard, TouchableHighlight, AsyncStorage, Image,
} from 'react-native';

import MapView, { Marker, ProviderPropType,Polyline } from 'react-native-maps';
import Modal from "react-native-modal";
import { getDistance } from 'geolib';
import { FlatList } from 'react-native-gesture-handler'
import RNFetchBlob from 'rn-fetch-blob'
import moment from "moment";
import builder from 'xmlbuilder';
import Icon from "react-native-vector-icons/Ionicons";
import Geolocation from 'react-native-geolocation-service';
const { width, height } = Dimensions.get('window');

const LATITUDE = 27.5531469;
const LONGITUDE = 84.8721979;
const LATITUDE_DELTA = 100;
const LONGITUDE_DELTA = 100;
let id = 0;
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import ErrorText from "../commons/ErrorText";
import Url from "../constants/Url";

import ActivityIcon from "../commons/ActivityIcon";
import {images} from "../constants/images";

class DefaultMarkers extends React.Component {
    static navigationOptions  = ({ navigation }) => {
        return {
            headerRight: <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                    onPress={navigation.getParam('mapType')}
                    style={{paddingVertical: 5,paddingHorizontal: 5, marginRight: 10, flexDirection: 'row'}}>
                    <Icon name="md-map" size={24} color="#fff"/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={navigation.getParam('clearAll')}
                    style={{paddingVertical: 5,paddingHorizontal: 5, marginRight: 10, flexDirection: 'row'}}>
                    <Icon name="md-close-circle-outline" size={24} color="#fff"/>
                </TouchableOpacity>
            </View>
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({ mapType: this._mapType, clearAll:this._clearAll });

        // this.requestLocationPermission()

    }

    constructor(props) {
        super(props);
        this.state = {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            markers: [],
            polyline:[],
            selected_start:'',
            selected_end:'',
            statusBarHeight:'',
            visibleModalId: null,
            visiblenoinfoModal:null,
            message:'',
            isLoading:false,
            visibleForm:null,
            selectedMarker:'',
            selectedE:'',
            selectedIndex:'',
            mark:[],
            markAll:[],
            distance:'',
            mapType:'standard',
            finalMark:[],
            building:'',
            tax:'',
            buildinError:'',
            taxError:'',
            id:1,
            marginBottom:1
        };
    }
    _mapType = () => {
        this.setState({ mapType: this.state.mapType=='standard'?'hybrid':'standard' });
    };
    _clearAll = () => {
        this.setState({
            markers: [],
            polyline:[],
            selected_start:'',
            selected_end:'',
            selectedMarker:'',
            mark:[],
            markAll:[],
            distance:'',
            finalMark:[],
        });
    };

    onMapPress(e) {
// alert(JSON.stringify(e.nativeEvent.coordinate.latitude))
        let items = [];
        for (let product of this.state.markers) {
            let item = {latitude: product.coordinate.latitude, longitude: product.coordinate.longitude};
            items.push(item);
        }
        let new_items = {latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude}
        items.push(new_items);

        //count Distance
        let countDistance = 0;
        let initialCountDistance = 0;
        let newProjects=this.state.markers;

        if (this.state.markers.length > 0) {

            let length = this.state.markers.length;
            let count1 = this.state.markers[length - 1].coordinate;
            let count2 = e.nativeEvent.coordinate;
            // alert(JSON.stringify('1:'+JSON.stringify(count1)+'2:'+JSON.stringify(count2)));return;
            // alert('first:'+JSON.stringify(this.state.mark[0])+'all'+JSON.stringify(this.state.mark));return;
            countDistance = getDistance(
                count1,
                count2,
                accuracy = 0.01
            );

            initialCountDistance = getDistance(
                this.state.markers[0].coordinate,
                count2,
                accuracy = 0.01
            );

            newProjects = this.state.markers.map(p =>
                p.key === this.state.markers[0].key
                    ? { ...p, distance: Math.round(initialCountDistance * 100) / 100 }
                    : p
            );
            // alert(JSON.stringify(newProjects))

        }

        let newMarkers = [...newProjects,
            {
                key: id++,
                coordinate: e.nativeEvent.coordinate,
                id: this.state.id++,
                distance: Math.round(countDistance * 100) / 100
            },]


        this.setState({
                markers: newMarkers,
                polyline: items
            }
            // ,()=>this.getDistance(newMarkers)
        );
    }

    toggleModal()
    {
        this.setState({visibleModal: 'bottom'})
    }



    markerpress(e, marker, index){
        // alert(JSON.stringify(this.state.markers));
        this.toggleModal();

        this.setState({
            selectedMarker:marker,
            selectedE:e,
            selectedIndex:index
        })

    }


    // getDistance(newMarkers){
    //
    //     let items=[];
    //     for(let product of this.state.markers) {
    //         let item = {latitude:product.coordinate.latitude,longitude:product.coordinate.longitude};
    //         items.push(item);
    //     }
    //     let new_items ={latitude:e.nativeEvent.coordinate.latitude,longitude:e.nativeEvent.coordinate.longitude}
    //     items.push(new_items);
    //
    //     let newMarkers=[ ...this.state.markers,
    //         {
    //             key: id++,
    //             coordinate: e.nativeEvent.coordinate,
    //             type:0,
    //             distance:0
    //         },]
    //
    //     this.setState({
    //             markers: newMarkers,
    //             polyline: items
    //         }
    //         // ,()=>this.getDistance(newMarkers)
    //     );
    //
    //
    // }

    updateafterdrag(e, marker,index){
        // alert(this.state.markers.length-1);return;
        // alert(JSON.stringify(a));return;
        e.nativeEvent.id=marker.key;
        let countDistance=0;
        let initialcountDistance=0;
        let initialcountDistance2=0;
        let finalcountDistance=0;
        let NewfinalcountDistance=0;
        let newProjects=this.state.markers;
        // alert(JSON.stringify(this.state.markers[0]));return;
        if (this.state.markers.length >1) {



            finalcountDistance = getDistance(
                e.nativeEvent.coordinate,
                this.state.markers[0].coordinate,
                accuracy = 0.01
            );

            //second last item

            if(index===this.state.markers.length-1){
                // alert('second last');return;
                initialcountDistance = getDistance(
                    e.nativeEvent.coordinate,
                    this.state.markers[index-1].coordinate,
                    accuracy = 0.01
                );
                let initialNewProjects = this.state.markers.map(p =>
                    p.key === this.state.markers[index].key
                        ? { ...p, coordinate:e.nativeEvent.coordinate,distance:Math.round(initialcountDistance * 100) / 100 }
                        : p );
                // alert(JSON.stringify(newProjects));return;

                newProjects = initialNewProjects.map(p =>
                    p.key === this.state.markers[0].key
                        ? { ...p,distance:Math.round(finalcountDistance * 100) / 100 }
                        : p );
            }

// first item

            else if(index===0){

                initialcountDistance2 = getDistance(
                    e.nativeEvent.coordinate,
                    this.state.markers[this.state.markers.length-1].coordinate,
                    accuracy = 0.01
                );
                // alert(this.state.markers[0]);return;
                NewfinalcountDistance = getDistance(
                    e.nativeEvent.coordinate,
                    this.state.markers[1].coordinate,

                    accuracy = 0.01
                );

                let initialNewProjects = this.state.markers.map(p =>
                    p.key === this.state.markers[index].key
                        ? { ...p, coordinate:e.nativeEvent.coordinate,distance:Math.round(initialcountDistance2 * 100) / 100 }
                        : p );
                // alert(JSON.stringify(newProjects));return;

                newProjects = initialNewProjects.map(p =>
                    p.key === this.state.markers[1].key
                        ? { ...p,distance:Math.round(NewfinalcountDistance * 100) / 100 }
                        : p );
            }

// other items
            else{
                initialcountDistance = getDistance(
                    e.nativeEvent.coordinate,
                    this.state.markers[index-1].coordinate,
                    accuracy = 0.01
                );

                countDistance = getDistance(
                    e.nativeEvent.coordinate,
                    this.state.markers[index+1].coordinate,
                    accuracy = 0.01
                );
                // alert(index);return;
                let initialNewProjects = this.state.markers.map(p =>
                    p.key === this.state.markers[index].key
                        ? { ...p, coordinate:e.nativeEvent.coordinate,distance:Math.round(initialcountDistance * 100) / 100 }
                        : p );
                // alert(JSON.stringify(newProjects));return;

                newProjects = initialNewProjects.map(p =>
                    p.key === this.state.markers[index+1].key
                        ? { ...p,distance:Math.round(countDistance * 100) / 100 }
                        : p );
            }

        }
        else{
            // alert(index);return;
            newProjects = this.state.markers.map(p =>
                p.key === this.state.markers[index].key
                    ? { ...p, coordinate:e.nativeEvent.coordinate}
                    : p
            );
        }


        // alert(JSON.stringify(newProjects));

        this.setState(
            { markers: newProjects}
            ,()=> this.distanceCalculate());
    }

    requestLocationPermission= async () =>  {
        // alert('testing')

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message:
                        'BCICS-IMIS app needs access to your location',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    (position) => {

                        let initialRegion = Object.assign({}, {  latitude: position.coords.latitude,
                            longitude: position.coords.longitude,});
                        initialRegion["latitudeDelta"] = 0.005;
                        initialRegion["longitudeDelta"] = 0.005;
                       this.mapView.animateToRegion(initialRegion, 2000);


                        // alert(JSON.stringify(position.coords.latitude));return;

                        // alert(JSON.stringify(position));
                        // console.log(position);
                    },
                    (error) => {
                        // See error code charts below.
                        alert(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            } else {
                alert('Location permission denied');
            }
        } catch (err) {
            alert(err);
        }
    }


    delete(){
        let e=this.state.selectedE;
        let marker=this.state.selectedMarker;
        let index=this.state.selectedIndex;
        // alert(marker);return;

        e.nativeEvent.id=marker.key;

        let initialcountDistance=0;
        let newProjects=this.state.markers;
        // alert(JSON.stringify(this.state.markers[0]));return;
        if (this.state.markers.length > 1) {

            //last item

            if(index===this.state.markers.length-1){
                // alert('second last');return;
                initialcountDistance = getDistance(
                    this.state.markers[0].coordinate,
                    this.state.markers[index-1].coordinate,
                    accuracy = 0.01
                );
                newProjects = this.state.markers.map(p =>
                    p.key === this.state.markers[0].key
                        ? { ...p,distance:Math.round(initialcountDistance * 100) / 100 }
                        : p );
            }
// first item

            else if(index===0){

                initialcountDistance = getDistance(
                    this.state.markers[this.state.markers.length-1].coordinate,
                    this.state.markers[index+1].coordinate,
                    accuracy = 0.01
                );
                // alert(this.state.markers[0]);return;

                newProjects = this.state.markers.map(p =>
                    p.key === this.state.markers[index+1].key
                        ? { ...p,distance:Math.round(initialcountDistance * 100) / 100 }
                        : p );
                // alert(JSON.stringify(newProjects));return;
            }
// other items
            else{
                initialcountDistance = getDistance(
                    this.state.markers[index+1].coordinate,
                    this.state.markers[index-1].coordinate,
                    accuracy = 0.01
                );

                // alert(index);return;
                newProjects = this.state.markers.map(p =>
                    p.key === this.state.markers[index+1].key
                        ? { ...p,distance:Math.round(initialcountDistance * 100) / 100 }
                        : p );
                // alert(JSON.stringify(newProjects));return;

            }
        }
        else{
            // alert(index);return;
            newProjects = this.state.markers
        }

        // alert(JSON.stringify(newProjects));
        let datas = newProjects.filter(cat=>cat.key !== marker.key);
        this.setState(
            { markers: datas, visibleModal: null}
        );
    }
    mark(){
        let count = this.state.markers.filter(cat=>cat.type == 1)
        // alert(JSON.stringify(this.state.selectedMarker));return;
        if(count.length<=1){
            const newProjects = this.state.markers.map(p =>
                p.key === this.state.selectedMarker.key
                    ? { ...p, coordinate:this.state.selectedMarker.coordinate,type:1 }
                    : p
            );
            // alert(JSON.stringify(finalMark));return;
            this.setState({ markers: newProjects},()=>this.distanceCalculate());
        }
    };
    clear(){
        let datasfalse = this.state.markers.filter(cat=>cat.type == 0);
        let datas = this.state.markers.filter(cat=>cat.type == 1);

        let data=[]
        datas.map(cat => (
            data.push({key:cat.key,coordinate:cat.coordinate,type:0})
        ))
        let newData= datasfalse.concat(data)
        this.setState({ markers: newData ,  distance:'',
            mark:[]});
    };
    distanceCalculate(){
        let count = this.state.markers.filter(cat=>cat.type == 1)
        // alert(JSON.stringify(count.length));return;
        if(count.length==2){
            let count1 =count[0].coordinate;
            let count2 =count[1].coordinate;
            // alert(JSON.stringify('1:'+JSON.stringify(count1)+'2:'+JSON.stringify(count2)));return;
            // alert('first:'+JSON.stringify(this.state.mark[0])+'all'+JSON.stringify(this.state.mark));return;
            const dist = getDistance(
                count1,
                count2,
                accuracy = 0.01
            );

            let mark=[];
            mark.push(count1,count2)

            // alert(JSON.stringify(dist));return;
            return(
                this.setState({
                    distance:dist,
                    mark
                })
            )
        }
        else if(count.length==1){
            return(
                this.setState({
                    distance:'',
                    mark:[]
                })
            )
        }

    }

    renderModalContent = () => (
        <View style={styles.content}>
            <View style={{width:100,height:3,marginTop:5,backgroundColor:'#9c9c9c',borderRadius:20}}/>
            <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',alignItems:'center',padding:5}}>
                {/*<TouchableOpacity onPress={()=>this.mark()}>*/}
                {/*<Text style={[styles.contentTitle,{marginLeft:20}]}>MARK</Text>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity onPress={()=>this.clear()}>*/}
                {/*<Text style={[styles.contentTitle,{marginLeft:20}]}>CLEAR</Text>*/}
                {/*</TouchableOpacity>*/}
                <TouchableOpacity style={{alignItems:'center',backgroundColor:'#ff3b2d',borderRadius:5, width:'100%',}} onPress={()=>this.delete()}>
                    <Text style={styles.contentTitle}>REMOVE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    renderModalContent2 = () => (
        <View style={{width:'100%',alignItems:'center',height:'60%',justifyContent:'center'}}>
            <View style={[styles.content,{position:'relative',width:'95%',paddingVertical:10}]}>
                <TouchableOpacity
                    onPress={()=>this.setState({
                        visiblenoinfoModal: null
                    })}
                    style={{position:'absolute',top:4,right:7,zIndex:10,padding:3}}>
                    <Icon name="md-close" color={"#656565"} size={22}  />
                </TouchableOpacity>
                <View style={{marginBottom: 10, marginTop: 1, alignItems: 'center',width:'100%'}}>
                    <View style={{flexDirection:'row',width:'100%'}}>
                        <View style={{width:'50%',alignItems:'center'}}>
                            <Text style={{fontWeight:'bold'}}>Longitude</Text>
                        </View>
                        <View style={{width:'50%',alignItems:'center'}}>
                            <Text style={{fontWeight:'bold'}}>Latitude</Text>
                        </View>
                    </View>
                </View>
                <View style={{width:'90%',borderColor:'#d6d6d6',borderRadius:20,borderWidth:0.5,marginBottom: 10}}/>
                <FlatList
                    // ListEmptyComponent={this.renderEmptyView()}
                    data={this.state.finalMark}
                    // extraData={this.state.data}
                    keyExtractor={item => '' + item.key}
                    renderItem={({item})=> {
                        return (
                            <View
                                style={{marginBottom: 10, marginTop: 1, alignItems: 'center',width:'100%'}}
                            >
                                <View style={{flexDirection:'row',width:'100%'}}>
                                    <View style={{width:'50%',alignItems:'center'}}>
                                        <Text>{item.coordinate.longitude}</Text>
                                    </View>
                                    <View style={{width:'50%',alignItems:'center'}}>
                                        <Text>{item.coordinate.latitude}</Text>
                                    </View>
                                </View>
                            </View>
                        );
                    }}
                />
                <View style={{width:'90%',borderColor:'#d6d6d6',borderRadius:20,borderWidth:0.5,}}/>
                <TouchableOpacity
                    onPress={()=> this.setState({
                        visibleForm:'center'
                    })}
                    style={styles.headerActionButton2}>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>Save Data</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    openForm(){
        return(

            <ScrollView style={{width:'100%',height:'60%'}} contentContainerStyle={{flexGrow: 1,justifyContent : 'center'}}>
                <View style={{alignItems:'center'}}>
                <View style={[styles.content,{position:'relative',width:'95%',paddingVertical:10}]}>
                    <TouchableOpacity
                        onPress={()=>this.setState({
                            visibleForm: null
                        })}
                        style={{position:'absolute',top:4,right:7,zIndex:10,padding:3}}>
                        <Icon name="md-close" color={"#656565"} size={22}  />
                    </TouchableOpacity>
                    <View style={{marginBottom: 10, marginTop: 1, alignItems: 'center',width:'100%'}}>
                        <View style={{flexDirection:'row',width:'100%'}}>
                            <View style={{width:'100%',alignItems:'center'}}>
                                <Text style={{fontWeight:'bold'}}>Save Data</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{width:'90%',borderColor:'#d6d6d6',borderRadius:20,borderWidth:0.5,marginBottom: 15}}/>
                    <View style={{marginBottom:15}}>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="Building Identification Number"
                                       returnKeyType='next'
                                       onSubmitEditing={() => this.tax.focus()}
                                       autoCapitalize = 'none'
                                       underlineColorAndroid='transparent'
                                       onChangeText={(building) => this.setState({building})}/>
                        </View>
                        <ErrorText text={this.state.buildingError} />
                    </View>
                    <View style={{marginBottom:30}}>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="Tax Code"
                                       ref={tax => this.tax = tax}
                                       returnKeyType='done'
                                       onSubmitEditing={Keyboard.dismiss}
                                // secureTextEntry={true}
                                       autoCapitalize = 'none'
                                       underlineColorAndroid='transparent'
                                       onChangeText={(tax) => this.setState({tax})}/>
                        </View>
                        <ErrorText text={this.state.taxError} />
                    </View>
                    <TouchableOpacity
                        onPress={this.saveData}
                        style={styles.headerActionButton2}>
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>Save Data</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </ScrollView>


        )
    }
    saveData = () => {
        // alert(Url.baseUrl);return;
        let building = this.state.building;
        let tax = this.state.tax;
        let buildingError = '';
        let taxError = '';

        if(building==""){
            buildingError = 'Please enter the building identification number';
        }

        if(tax==""){
            taxError = 'Please enter the tax code';
        }

        this.setState({
            buildingError: buildingError,
            taxError: taxError
        });

        if(buildingError ||  taxError) {
            return;
        }

        this.showLoader();
        this.requestStoragePermission(building,tax)

    };
    saveToAsyncStorage = async (building,tax,path) => {
        const asyncData = await AsyncStorage.getItem('building_data');
        let data=[];

        const date = moment().format();
        let h= moment(date).format('HH');
        let milli_timestamp= moment(date).format('x');
        let s= moment(date).format('ss');
        let ss= moment(date).format('SSS');
        let m= moment(date).format('mm');

        let id=(''+h+s+ss+m+milli_timestamp)
        let building_data={_id:id,building,tax,created_date:date,location:path};

        if(asyncData){
            let a = JSON.parse(asyncData)
            data = a;
            // alert(JSON.stringify(data));return;
        }
        data.push(building_data)
        await AsyncStorage.multiSet([
            ['building_data',JSON.stringify(data)],
        ]);

        this.setState({
            visiblenoinfoModal:null,
            visibleForm:null,
            markers:[],
            message:'File saved'
        },()=> setTimeout(()=>{
                this.setState({message: ''})
            }, 5000
        ))


        this.hideLoader();
    };

    requestStoragePermission= async (building,tax) =>  {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission',
                    message:
                        'BCICS-IMIS app needs access to your storage',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.load(building,tax)
            } else {
                alert('Storage permission denied');
            }
        } catch (err) {
            alert(err);
        }
    }
    load= async (building,tax) => {
        let coordsData=[]
        this.state.finalMark.map((item, key) =>
            coordsData.push(item.coordinate.longitude + ',' + item.coordinate.latitude)
        );
        // alert(JSON.stringify(coordsData));return;

        let xml = builder.create('kml',{encoding: 'utf-8',standalone:'yes'})
            .att('xmlns', 'http://www.opengis.net/kml/2.2')
            .ele('Document')
            .ele('Placemark')
            .ele('name', building).up()
            .ele('Polygon')
            .ele('outerBoundaryIs')
            .ele('LinearRing')
            .ele('tessellate', '1').up()
            .ele('coordinates', coordsData.join(' ')).up()
            .end({ pretty: true});

        // alert(xml);return;
        const dirs = RNFetchBlob.fs.dirs
        let path = `${dirs.DownloadDir}/`+this.state.building+`_`+this.state.tax+`.kml`
        RNFetchBlob
            .fs.writeFile(path,xml)
            .then((res) => {
                this.saveToAsyncStorage(building,tax,path);

            })

        // alert(asyncData)

    }
    showLoader = () => {
        this.setState({ isLoading: true });
    };
    hideLoader = () => {
        this.setState({ isLoading: false });
    };
    topBox(){
        if(this.state.distance){
            return(
                <View style={styles.buttonContainer}>
                    <View
                        // onPress={() => this.setState({selected_start:'' })}
                        style={styles.bubble}
                    >
                        <Text>Distance : {this.state.distance} m</Text>
                    </View>
                </View>
            )
        }
    }
    regionChange(e){
        // alert(JSON.stringify(e));return;
        return(
            this.setState({
                latitude: e.latitude,
                longitude: e.longitude,
                latitudeDelta: e.latitudeDelta,
                longitudeDelta: e.longitudeDelta,
            })
        )
    }
    finalMarkers(){
        this.setState({
            finalMark:this.state.markers,
        })
    }
    bottominfo(){
        if(this.state.finalMark.length<1) {
            return(
                <View style={[styles.headerActionButton,{ backgroundColor:'#9e9e9e',}]}>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>No Information</Text>
                </View>
            )
        }
        else{
            return(
                <TouchableOpacity
                    onPress={()=> this.setState({
                        visiblenoinfoModal:'center'
                    })}
                    style={[styles.headerActionButton,{ backgroundColor:'#67ae52',}]}>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>View Data</Text>
                </TouchableOpacity>
            )
        }
    }
    getPolyline(){
        let items=[];

        for(let product of this.state.markers) {
            let item = {latitude:product.coordinate.latitude,longitude:product.coordinate.longitude};
            items.push(item);
        }

        return items

    }
    rnPolygon(){
        if(this.state.markers.length>1){
            return(
                <MapView.Polygon
                    coordinates={this.getPolyline()}
                    strokeColor="#ff1f00" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeWidth={1}
                    fillColor="rgba(45,87,250,0.07)"
                />
            )
        }

    }

    goToInitialRegion() {
        let initialRegion = Object.assign({}, { latitude: 37.78825,
            longitude: -122.4324,});
        initialRegion["latitudeDelta"] = 0.005;
        initialRegion["longitudeDelta"] = 0.005;
        this.mapView.animateToRegion(initialRegion, 2000);
    }
    message(){
        if(this.state.message){
            return(<Text style={{marginTop:10,backgroundColor:'#8b8b8b',color:'#ffffff',padding:10,borderRadius:20,fontSize:16}}>{this.state.message}</Text>)
        }
    }
    gotToMyLocation(){
        // console.log('gotToMyLocation is called')
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                console.log("curent location: ", coords)
                console.log(this.map);
                if (this.map) {
                    console.log("curent location: ", coords)
                    this.map.animateToRegion({
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    })
                }
            },
            (error) => alert('Error: Are location services on?'),
            { enableHighAccuracy: true }
        )
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <ActivityIcon visible={this.state.isLoading}
                                  indicatorColor={'#333333'}
                                  messageColor={'#afafaf'}
                                  message='Please wait, saving data...'
                    />
                    <Modal
                        isVisible={this.state.visibleModal === 'bottom'}
                        onBackdropPress={() => this.setState({ visibleModal: null })}
                        onSwipeComplete={() => this.setState({ visibleModal: null })}
                        swipeDirection={['up', 'left', 'right', 'down']}
                        style={styles.bottomModal}
                    >
                        {this.renderModalContent()}
                    </Modal>
                    <Modal
                        isVisible={this.state.visiblenoinfoModal === 'center'}
                        onBackdropPress={() => this.setState({ visiblenoinfoModal: null })}
                        onSwipeComplete={() => this.setState({ visiblenoinfoModal: null })}
                        // swipeDirection={['up', 'left', 'right', 'down']}
                        style={styles.bottomModal2}
                    >
                        {this.renderModalContent2()}
                    </Modal>
                    <Modal
                        isVisible={this.state.visibleForm === 'center'}
                        onBackdropPress={() => this.setState({ visibleForm: null })}
                        onSwipeComplete={() => this.setState({ visibleForm: null })}
                        // swipeDirection={['up', 'left', 'right', 'down']}
                        style={styles.bottomModal2}
                    >
                        {this.openForm()}
                    </Modal>
                    <TouchableOpacity
                    onPress={this.requestLocationPermission.bind(this)}
                    style={{position:'absolute',top:15,right:15,zIndex:10,backgroundColor:'#fff',borderRadius:45,width:45,height:45,justifyContent:'center',alignItems:'center',elevation:3}}>
                    <Icon name="md-locate" color={"#656565"} size={22}  />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=>this.state.markers.length>0?this.finalMarkers():this.setState({
                            message:'Place a marker first'
                        },()=> setTimeout(()=>{
                                this.setState({message: ''})
                            }, 5000
                        ))}
                        style={{position:'absolute',bottom:15,right:15,zIndex:10,backgroundColor:this.state.markers.length>0?'#67ae52':'#9e9e9e',borderRadius:45,width:45,height:45,justifyContent:'center',alignItems:'center',elevation:3}}>
                        <Icon name="md-checkmark-circle-outline" color={"#fff"} size={22}  />
                    </TouchableOpacity>
                    <MapView
                        provider={this.props.provider}
                        style={[styles.map,{marginBottom:this.state.marginBottom}]}
                        showsUserLocation={true}
                        showsMyLocationButton={false}
                        followsUserLocation
                        mapType={this.state.mapType}
                        zoomEnabled={true}
                        ref={ref => (this.mapView = ref)}
                        // onRegionChange={e => this.regionChange(e)}
                        initialRegion={{
                            latitude:+this.state.latitude,
                            longitude: +this.state.longitude,
                            latitudeDelta: this.state.latitudeDelta,
                            longitudeDelta: this.state.longitudeDelta,
                        }}
                        onMapReady={this.requestLocationPermission.bind(this)}
                        // region={{
                        //     latitude: +this.state.latitude,
                        //     longitude: +this.state.longitude,
                        //     latitudeDelta: this.state.latitudeDelta,
                        //     longitudeDelta: this.state.longitudeDelta,
                        // }}
                        loadingEnabled={true}
                        onPress={e => this.onMapPress(e)}
                    >
                        {this.state.markers.map((marker, index) => (
                            <Marker
                                onPress={(e) =>this.markerpress(e,marker,index)}
                                onDragEnd={(e) =>this.updateafterdrag(e,marker,index)}
                                key={marker.key}
                                coordinate={marker.coordinate}
                                // pinColor={marker.color}
                                draggable
                                style={{alignItems:'center',justifyContent:'flex-end'}}
                            >
                                <Text style={{fontSize:10,color:this.state.mapType=='standard'?'#000':'#fff',fontWeight:'bold',}}>{marker.distance==0?null:marker.distance}</Text>
                                <Text style={{position:'absolute',top:22,elevation:12,fontSize:8,backgroundColor:'#fff',borderRadius:5,width:10,height:10,textAlign:'center',fontWeight:'bold'}}>{index  + 1}</Text>
                                <Icon name="md-pin" color={"#ff3b2d"} size={30}  />
                            </Marker>
                        ))}
                        {
                            this.rnPolygon()
                        }

                    </MapView>
                    {this.message()}

                    {this.topBox()}
                </View>
                <View style={{ height:'10%',width:'100%',backgroundColor:'#fff'}}>
                    {
                        this.bottominfo()
                    }
                </View>
            </View>
        );
    }
}

DefaultMarkers.propTypes = {
    provider: ProviderPropType,
};

const styles = StyleSheet.create({
    container: {
        // ...StyleSheet.absoluteFillObject,
        // justifyContent: 'flex-end',
        height:'90%',
        alignItems: 'center',
        paddingBottom:1
        // position:'relative'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        // margin:1

    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    bottomModal2: {
        justifyContent: 'center',
        margin: 0,
    },
    bubble: {
        alignItems:'center',
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    content: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {

        fontSize: 16,
        padding:10,
        color:'#efefef',
        fontWeight:'bold'
    },
    headerContainer: {
        height: 60,
        backgroundColor:'#ffffff',
        borderTopLeftRadius:5,
        borderTopRightRadius:5
    },
    headerTopBorder: {
        position: 'absolute',
        bottom:0,
        opacity: 0.5,
        height: 0.25,
    },
    headerActionButton: {
        alignItems: 'center',
        justifyContent:'center',
        flex:1,

        borderRadius:5,
        // width: '100%',
        margin: 4
    },
    headerActionButton2: {
        alignItems: 'center',
        justifyContent:'center',
        padding:10,
        marginTop:10,
        backgroundColor:'#67ae52',
        borderRadius:5,
        width: '90%',
        margin: 4
    },
    inputs:{
        width:'92%'
    },
    inputContainer: {
        alignItems:'center',
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#b4b4b4',
        paddingLeft:5,
        paddingRight:5,
        borderRadius:10,
        backgroundColor:'#fff',
    },
});

export default DefaultMarkers;