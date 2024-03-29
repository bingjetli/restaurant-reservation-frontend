import Axios from 'axios';
import { formatISO } from 'date-fns';
import React, { useContext, useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../../assets/icons/arrow_back_ios.png';
import AppConfig from '../../AppConfig';
import { appColors } from '../../common';
import ReservationAlternate from '../../ReservationAlternate';
import global_styles from '../../styles/global_styles';
import setup_styles from '../../styles/setup_styles';
import TimeOffRequestAlternate from '../../TimeOffRequestAlternate';

export default function({route, navigation}){
    const [s_config, setConfigState] = useContext(AppConfig);

    //state
    const [s_selected, setSelectedState] = useState('');

    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }

    function replaceTimeOffRequest(){
        //perform the update request on the backend
        const url = s_config.env.API_URL + '/time-off-requests';

        const headers = {};
        headers[s_config.env.API_KEY_HEADER_NAME] = s_config.env.API_KEY;

        const payload = {...route.params.payload}
        payload.id = s_selected;
        payload.updatedAt = formatISO(new Date());

        Axios.put(url, payload, {headers:headers}).then(r => {
            if(r.data.result === 'successful'){
                navigation.popToTop();

                Alert.alert('Time-off Request Replaced!', 'Time-off Request replaced successfully!', [{text:'OK'}]);
            }
            else if(r.data.result === 'error_occured'){
                Alert.alert('Error Occured!', r.data.message, [{'text':'OK'}]);
            }
        });
    }

    function continueAnyway(){
        //perform the update request on the backend
        const url = s_config.env.API_URL + '/time-off-requests';

        const headers = {};
        headers[s_config.env.API_KEY_HEADER_NAME] = s_config.env.API_KEY;

        const payload = {...route.params.payload}
        payload.ignoreDuplicates = true;

        Axios.post(url, payload, {headers:headers}).then(r => {
            if(r.data.result === 'successful'){
                navigation.pop();

                Alert.alert('Time-off Request Created!', 'Time-off request created successfully!', [{text:'OK'}]);
            }
            else if(r.data.result === 'error_occured'){
                Alert.alert('Error Occured!', r.data.message, [{'text':'OK'}]);
            }
        });
    }

    return (<SafeAreaView style={[global_styles.fullView, setup_styles.mainView]}>
        <View style={global_styles.headerView}>
            <TouchableHighlight 
                style={global_styles.headerBackButton} 
                activeOpacity={0.6}
                underlayColor={appColors.content2}
                onPress={returnToHomeScreen} >
                <>
                    <Image style={global_styles.headerBackButtonIcon} source={ArrowBackIosIcon} />
                    <Text style={global_styles.headerBackButtonText} >Cancel</Text>
                </>
            </TouchableHighlight>
            <Text style={global_styles.headerText}>Add Time-off Request</Text>
            <View style={{flex:1}}></View>
        </View>
        <ScrollView style={global_styles.fullView} contentContainerStyle={[global_styles.centeringView, setup_styles.bodyContent, setup_styles.bodyView]}>
            <Text style={[global_styles.bodyHeading, setup_styles.bodyHeading]} >Potential Duplicates Found</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >We found some existing time-off requests with the same name.</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >You can pick an existing time-off request to replace or continue creating your time-off request anyway.</Text>

            <View style={[global_styles.fullView, setup_styles.reservationsView, {width:'100%', alignItems:'center', marginTop:25}]}>
                {route.params.existingTimeOffRequests.map((time_off_request, time_off_request_i) => <TimeOffRequestAlternate 
                    item={time_off_request} 
                    key={time_off_request._id} 
                    selected={s_selected}
                    onSelect={setSelectedState}/>)}
            </View>

        </ScrollView>
        <View style={setup_styles.footerView}>
            <TouchableHighlight 
                style={s_selected === '' ? global_styles.primaryButtonDisabled : global_styles.primaryButton} 
                activeOpacity={0.6}
                underlayColor={appColors.main2}
                disabled={s_selected === '' ? true : false}
                onPress={replaceTimeOffRequest}>
                <Text style={global_styles.primaryButtonText}>Replace</Text>
            </TouchableHighlight>
            <TouchableHighlight 
                style={global_styles.secondaryButton} 
                activeOpacity={0.6}
                underlayColor={appColors.content2}
                onPress={continueAnyway}>
                <Text style={global_styles.secondaryButtonText}>Continue Anyway</Text>
            </TouchableHighlight>
        </View>
    </SafeAreaView>);
}

// 