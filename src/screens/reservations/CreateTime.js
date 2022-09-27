import { getHours } from 'date-fns';
import React, { useState } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../../assets/icons/arrow_back_ios.png';
import { appColors, getTimeString } from '../../common';
import setup_styles from '../../styles/setup_styles';
import global_styles from '../../styles/global_styles';
import TimePicker2 from '../../TimePicker2';

export default function({route, navigation}){
    //state
    const [s_time, setTimeState] = useState({hour:getHours(new Date()), minute:0});

    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }

    function goToNextScreen(){
        const params = {...route.params};
        params.time = getTimeString(s_time, false);

        navigation.navigate({
            name:'reservations-create-guest',
            params:params,
        });
    }

    function goToPreviousScreen(){
        navigation.pop();
    }

    return (<SafeAreaView style={[global_styles.fullView, setup_styles.mainView]}>
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
        <View style={[global_styles.fullCenteringView, setup_styles.bodyView]}>
            <Text style={[global_styles.bodyHeading, setup_styles.bodyHeading]} >Time</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >Next, let's choose a time to schedule this Reservation for.</Text>
            <TimePicker2 time={s_time} onSelect={next => setTimeState(next)} />
        </View>
        <View style={setup_styles.footerView}>
            <TouchableHighlight 
                style={global_styles.primaryButton} 
                activeOpacity={0.6}
                underlayColor={appColors.main2}
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