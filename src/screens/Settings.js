import React from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../assets/icons/arrow_back_ios.png';
import { appColors } from '../common';
import global_styles from '../styles/global_styles';
import settings_style from '../styles/settings_style';

export default function({route, navigation}){
    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }
    function goToNextScreen(){
        /*
        navigation.navigate({
            name:'create-date',
        });
        */
    }

    return (<SafeAreaView style={[global_styles.fullView, settings_style.mainView]}>
        <View style={global_styles.headerView}>
            <TouchableHighlight 
                style={global_styles.headerBackButton} 
                activeOpacity={0.6}
                underlayColor={appColors.content2}
                onPress={returnToHomeScreen} >
                <>
                    <Image style={global_styles.headerBackButtonIcon} source={ArrowBackIosIcon} />
                    <Text style={global_styles.headerBackButtonText} >Back</Text>
                </>
            </TouchableHighlight>
            <Text style={global_styles.headerText}></Text>
            <View style={{flex:1}}></View>
        </View>
        <ScrollView style={[global_styles.fullView]} contentContainerStyle={settings_style.bodyContent}>
            <Text style={[global_styles.bodyHeading, settings_style.bodyHeading]} >Settings</Text>
            <TouchableHighlight
                style={settings_style.settingButton}
                activeOpacity={0.6}
                underlayColor={appColors.content2}
                onPress={() => null}>
                <>
                    <Text style={[global_styles.bodySubHeading, settings_style.bodySubHeading]}>Configure Backend</Text>
                    <Text style={[global_styles.bodyText, settings_style.bodyText]}>View settings related to connecting to the API</Text>
                </>
            </TouchableHighlight>
            <TouchableHighlight
                style={settings_style.settingButton}
                activeOpacity={0.6}
                underlayColor={appColors.content2}
                onPress={() => null}>
                <>
                    <Text style={[global_styles.bodySubHeading, settings_style.bodySubHeading]}>About App</Text>
                    <Text style={[global_styles.bodyText, settings_style.bodyText]}>View developer information about this app</Text>
                </>
            </TouchableHighlight>
        </ScrollView>
    </SafeAreaView>);
}