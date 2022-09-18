import { formatISO } from 'date-fns';
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
    const [s_date, setDateState] = useState(new Date());

    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }

    function goToNextScreen(){
        navigation.navigate({
            name:'create-time',
            params:{
                date:formatISO(s_date, {representation:'date'}),
            },
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
            <Text style={global_styles.headerText}>Add Reservation</Text>
            <View style={{flex:1}}></View>
        </View>
        <View style={[global_styles.fullCenteringView, setup_styles.bodyView]}>
            <Text style={[global_styles.bodyHeading, setup_styles.bodyHeading]} >Date</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >First, let's start by picking the date for this reservation.</Text>
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