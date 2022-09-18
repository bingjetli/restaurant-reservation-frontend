import * as SecureStore from 'expo-secure-store';
import React, { useContext } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppConfig from '../AppConfig';
import { appColors } from '../common';
import global_styles from '../styles/global_styles';
import setup_styles from '../styles/setup_styles';

export default function({route, navigation}){
    const [s_config, setConfigState] = useContext(AppConfig);

    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }
    function goToNextScreen(){
        SecureStore.setItemAsync('INITIALIZED', 'TRUE').then(r => {
            //INITIALIZED set successfully, set the s_config state to switch the routes

            const s_config_copy = {...s_config};
            s_config_copy.env.INITIALIZED = true;
            setConfigState(s_config_copy);
        }).catch(e => {
            Alert.alert('Failed To Set INITIALIZED flag', `The app may not work properly, please contact the developer to resolve this issue: ${e}`, [{text:'OK'}]);
        });
    }

    return (<SafeAreaView style={[global_styles.fullView, setup_styles.mainView]}>
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
        <View style={[global_styles.fullCenteringView, setup_styles.bodyView]} >
            <Text style={[global_styles.bodyHeading, setup_styles.bodyHeading]} >All Done!</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >The app is all configured and ready to go!</Text>
        </View>
        <View style={setup_styles.footerView}>
            <TouchableHighlight 
                style={global_styles.primaryButton} 
                activeOpacity={0.6}
                underlayColor={appColors.mainComplementary1}
                onPress={goToNextScreen}>
                <Text style={global_styles.primaryButtonText}>Continue</Text>
            </TouchableHighlight>
        </View>
    </SafeAreaView>);
}