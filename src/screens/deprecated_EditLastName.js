import Axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../assets/icons/arrow_back_ios.png';
import AppConfig from '../AppConfig';
import { appColors } from '../common';
import global_styles from '../styles/global_styles';
import setup_styles from '../styles/setup_styles';

export default function({route, navigation}){
    const [s_config, setConfigState] = useContext(AppConfig);

    //state
    const [s_last_name, setLastNameState] = useState(route.params.lastName);

    //ref
    const r_textbox = useRef(null);

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
        payload.lastName = s_last_name;

        Axios.put(url, payload, {headers:headers}).then(r => {
            if(r.data.result === 'successful'){
                navigation.popToTop();

                Alert.alert('Reservation Updated!', 'Names changed successfully!', [{text:'OK'}]);
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
            <Text style={global_styles.headerText}>Change Names</Text>
            <View style={{flex:1}}></View>
        </View>
        <View style={[global_styles.fullCenteringView, setup_styles.bodyView]}>
            <Text style={[global_styles.bodyHeading, setup_styles.bodyHeading]} >Last Name</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >You may also change the last name for the person this reservation was created under.</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >Likewise, this should also be a minimum of three (3) letters.</Text>
            <TextInput 
                style={[global_styles.textBox, setup_styles.bodyTextBox]} 
                value={s_last_name} 
                onPressIn={() => setLastNameState('')}
                onChangeText={next => setLastNameState(next.trim())} 
                ref={r_textbox} />
        </View>
        <View style={setup_styles.footerView}>
            <TouchableHighlight 
                style={s_last_name.length < 3 ? global_styles.primaryButtonDisabled : global_styles.primaryButton} 
                activeOpacity={0.6}
                underlayColor={appColors.mainComplementary1}
                onPress={goToNextScreen} 
                disabled={s_last_name.length < 3}>
                <Text style={global_styles.primaryButtonText}>Change Names</Text>
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