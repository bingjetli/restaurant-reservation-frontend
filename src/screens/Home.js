import { useFocusEffect } from '@react-navigation/native';
import { addDays, subDays } from 'date-fns';
import React, { useCallback, useState } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddIcon from '../../assets/icons/add.png';
import VuLogo from '../../assets/vu_logo.png';
import CollapsibleDatePicker from '../CollapsibleDatePicker';
import { appColors, appSizes } from '../common';
import ReservationViewer from '../ReservationViewer';

const ss = StyleSheet.create({
    mainView:{
        flex:1, //take up as much space as possible
        backgroundColor:appColors.iosSystemGray6.light,
    },
    headerView:{
        backgroundColor:appColors.iosSystemWhite.light,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    headerLogo:{
        width:60,
        height:60,
        resizeMode:'contain',

        marginVertical:10,
        marginLeft:10,
    },
    headerLogoView:{
        flexDirection:'row',
        alignItems:'center',
    },
    headerLogoText:{
        fontFamily:'YesevaOne-Regular',
        fontSize:appSizes.large.title3,
        paddingBottom:2,
        color:appColors.mainText,
    },
    addReservationPressable:{
        flexDirection:'row',
        alignItems:'center',
        minHeight:50,
        minWidth:50,
        paddingHorizontal:10,
    },
    addReservationIcon:{
        width:30,
        height:30,
        tintColor:appColors.main,
    },
    addReservationText:{
        color:appColors.main,
        fontSize:appSizes.large.body,
    },
});

export default function({route, navigation}){
    //state
    const [s_viewer_date, setViewerDateState] = useState(new Date());
    const [s_show_picker, setShowPickerState] = useState(false);

    //side-effects
    useFocusEffect(useCallback(() => {
        //refresh the screen to the current date
        setViewerDateState(new Date());
    },[]));

    //event-handlers
    function addReservation(){
        navigation.navigate('create-welcome');
    }

    function handleViewerSwipeLeft(){
        setViewerDateState(addDays(s_viewer_date, 1));
        //console.log('swipe left');
    }

    function handleViewerSwipeRight(){
        setViewerDateState(subDays(s_viewer_date, 1));
        //console.log('swiple right');
    }

    function handleTogglePicker(state){
        if(state !== undefined){
            setShowPickerState(state);
        }
        else{
            setShowPickerState(!s_show_picker);
        }
    }

    return(
        <SafeAreaView style={ss.mainView}>
            <View style={ss.headerView}>
                <View style={ss.headerLogoView} >
                    <Image style={ss.headerLogo} source={VuLogo} />
                    <Text style={ss.headerLogoText} >Restaurant</Text>
                </View>
                <TouchableHighlight 
                    style={ss.addReservationPressable} 
                    activeOpacity={0.6}
                    underlayColor={appColors.iosSystemGray5.light}
                    onPress={addReservation} >
                    <>
                        <Text style={ss.addReservationText} >Add Reservation</Text>
                        <Image style={ss.addReservationIcon} source={AddIcon} />
                    </>
                </TouchableHighlight>
            </View>
            <CollapsibleDatePicker 
                date={s_viewer_date} 
                onSelect={setViewerDateState}
                showPicker={s_show_picker}
                onTogglePicker={handleTogglePicker} />
            <ReservationViewer 
                date={s_viewer_date} 
                onSwipeLeft={handleViewerSwipeLeft}
                onSwipeRight={handleViewerSwipeRight}
                onPress={() => setShowPickerState(false)}
                fetchCounter={route.params.fetchCounter}/>
        </SafeAreaView>
    );
}