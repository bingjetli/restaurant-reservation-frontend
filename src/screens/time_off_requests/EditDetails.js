import React, { useContext, useState } from 'react';
import { Alert, Image, Keyboard, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../../assets/icons/arrow_back_ios.png';
import { appColors } from '../../common';
import Axios from 'axios';
import AppConfig from '../../AppConfig';
import global_styles from '../../styles/global_styles';
import setup_styles from '../../styles/setup_styles';
import { formatISO } from 'date-fns';


export default function({route, navigation}){
    const [s_config, setConfigState] = useContext(AppConfig);

    //state
    const [s_details, setDetailsState] = useState(route.params.details);

    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }

    function goToNextScreen(){
        //perform the update request on the backend
        const url = s_config.env.API_URL + '/time-off-requests';

        const headers = {};
        headers[s_config.env.API_KEY_HEADER_NAME] = s_config.env.API_KEY;

        const payload = {...route.params};
        payload.details = s_details.trim();
        payload.updatedAt = formatISO(new Date());

        Axios.put(url, payload, {headers:headers}).then(r => {
            if(r.data.result === 'successful'){
                navigation.popToTop();

                Alert.alert('Time-off Request Updated!', 'Details updated successfully!', [{text:'OK'}]);
            }
            else if(r.data.result === 'error_occured'){
                Alert.alert('Error Occured!', r.data.message, [{'text':'OK'}]);
            }
        });
    }

    return (<SafeAreaView style={[global_styles.fullView, setup_styles.mainView]} onStartShouldSetResponder={ () => Keyboard.dismiss()}>
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
            <Text style={global_styles.headerText}>Edit Details</Text>
            <View style={{flex:1}}></View>
        </View>
        <ScrollView style={global_styles.fullView} contentContainerStyle={[global_styles.centeringView, setup_styles.bodyContent, setup_styles.bodyView]}>
            <Text style={[global_styles.bodyHeading, setup_styles.bodyHeading]} >Details</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >Change the details associated with this time-off request.</Text>
            <TextInput
                style={setup_styles.bodyTextField}
                value={s_details}
                onChangeText={setDetailsState}
                multiline={true} />
        </ScrollView>
        <View style={setup_styles.footerView}>
            <TouchableHighlight 
                style={global_styles.primaryButton} 
                activeOpacity={0.6}
                underlayColor={appColors.main2}
                onPress={goToNextScreen}>
                <Text style={global_styles.primaryButtonText}>Update Details</Text>
            </TouchableHighlight>
        </View>
    </SafeAreaView>);
}