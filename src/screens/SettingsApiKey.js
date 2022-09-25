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
    const [s_api_key, setApiKeyState] = useState(s_config.env.API_KEY);

    //event-handlers
    function returnToPreviousPage(){
        navigation.pop();
    }

    function changeApiKey(){
        //attempt to set the value in SecureStore first
        SecureStore.setItemAsync('API_KEY', s_api_key).then(r => {

            //then update the value in s_config if SecureStore was successful
            const s_config_copy = {...s_config};
            s_config_copy.env.API_KEY = s_api_key;
            setConfigState(s_config_copy);

            //finally, display an alert to let the user know the operation was successful
            Alert.alert('Changed API Key', 'The API Key was changed successfully!', [{text:'OK'}]);

        }).catch(e => {
            Alert.alert('Failed To Change API Key', `The app may not work properly, please contact the developer to resolve this issue: ${e}`, [{text:'OK'}]);
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
        <View style={settings_style.bodyContent}>
            <Text style={[global_styles.bodyHeading, settings_style.bodyHeading]} >Change API Key</Text>
            <Text style={[global_styles.bodyText, settings_style.bodyText]}>The API Key is a special sequence of characters and numbers used to authorize access to the backend server where data is stored.</Text>
            <TextInput
                style={[global_styles.textBox, settings_style.textBox]} 
                value={s_api_key}
                onPressIn={() => setApiKeyState('')}
                onChangeText={next => setApiKeyState(next.trim())} />

            <TouchableHighlight 
                style={[s_api_key === s_config.env.API_KEY ? global_styles.primaryButtonDisabled : global_styles.primaryButton, {alignSelf:'center', marginTop:10}]} 
                disabled={s_api_key === s_config.env.API_KEY}
                activeOpacity={0.6}
                underlayColor={appColors.main2}
                onPress={changeApiKey}>
                <Text style={global_styles.primaryButtonText}>Change API Key</Text>
            </TouchableHighlight>

            <Text style={[global_styles.bodyCaption, settings_style.bodyCaption]}>Changing this to an invalid value will prevent the app from retreiving data from the backend server.</Text>
        </View>
    </SafeAreaView>);
}