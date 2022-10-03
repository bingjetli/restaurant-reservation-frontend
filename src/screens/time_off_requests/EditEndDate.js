import Axios from 'axios';
import { formatISO, parseISO } from 'date-fns';
import React, { useContext, useState } from 'react';
import { Alert, Image, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../../assets/icons/arrow_back_ios.png';
import AppConfig from '../../AppConfig';
import { appColors } from '../../common';
import DatePicker2 from '../../DatePicker2';
import global_styles from '../../styles/global_styles';
import setup_styles from '../../styles/setup_styles';

export default function({route, navigation}){
    const [s_config] = useContext(AppConfig);

    /** STATE */
    const [s_date, setDateState] = useState(route.params.useStartDate ? parseISO(route.params.startDate) : parseISO(route.params.endDate));

    /** EVENT-HANDLERS */
    function returnToHomeScreen(){
        navigation.popToTop();
    }

    function goToPreviousScreen(){
        navigation.pop();
    }

    function goToNextScreen(){
        //perform the update request on the backend
        const url = s_config.env.API_URL + '/time-off-requests';

        const headers = {};
        headers[s_config.env.API_KEY_HEADER_NAME] = s_config.env.API_KEY;

        const payload = {...route.params};
        payload.endDate = formatISO(s_date, {representation:'date'});

        Axios.put(url, payload, {headers:headers}).then(r => {
            if(r.data.result === 'successful'){
                navigation.popToTop();

                Alert.alert('Time-off Request Updated!', 'Time-off Request rescheduled successfully!', [{text:'OK'}]);
            }
            else if(r.data.result === 'error_occured'){
                Alert.alert('Error Occured!', r.data.message, [{'text':'OK'}]);
            }
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
            <Text style={[global_styles.bodyHeading, setup_styles.bodyHeading]} >End Date</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >Change the ending date associated with this time-off request.</Text>
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