import React from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../assets/icons/arrow_back_ios.png';
import { appColors } from '../common';
import global_styles from '../styles/global_styles';
import settings_style from '../styles/settings_style';
import RouterIcon from '../../assets/icons/router.png';
import InfoIcon from '../../assets/icons/info.png';

export default function({route, navigation}){
    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }
    function goToAPISettings(){
        navigation.navigate({
            name:'settings-api',
        });
    }
    function goToCredits(){
        navigation.navigate({
            name:'settings-credits',
        });
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
                onPress={goToAPISettings}>
                <>
                    <Image style={[global_styles.iconButtonImage, settings_style.settingButtonIcon]} source={RouterIcon} />
                    <View>
                        <Text style={[global_styles.bodyText, settings_style.settingButtonText]}>Configure Backend</Text>
                        <Text style={[global_styles.bodyCaption, settings_style.settingButtonCaption]}>View settings related to connecting to the API</Text>
                    </View>
                </>
            </TouchableHighlight>
            <TouchableHighlight
                style={settings_style.settingButton}
                activeOpacity={0.6}
                underlayColor={appColors.content2}
                onPress={goToCredits}>
                <>
                    <Image style={[global_styles.iconButtonImage, settings_style.settingButtonIcon]} source={InfoIcon} />
                    <View>
                        <Text style={[global_styles.bodyText, settings_style.settingButtonText]}>About App</Text>
                        <Text style={[global_styles.bodyCaption, settings_style.settingButtonCaption]}>View developer information about this app</Text>
                    </View>
                </>
            </TouchableHighlight>
        </ScrollView>
    </SafeAreaView>);
}