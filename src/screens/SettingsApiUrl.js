import * as SecureStore from 'expo-secure-store';
import React, { useContext, useState } from 'react';
import { Alert, Image, Text, TouchableHighlight, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../assets/icons/arrow_back_ios.png';
import AppConfig from '../AppConfig';
import { appColors } from '../common';
import global_styles from '../styles/global_styles';
import settings_style from '../styles/settings_style';

export default function({route, navigation}){
    const [s_config, setConfigState] = useContext(AppConfig);

    //state
    const [s_api_url, setApiUrlState] = useState(s_config.env.API_MAIN_URL);

    //event-handlers
    function returnToPreviousPage(){
        navigation.pop();
    }

    function changeApiUrl(){
        //attempt to set the value in SecureStore first
        SecureStore.setItemAsync('API_MAIN_URL', s_api_url).then(async r => {

            //then update the value in s_config if SecureStore was successful
            const s_config_copy = {...s_config};

            //check the network
            if(s_config_copy.env.API_URL === s_config_copy.env.API_MAIN_URL){ //only set this if the API_URL was the MAIN_URL
                s_config_copy.env.API_URL = s_api_url;
            }

            s_config_copy.env.API_MAIN_URL = s_api_url;
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
        <View style={settings_style.bodyContent}>
            <Text style={[global_styles.bodyHeading, settings_style.bodyHeading]} >Change API URL</Text>
            <Text style={[global_styles.bodyText, settings_style.bodyText]}>The API URL is a web address specifying where the backend server is located over the network.</Text>
            <TextInput
                style={[global_styles.textBox, settings_style.textBox]} 
                value={s_api_url}
                onPressIn={() => setApiUrlState('')}
                onChangeText={next => setApiUrlState(next.trim())} />

            <TouchableHighlight 
                style={[s_api_url === s_config.env.API_MAIN_URL ? global_styles.primaryButtonDisabled : global_styles.primaryButton, {alignSelf:'center', marginTop:10}]} 
                disabled={s_api_url === s_config.env.API_MAIN_URL}
                activeOpacity={0.6}
                underlayColor={appColors.main2}
                onPress={changeApiUrl}>
                <Text style={global_styles.primaryButtonText}>Change API URL</Text>
            </TouchableHighlight>

            <Text style={[global_styles.bodyCaption, settings_style.bodyCaption]}>Changing this to an invalid value may prevent the app from retreiving data from the backend server.</Text>
        </View>
    </SafeAreaView>);
}