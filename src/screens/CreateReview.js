import Axios from 'axios';
import { format, parseISO } from 'date-fns';
import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../assets/icons/arrow_back_ios.png';
import { appSizes, appColors, getTimeString, parse24HourTimeString } from '../common';
import getEnv from '../env';
import TagViewer from '../TagViewer';

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
    footerView:{
    },
    footerNextPressable:{
        backgroundColor:appColors.main,
        margin:10,
        minHeight:50,
        justifyContent:'center',
    },
    footerNextText:{
        textAlign:'center',
        fontSize:appSizes.large.body,
        color:appColors.iosSystemWhite.light,
    },
    footerBackPressable:{
        minHeight:50,
        justifyContent:'center',
        marginHorizontal:10,
        marginBottom:10,
    },
    footerBackText:{
        textAlign:'center',
        fontSize:appSizes.large.body,
        color:appColors.main,
    },
});

export default function({route, navigation}){
    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }

    function createReservation(){
        const url = getEnv().API_URL + '/reservations';

        const headers = {};
        headers[getEnv().API_KEY_HEADER_NAME] = getEnv().API_KEY;

        Axios.post(url, route.params, {headers:headers}).then(response => {
            console.log(response.data.result);

            //close the new reservation form if successfully posted
            if(response.data.result === 'successful'){
                navigation.popToTop();

                Alert.alert('Reservation Created!', 'Reservation created successfully!', [{text:'OK'}]);
            }

            else if(response.data.result === 'found_duplicates'){
                //notify the client that there may already be exising records with the same details if found
                const params = {
                    reservation:response.data.reservation,
                    existingReservations:response.data.existingReservations,
                    payload:{...route.params},
                };

                navigation.navigate({
                    name:'create-found-duplicates',
                    params:params,
                    merge:true,
                });
            }
            else if(r.data.result === 'error_occured'){
                Alert.alert('Error Occured!', r.data.message, [{'text':'OK'}]);
            }
        });
    }
    
    function goToPreviousScreen(){
        navigation.pop();
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
        <View style={ss.bodyView}>
            <Text style={ss.bodyTitleText} >Review</Text>
            <Text style={ss.bodyText} >Reserve a table of <Text style={ss.bodyEmphasisText}>{route.params.seats}</Text> for <Text style={ss.bodyEmphasisText}>{route.params.firstName} {route.params.lastName}</Text> on <Text style={ss.bodyEmphasisText}>{format(parseISO(route.params.date), 'PPPP')}</Text> at <Text style={ss.bodyEmphasisText}>{getTimeString(parse24HourTimeString(route.params.time), true)}</Text>?</Text>
            {route.params.tags.length > 0 && <TagViewer tags={route.params.tags} centered={true} />}
            {route.params.notes && <Text style={ss.bodyText}>" {route.params.notes} "</Text>}
        </View>
        <View style={ss.footerView}>
            <TouchableHighlight 
                style={ss.footerNextPressable} 
                activeOpacity={0.6}
                underlayColor={appColors.mainComplementary1}
                onPress={createReservation}>
                <Text style={ss.footerNextText}>Create</Text>
            </TouchableHighlight>
            <TouchableHighlight 
                style={ss.footerBackPressable} 
                activeOpacity={0.6}
                underlayColor={appColors.iosSystemGray5.light}
                onPress={goToPreviousScreen}>
                <Text style={ss.footerBackText}>Go Back</Text>
            </TouchableHighlight>
        </View>
    </SafeAreaView>);
}