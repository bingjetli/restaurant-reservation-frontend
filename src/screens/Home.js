import { useFocusEffect } from '@react-navigation/native';
import { addDays, format, subDays } from 'date-fns';
import React, { useCallback, useState } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddIcon from '../../assets/icons/add.png';
import SettingsIcon from '../../assets/icons/settings.png';
import VuLogo from '../../assets/vu_logo.png';
import CollapsibleDatePicker3 from '../CollapsibleDatePicker3';
import { appColors, appSizes } from '../common';
import ReservationViewer from '../ReservationViewer';
import date_picker_styles from '../styles/date_picker_styles';
import global_styles from '../styles/global_styles';
import home_styles from '../styles/home_styles';

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
    const {width} = useWindowDimensions();

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
    }

    function handleViewerSwipeRight(){
        setViewerDateState(subDays(s_viewer_date, 1));
    }
    function togglePicker(){
        setShowPickerState(!s_show_picker);
    }

    function openSettings(){
        console.log('ToDo: Settings Page');
    }

    return(
        <SafeAreaView style={ss.mainView}>
            <View style={ss.headerView}>

                <View style={ss.headerLogoView} >
                    <Image style={ss.headerLogo} source={VuLogo} />
                    <Text style={ss.headerLogoText} >Restaurant</Text>
                </View>

                {width > 600 ? <TouchableHighlight //magic-number
                    style={global_styles.labeledIconButton} 
                    activeOpacity={0.6}
                    underlayColor={appColors.iosSystemGray5.light}
                    onPress={openSettings} >
                    <>
                        <Text style={global_styles.labeledIconButtonText} >Settings</Text>
                        <Image style={global_styles.iconButtonImage} source={SettingsIcon} />
                    </>
                </TouchableHighlight> : <TouchableHighlight
                    style={global_styles.iconButton} 
                    activeOpacity={0.6}
                    underlayColor={appColors.iosSystemGray5.light}
                    onPress={openSettings} >
                        <Image style={global_styles.iconButtonImage} source={SettingsIcon} />
                </TouchableHighlight>}

            </View>

            <View style={home_styles.controlsView}>

                <TouchableHighlight 
                    style={date_picker_styles.pickerButton}
                    activeOpacity={0.6} 
                    underlayColor={appColors.iosSystemGray5.light} 
                    onPress={togglePicker}>
                    <Text style={date_picker_styles.pickerButtonText}>{format(s_viewer_date, 'PPPP')}</Text>
                </TouchableHighlight>

                {width > 600 ? <TouchableHighlight //magic-number
                    style={global_styles.labeledIconButton} 
                    activeOpacity={0.6}
                    underlayColor={appColors.iosSystemGray5.light}
                    onPress={addReservation} >
                    <>
                        <Text style={global_styles.labeledIconButtonText} >Add Reservation</Text>
                        <Image style={global_styles.iconButtonImage} source={AddIcon} />
                    </>
                </TouchableHighlight> : <TouchableHighlight
                    style={global_styles.iconButton} 
                    activeOpacity={0.6}
                    underlayColor={appColors.iosSystemGray5.light}
                    onPress={addReservation} >
                        <Image style={global_styles.iconButtonImage} source={AddIcon} />
                </TouchableHighlight>}

            </View>

            <CollapsibleDatePicker3 date={s_viewer_date} onSelect={next => setViewerDateState(next)} isVisible={s_show_picker} />

            <View style={global_styles.actionSheetContentDivider} />

            <ReservationViewer 
                date={s_viewer_date} 
                onSwipeLeft={handleViewerSwipeLeft}
                onSwipeRight={handleViewerSwipeRight}
                onPress={() => setShowPickerState(false)}/>
        </SafeAreaView>
    );
}