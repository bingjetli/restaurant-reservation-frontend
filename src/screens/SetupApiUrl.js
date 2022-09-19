import * as SecureStore from 'expo-secure-store';
import React, { useContext, useRef, useState } from 'react';
import { Alert, Keyboard, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppConfig from '../AppConfig';
import { appColors } from '../common';
import global_styles from '../styles/global_styles';
import setup_styles from '../styles/setup_styles';

export default function({route, navigation}){
    const [s_config, setConfigState] = useContext(AppConfig);

    //state
    const [s_api_url, setApiUrlState] = useState('');

    //ref
    const r_textbox = useRef(null);

    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }

    function goToNextScreen(){
        SecureStore.setItemAsync('API_URL', s_api_url).then(r => {
            const s_config_copy = {...s_config};
            s_config_copy.env.API_URL = s_api_url;
            setConfigState(s_config_copy);

            //API_URL set successfully, move to the next screen
            navigation.navigate({
                name:'setup-apikey',
            });
        }).catch(e => {
            Alert.alert('Failed To Set API_URL', `The app may not work properly, please contact the developer to resolve this issue: ${e}`, [{text:'OK'}]);
        });
    }

    function goToPreviousScreen(){
        navigation.pop();
    }

    return (<SafeAreaView style={[global_styles.fullView, setup_styles.mainView]} onStartShouldSetResponder={ () => Keyboard.dismiss()}>
        <View style={global_styles.headerView}>
            {/*<TouchableHighlight 
                style={ss.headerBackPressable} 
                activeOpacity={0.6}
                underlayColor={appColors.content2}
                onPress={returnToHomeScreen} >
                <>
                <Image style={ss.headerBackIcon} source={ArrowBackIosIcon} />
                <Text style={ss.headerBackText} >Cancel</Text>
                </>
            </TouchableHighlight>*/}
            <View style={{flex:1}}></View>
            <Text style={global_styles.headerText}>Initial Setup</Text>
            <View style={{flex:1}}></View>
        </View>
        <View style={[global_styles.fullCenteringView, setup_styles.bodyView]}>
            <Text style={[global_styles.bodyHeading, setup_styles.bodyHeading]} >API URL</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >Please enter the API URL provided to you below.</Text>
            <TextInput 
                style={[global_styles.textBox, setup_styles.bodyTextBox, {marginTop:25, maxWidth:300, minWidth:300}]} 
                value={s_api_url} 
                autoFocus={true}
                onPressIn={() => setApiUrlState('')}
                onChangeText={next => setApiUrlState(next.trim())} 
                ref={r_textbox} />
        </View>
        <View style={setup_styles.footerView}>
            <TouchableHighlight 
                style={s_api_url.length < 19 ? global_styles.primaryButtonDisabled : global_styles.primaryButton} 
                disabled={s_api_url.length < 19}
                activeOpacity={0.6}
                underlayColor={appColors.main4}
                onPress={goToNextScreen}>
                <Text style={global_styles.primaryButtonText}>Continue</Text>
            </TouchableHighlight>
            {/*<TouchableHighlight 
                style={ss.footerBackPressable} 
                activeOpacity={0.6}
                underlayColor={appColors.content2}
                onPress={goToPreviousScreen}>
                <Text style={ss.footerBackText}>Go Back</Text>
            </TouchableHighlight>*/}
        </View>
    </SafeAreaView>);
}