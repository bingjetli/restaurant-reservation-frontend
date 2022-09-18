import React, { useState } from 'react';
import { Image, Keyboard, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../assets/icons/arrow_back_ios.png';
import { appColors } from '../common';
import GuestPicker from '../GuestPicker';
import setup_styles from '../styles/setup_styles';
import global_styles from '../styles/global_styles';

export default function({route, navigation}){
    //state
    const [s_guests, setGuestsState] = useState(1);

    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }

    function goToNextScreen(){
        const params = {...route.params};
        params.seats = s_guests;

        navigation.navigate({
            name:'create-name',
            params:params,
        });
    }

    function goToPreviousScreen(){
        navigation.pop();
    }


    return (<SafeAreaView style={[global_styles.fullView, setup_styles.mainView]} onStartShouldSetResponder={ () => Keyboard.dismiss()}>
        <View style={global_styles.headerView}>
            <TouchableHighlight 
                style={global_styles.headerBackButton} 
                activeOpacity={0.6}
                underlayColor={appColors.content2}
                onPress={returnToHomeScreen} >
                <>
                    <Image style={global_styles.headerBackButtonIcon} source={ArrowBackIosIcon} />
                    <Text style={global_styles.headerBackButtonText} >Cancel</Text>
                </>
            </TouchableHighlight>
            <Text style={global_styles.headerText}>Add Reservation</Text>
            <View style={{flex:1}}></View>
        </View>
        <ScrollView style={[global_styles.fullView, setup_styles.bodyView]} contentContainerStyle={global_styles.fullCenteringView}>
            <Text style={[global_styles.bodyHeading, setup_styles.bodyHeading]} >Group Size</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >Then, let's specify how many guests will be expected to arrive for this Reservation.</Text>
            <GuestPicker guests={s_guests} onUpdate={next => setGuestsState(next)} />
        </ScrollView>
        <View style={setup_styles.footerView}>
            <TouchableHighlight 
                style={global_styles.primaryButton} 
                activeOpacity={0.6}
                underlayColor={appColors.mainComplementary1}
                onPress={goToNextScreen}>
                <Text style={global_styles.primaryButtonText}>Continue</Text>
            </TouchableHighlight>
            <TouchableHighlight 
                style={global_styles.secondaryButton} 
                activeOpacity={0.6}
                underlayColor={appColors.content2}
                onPress={goToPreviousScreen}>
                <Text style={global_styles.secondaryButtonText}>Go Back</Text>
            </TouchableHighlight>
        </View>
    </SafeAreaView>);
}