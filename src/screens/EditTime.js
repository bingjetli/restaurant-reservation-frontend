import Axios from 'axios';
import React, { useContext, useState } from 'react';
import { Alert, Image, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../assets/icons/arrow_back_ios.png';
import AppConfig from '../AppConfig';
import { appColors, getTimeString, parse24HourTimeString } from '../common';
import global_styles from '../styles/global_styles';
import setup_styles from '../styles/setup_styles';
import TimePicker2 from '../TimePicker2';

export default function({route, navigation}){
    const [s_config, setConfigState] = useContext(AppConfig);

    //state
    const [s_time, setTimeState] = useState(parse24HourTimeString(route.params.time));

    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }

    function goToNextScreen(){
        
        //perform the update request on the backend
        const url = s_config.env.API_URL + '/reservations';

        const headers = {};
        headers[s_config.env.API_KEY_HEADER_NAME] = s_config.env.API_KEY;

        const payload = {...route.params};
        payload.time = getTimeString(s_time, false);

        Axios.put(url, payload, {headers:headers}).then(r => {
            if(r.data.result === 'successful'){
                navigation.popToTop();

                Alert.alert('Reservation Updated!', 'Reservation rescheduled successfully!', [{text:'OK'}]);
            }
            else if(r.data.result === 'error_occured'){
                Alert.alert('Error Occured!', r.data.message, [{'text':'OK'}]);
            }
        });
    }

    function goToPreviousScreen(){
        navigation.pop();
    }

    return (<SafeAreaView style={[global_styles.fullView, setup_styles.mainView]}>
        <View style={global_styles.headerView}>
            <TouchableHighlight 
                style={global_styles.headerBackButton} 
                activeOpacity={0.6}
                underlayColor={appColors.iosSystemGray5.light}
                onPress={returnToHomeScreen} >
                <>
                <Image style={global_styles.headerBackButtonIcon} source={ArrowBackIosIcon} />
                <Text style={global_styles.headerBackButtonText} >Cancel</Text>
                </>
            </TouchableHighlight>
            <Text style={global_styles.headerText}>Reschedule</Text>
            <View style={{flex:1}}></View>
        </View>
        <View style={[global_styles.fullCenteringView, setup_styles.bodyView]}>
            <Text style={[global_styles.bodyHeading, setup_styles.bodyHeading]} >Time</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >You may also choose a new time for this reservation to be rescheduled to.</Text>
            <TimePicker2 time={s_time} onSelect={next => setTimeState(next)} />
        </View>
        <View style={setup_styles.footerView}>
            <TouchableHighlight 
                style={global_styles.primaryButton} 
                activeOpacity={0.6}
                underlayColor={appColors.mainComplementary1}
                onPress={goToNextScreen}>
                <Text style={global_styles.primaryButtonText}>Reschedule</Text>
            </TouchableHighlight>
            <TouchableHighlight 
                style={global_styles.secondaryButton} 
                activeOpacity={0.6}
                underlayColor={appColors.iosSystemGray5.light}
                onPress={goToPreviousScreen}>
                <Text style={global_styles.secondaryButtonText}>Go Back</Text>
            </TouchableHighlight>
        </View>
    </SafeAreaView>);
}