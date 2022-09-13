import React from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../assets/icons/arrow_back_ios.png';
import { appColors } from '../common';
import setup_styles from '../styles/setup_styles';
import global_styles from '../styles/global_styles';

export default function({route, navigation}){
    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }
    function goToNextScreen(){
        navigation.navigate({
            name:'create-date',
        });
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
            <Text style={global_styles.headerText}>Add Reservation</Text>
            <View style={{flex:1}}></View>
        </View>
        <View style={[global_styles.fullCenteringView, setup_styles.bodyView]}>
            <Text style={[global_styles.bodyHeading, setup_styles.bodyHeading]} >Welcome!</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >This setup will guide you through the process of creating a new Reservation.</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >You can cancel this setup anytime by pressing the Cancel button at the top-left corner of the screen.</Text>
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