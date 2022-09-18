import { formatISO, parseISO } from 'date-fns';
import React, { useState } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../assets/icons/arrow_back_ios.png';
import { appColors } from '../common';
import DatePicker2 from '../DatePicker2';
import global_styles from '../styles/global_styles';
import setup_styles from '../styles/setup_styles';

export default function({route, navigation}){

    //state
    const [s_date, setDateState] = useState(parseISO(route.params.date));

    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }

    function goToNextScreen(){
        const params_copy = {...route.params};
        params_copy.date = formatISO(s_date, {representation:'date'});

        navigation.navigate({
            name:'edit-time',
            params:params_copy,
        });
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
            <Text style={global_styles.headerText}>Reschedule</Text>
            <View style={{flex:1}}></View>
        </View>
        <View style={[global_styles.fullCenteringView, setup_styles.bodyView]}>
            <Text style={[global_styles.bodyHeading, setup_styles.bodyHeading]} >Date</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >You may choose a new date for this reservation to be rescheduled to.</Text>
            <DatePicker2 date={s_date} onSelect={next => setDateState(next)} />
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