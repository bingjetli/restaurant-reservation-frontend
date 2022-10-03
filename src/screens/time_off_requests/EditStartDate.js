import { compareAsc, formatISO, parseISO } from 'date-fns';
import React, { useState } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../../assets/icons/arrow_back_ios.png';
import { appColors } from '../../common';
import DatePicker2 from '../../DatePicker2';
import global_styles from '../../styles/global_styles';
import setup_styles from '../../styles/setup_styles';

const s_range_select = true;

export default function({route, navigation}){

    //state
    const [s_date, setDateState] = useState(parseISO(route.params.startDate));
    //const [s_range_select, setRangeSelectState] = useState(true);

    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }

    function goToPreviousScreen(){
        navigation.pop();
    }

    function goToNextScreen(){
        const params = {...route.params};
        params.startDate = formatISO(s_date, {representation:'date'});

        /** If the startDate occurs after the endDate, we set a flag to use
         * the startDate as the endDate for the next screen without overwriting
         * the actual endDate until the PUT request is ready to be made.
        */
        if(compareAsc(s_date, parseISO(params.endDate)) === 1) params.useStartDate = true;

        if(s_range_select){
            //range select mode
            navigation.navigate({
                name:'time-off-requests-edit-end-date',
                params:params,
            });
        }
        else {
            //single date mode
            params.endDate = formatISO(s_date, {representation:'date'});
            navigation.navigate({
                name:'time-off-requests-create-details',
                params:params,
            });
        }

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
            <Text style={[global_styles.bodyHeading, setup_styles.bodyHeading]} >{s_range_select ? 'Start Date' : 'Date'}</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >{s_range_select ? 'Change the starting date associated with this time-off request.' : 'Change the date associated with this time-off request'}</Text>
            <DatePicker2 date={s_date} onSelect={next => setDateState(next)} />
        </View>
        <View style={setup_styles.footerView}>
            <TouchableHighlight 
                style={global_styles.primaryButton} 
                activeOpacity={0.6}
                underlayColor={appColors.main2}
                onPress={goToNextScreen}>
                <Text style={global_styles.primaryButtonText}>Continue</Text>
            </TouchableHighlight>
            {/*
            <TouchableHighlight 
                style={global_styles.secondaryButton} 
                activeOpacity={0.6}
                underlayColor={appColors.content2}
                onPress={goToPreviousScreen}>
                <Text style={global_styles.secondaryButtonText}>Go Back</Text>
            </TouchableHighlight>
            */}
        </View>
    </SafeAreaView>);
}