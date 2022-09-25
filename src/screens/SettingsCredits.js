import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableHighlight, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../assets/icons/arrow_back_ios.png';
import { appColors } from '../common';
import global_styles from '../styles/global_styles';
import settings_style from '../styles/settings_style';
import * as SecureStore from 'expo-secure-store';
import AppConfig from '../AppConfig';

export default function({route, navigation}){
    const [s_config, setConfigState] = useContext(AppConfig);

    //state
    const [s_api_url, setApiUrlState] = useState(s_config.env.API_URL);

    //event-handlers
    function returnToPreviousPage(){
        navigation.pop();
    }

    function changeApiUrl(){
        //attempt to set the value in SecureStore first
        SecureStore.setItemAsync('API_URL', s_api_url).then(r => {

            //then update the value in s_config if SecureStore was successful
            const s_config_copy = {...s_config};
            s_config_copy.env.API_URL = s_api_url;
            setConfigState(s_config_copy);

            //finally, display an alert to let the user know the operation was successful
            Alert.alert('Changed API Url', 'The API Url was changed successfully!', [{text:'OK'}]);

        }).catch(e => {
            Alert.alert('Failed To Change API Url', `The app may not work properly, please contact the developer to resolve this issue: ${e}`, [{text:'OK'}]);
        });
    }

    return (<SafeAreaView style={[global_styles.fullView, settings_style.mainView]}>
        <View style={global_styles.headerView}>
            <TouchableHighlight 
                style={global_styles.headerBackButton} 
                activeOpacity={0.6}
                underlayColor={appColors.content2}
                onPress={returnToPreviousPage} >
                <>
                    <Image style={global_styles.headerBackButtonIcon} source={ArrowBackIosIcon} />
                    <Text style={global_styles.headerBackButtonText} >Back</Text>
                </>
            </TouchableHighlight>
            <Text style={global_styles.headerText}></Text>
            <View style={{flex:1}}></View>
        </View>
        <ScrollView style={global_styles.fullView} contentContainerStyle={settings_style.bodyContent}>
            <Text style={[global_styles.bodyHeading, settings_style.bodyHeading]} >About App</Text>

            <Text style={[global_styles.bodyText, settings_style.creditsHeading]}>Version</Text>
            <Text style={[global_styles.bodyCaption, settings_style.creditsText]}>1.0</Text>

            <Text style={[global_styles.bodyText, settings_style.creditsHeading]}>Created By</Text>
            <Text style={[global_styles.bodyCaption, settings_style.creditsText]}>Bailey Liang</Text>

            <Text style={[global_styles.bodyText, settings_style.creditsHeading]}>Open-Sourced Libraries and Frameworks</Text>
            <Text style={[global_styles.bodyCaption, settings_style.creditsText]}>Expo APIs</Text>
            <Text style={[global_styles.bodyCaption, settings_style.creditsText]}>React Native</Text>
            <Text style={[global_styles.bodyCaption, settings_style.creditsText]}>React Native Gesture Handler</Text>
            <Text style={[global_styles.bodyCaption, settings_style.creditsText]}>Reanimated 2</Text>
            <Text style={[global_styles.bodyCaption, settings_style.creditsText]}>React Navigation</Text>
            <Text style={[global_styles.bodyCaption, settings_style.creditsText]}>React Native Community : NetInfo</Text>
            <Text style={[global_styles.bodyCaption, settings_style.creditsText]}>Date-Fns</Text>
            <Text style={[global_styles.bodyCaption, settings_style.creditsText]}>Axios</Text>

            <Text style={[global_styles.bodyText, settings_style.creditsHeading]}>Google FontFaces</Text>
            <Text style={[global_styles.bodyCaption, settings_style.creditsText]}>PTSans</Text>
            <Text style={[global_styles.bodyCaption, settings_style.creditsText]}>PTSerif</Text>
            <Text style={[global_styles.bodyCaption, settings_style.creditsText]}>YesevaOne</Text>

            <Text style={[global_styles.bodyText, settings_style.creditsHeading]}>Icons</Text>
            <Text style={[global_styles.bodyCaption, settings_style.creditsText]}>All icons were obtained from Google's Free Open-Sourced Material Icons and Symbols library</Text>
        </ScrollView>
    </SafeAreaView>);
}