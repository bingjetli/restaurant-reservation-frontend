import React from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../assets/icons/arrow_back_ios.png';
import KeyIcon from '../../assets/icons/key.png';
import LinkIcon from '../../assets/icons/link.png';
import { appColors } from '../common';
import global_styles from '../styles/global_styles';
import settings_style from '../styles/settings_style';

export default function({route, navigation}){
    //event-handlers
    function returnToPreviousPage(){
        navigation.pop();
    }

    function goToApiKeySettings(){
        navigation.navigate({
            name:'settings-api-key',
        });
    }

    function goToApiUrlSettings(){
        navigation.navigate({
            name:'settings-api-url',
        });
    }

    function goToApiFallbackUrlSettings(){
        navigation.navigate({
            name:'settings-api-fallback-url',
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
        <ScrollView style={[global_styles.fullView]} contentContainerStyle={settings_style.bodyContent}>
            <Text style={[global_styles.bodyHeading, settings_style.bodyHeading]} >Configure Backend</Text>
            <TouchableHighlight
                style={settings_style.settingButton}
                activeOpacity={0.6}
                underlayColor={appColors.content2}
                onPress={goToApiKeySettings}>
                <>
                    <Image style={[global_styles.iconButtonImage, settings_style.settingButtonIcon]} source={KeyIcon}/>
                    <View>
                        <Text style={[global_styles.bodyText, settings_style.settingButtonText]}>Change API Key</Text>
                        <Text style={[global_styles.bodyCaption, settings_style.settingButtonCaption]}>Change the API Key used to access the backend server.</Text>
                    </View>
                </>
            </TouchableHighlight>
            <TouchableHighlight
                style={settings_style.settingButton}
                activeOpacity={0.6}
                underlayColor={appColors.content2}
                onPress={goToApiUrlSettings}>
                <>
                    <Image style={[global_styles.iconButtonImage, settings_style.settingButtonIcon]} source={LinkIcon}/>
                    <View>
                        <Text style={[global_styles.bodyText, settings_style.settingButtonText]}>Change API URL</Text>
                        <Text style={[global_styles.bodyCaption, settings_style.settingButtonCaption]}>Change the URL used to connect to the backend server.</Text>
                    </View>
                </>
            </TouchableHighlight>
            <TouchableHighlight
                style={settings_style.settingButton}
                activeOpacity={0.6}
                underlayColor={appColors.content2}
                onPress={goToApiFallbackUrlSettings}>
                <>
                    <Image style={[global_styles.iconButtonImage, settings_style.settingButtonIcon]} source={LinkIcon}/>
                    <View>
                        <Text style={[global_styles.bodyText, settings_style.settingButtonText]}>Change API Fallback URL</Text>
                        <Text style={[global_styles.bodyCaption, settings_style.settingButtonCaption]}>Change the fallback URL used to connect to the backend server.</Text>
                    </View>
                </>
            </TouchableHighlight>
        </ScrollView>
    </SafeAreaView>);
}