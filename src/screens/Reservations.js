import { useFocusEffect } from '@react-navigation/native';
import { addDays, format, subDays } from 'date-fns';
import React, { useCallback, useContext, useState } from 'react';
import { Image, Text, TouchableHighlight, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddIcon from '../../assets/icons/add.png';
import SettingsIcon from '../../assets/icons/settings.png';
import VuLogo from '../../assets/vu_logo.png';
import AppConfig from '../AppConfig';
import CollapsibleDatePicker3 from '../CollapsibleDatePicker3';
import { appColors } from '../common';
import ReservationViewer from '../ReservationViewer';
import date_picker_styles from '../styles/date_picker_styles';
import global_styles from '../styles/global_styles';
import home_styles from '../styles/home_styles';

export default function({route, navigation}){
    const [s_config, setConfigState] = useContext(AppConfig);

    //state
    const [s_viewer_date, setViewerDateState] = useState(new Date());
    const [s_show_picker, setShowPickerState] = useState(false);

    //side-effects
    /** Refresh the screen to the current date when focused.
     * This operation costs 2 renders on initialization.
     * 
     * The useCallback(, []) call is required to prevent crashing
     */
    useFocusEffect(useCallback(() => setViewerDateState(new Date()), []));

    //event-handlers
    function addReservation(){
        navigation.navigate('reservations-create-welcome');
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
        navigation.navigate('settings');
    }

    return(
        <SafeAreaView style={[global_styles.fullView, home_styles.mainView]}>
            <View style={home_styles.headerView}>
                <View style={home_styles.headerLogoView} >
                    <Image style={home_styles.headerLogo} source={VuLogo} />
                </View>

                <View style={global_styles.fullCenteringView}>
                    <TouchableHighlight 
                        style={date_picker_styles.pickerButton}
                        activeOpacity={0.6} 
                        underlayColor={appColors.content2} 
                        onPress={togglePicker}>
                        <Text style={date_picker_styles.pickerButtonText}>{format(s_viewer_date, s_config.screen.width > 600 ? 'PPPP' : 'ccc, MMM do, yyyy')}</Text>
                    </TouchableHighlight>
                </View>

                <View style={home_styles.controlsView}>
                    <TouchableHighlight
                        style={global_styles.iconButton} 
                        activeOpacity={0.6}
                        underlayColor={appColors.content2}
                        onPress={addReservation} >
                            <Image style={global_styles.iconButtonImage} source={AddIcon} />
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={global_styles.iconButton} 
                        activeOpacity={0.6}
                        underlayColor={appColors.content2}
                        onPress={openSettings} >
                            <Image style={global_styles.iconButtonImage} source={SettingsIcon} />
                    </TouchableHighlight>
                </View>
            </View>

            <CollapsibleDatePicker3 date={s_viewer_date} onSelect={next => setViewerDateState(next)} isVisible={s_show_picker} />

            <ReservationViewer 
                date={s_viewer_date} 
                onSwipeLeft={handleViewerSwipeLeft}
                onSwipeRight={handleViewerSwipeRight}
                onPress={() => setShowPickerState(false)}/>
        </SafeAreaView>
    );
}