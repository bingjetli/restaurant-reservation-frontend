import { format, parseISO } from 'date-fns';
import React, { useState } from 'react';
import { Pressable, Image, StyleSheet, Text, View, ScrollView, TouchableHighlight, Alert } from 'react-native';
import { appColors, appSizes } from '../common';
import getEnv from '../env';
import Axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReservationAlternate from '../ReservationAlternate';
import ArrowBackIosIcon from '../../assets/icons/arrow_back_ios.png';


const ss = StyleSheet.create({
    mainView:{
        flex:1, //take up as much space as possible
        backgroundColor:appColors.iosSystemWhite.light,
    },
    headerView:{
        backgroundColor:appColors.iosSystemWhite.light,
        flexDirection:'row',
        alignItems:'center',
    },
    headerText:{
        color:appColors.mainText,
        fontSize:appSizes.large.title3,
        fontWeight:'bold',
        flex:2,
        textAlignVertical:'center',
        textAlign:'center',
    },
    headerBackPressable:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        minHeight:50,
    },
    headerBackText:{
        color:appColors.main,
        fontWeight:'bold',
        fontSize:appSizes.large.title3,
        marginRight:10,
    },
    headerBackIcon:{
        height:25,
        width:25,
        marginLeft:10,
        tintColor:appColors.main,
    },
    bodyView:{
        flex:1,
    },
    bodyContent:{
        alignItems:'center',
        justifyContent:'center',
    },
    bodyText:{
        color:appColors.iosSystemGray.light,
        textAlign:'center',
        fontSize:appSizes.large.body,
        margin:10,
        maxWidth:400,
    },
    bodyTitleText:{
        color:appColors.mainText,
        fontSize:appSizes.large.title1,
        fontWeight:'bold',
        textAlign:'center',
        margin:10,
    },
    bodyEmphasisText:{
        color:appColors.iosSystemGray.light,
        textAlign:'center',
        fontSize:appSizes.large.title3,
        fontWeight:'bold',
        lineHeight:30,
        marginHorizontal:10,
        marginVertical:5,
    },
    bodyReservationsView:{
        marginTop:10,
        flex:1,
    },
    footerView:{
    },
    footerMainPressable:{
        backgroundColor:appColors.main,
        margin:10,
        minHeight:50,
        justifyContent:'center',
    },
    footerMainDisabledPressable:{
        backgroundColor:appColors.iosSystemGray.light,
        margin:10,
        minHeight:50,
        justifyContent:'center',
    },
    footerMainText:{
        textAlign:'center',
        fontSize:appSizes.large.body,
        color:appColors.iosSystemWhite.light,
    },
    footerSecondaryPressable:{
        minHeight:50,
        justifyContent:'center',
        marginHorizontal:10,
        marginBottom:10,
    },
    footerSecondaryText:{
        textAlign:'center',
        fontSize:appSizes.large.body,
        color:appColors.main,
    },
});

export default function({route, navigation}){

    //state
    const [s_selected, setSelectedState] = useState('');

    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }

    function replaceReservation(){
        //perform the update request on the backend
        const url = getEnv().API_URL + '/reservations';

        const headers = {};
        headers[getEnv().API_KEY_HEADER_NAME] = getEnv().API_KEY;

        const payload = {...route.params.payload}
        payload.id = s_selected;

        Axios.put(url, payload, {headers:headers}).then(r => {
            if(r.data.result === 'successful'){
                navigation.popToTop();

                Alert.alert('Reservation Replaced!', 'Reservation replaced successfully!', [{text:'OK'}]);
            }
            else if(r.data.result === 'error_occured'){
                Alert.alert('Error Occured!', r.data.message, [{'text':'OK'}]);
            }
        });
    }

    function continueAnyway(){
        //perform the update request on the backend
        const url = getEnv().API_URL + '/reservations';

        const headers = {};
        headers[getEnv().API_KEY_HEADER_NAME] = getEnv().API_KEY;

        const payload = {...route.params.payload}
        payload.ignoreDuplicates = true;

        Axios.post(url, payload, {headers:headers}).then(r => {
            if(r.data.result === 'successful'){
                navigation.popToTop();

                Alert.alert('Reservation Created!', 'Reservation created successfully!', [{text:'OK'}]);
            }
            else if(r.data.result === 'error_occured'){
                Alert.alert('Error Occured!', r.data.message, [{'text':'OK'}]);
            }
        });
    }

    return (<SafeAreaView style={ss.mainView}>
        <View style={ss.headerView}>
            <TouchableHighlight 
                style={ss.headerBackPressable} 
                activeOpacity={0.6}
                underlayColor={appColors.iosSystemGray5.light}
                onPress={returnToHomeScreen} >
                <>
                    <Image style={ss.headerBackIcon} source={ArrowBackIosIcon} />
                    <Text style={ss.headerBackText} >Cancel</Text>
                </>
            </TouchableHighlight>
            <Text style={ss.headerText}>Add Reservation</Text>
            <View style={{flex:1}}></View>
        </View>
        <ScrollView style={ss.bodyView} contentContainerStyle={ss.bodyContent}>
            <Text style={ss.bodyTitleText} >Found Duplicates</Text>
            <Text style={ss.bodyText} >It seems that there are already Existing Reservations for this date with either the same Phone Number or Full Name.</Text>
            <Text style={ss.bodyText} >Pick an existing Reservation to replace or continue anyway.</Text>
            <View style={ss.bodyReservationsView}>
                {route.params.existingReservations.map((reservation, reservation_i) => <ReservationAlternate 
                    item={reservation} 
                    key={reservation._id} 
                    selected={s_selected}
                    onSelect={setSelectedState}
                    getTagColor={() => appColors.iosSystemGray.light} />)}
            </View>
        </ScrollView>
        <View style={ss.footerView}>
            <TouchableHighlight 
                style={s_selected === '' ? ss.footerMainDisabledPressable : ss.footerMainPressable} 
                activeOpacity={0.6}
                underlayColor={appColors.mainComplementary1}
                onPress={replaceReservation}>
                <Text style={ss.footerMainText}>Replace</Text>
            </TouchableHighlight>
            <TouchableHighlight 
                style={ss.footerSecondaryPressable} 
                activeOpacity={0.6}
                underlayColor={appColors.iosSystemGray5.light}
                onPress={continueAnyway}>
                <Text style={ss.footerSecondaryText}>Continue Anyway</Text>
            </TouchableHighlight>
        </View>
    </SafeAreaView>);
}

// 