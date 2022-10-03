import Axios from 'axios';
import { formatISO } from 'date-fns';
import React, { useContext, useRef, useState } from 'react';
import { Alert, Image, Keyboard, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../../assets/icons/arrow_back_ios.png';
import AppConfig from '../../AppConfig';
import { appColors } from '../../common';
import global_styles from '../../styles/global_styles';
import setup_styles from '../../styles/setup_styles';

export default function({route, navigation}){
    const [s_config, setConfigState] = useContext(AppConfig);

    //state
    const [s_name, setNameState] = useState(route.params.name);

    //ref
    const r_textbox = useRef(null);

    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }

    function goToNextScreen(){
        //perform the update request on the backend
        const url = s_config.env.API_URL + '/time-off-requests';

        const headers = {};
        headers[s_config.env.API_KEY_HEADER_NAME] = s_config.env.API_KEY;

        const payload = {...route.params};
        payload.name = s_name.trim();
        payload.updatedAt = formatISO(new Date());

        Axios.put(url, payload, {headers:headers}).then(r => {
            if(r.data.result === 'successful'){
                navigation.popToTop();

                Alert.alert('Time-off Request Updated!', 'Name changed successfully!', [{text:'OK'}]);
            }
            else if(r.data.result === 'error_occured'){
                Alert.alert('Error Occured!', r.data.message, [{'text':'OK'}]);
            }
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
            <Text style={global_styles.headerText}>Change Name</Text>
            <View style={{flex:1}}></View>
        </View>
        <View style={[global_styles.fullCenteringView, setup_styles.bodyView]}>
            <Text style={[global_styles.bodyHeading, setup_styles.bodyHeading]} >Name</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >Change the name of the employee associated with this time-off request.</Text>
            <TextInput 
                style={[global_styles.textBox, setup_styles.bodyTextBox]} 
                value={s_name} 
                onPressIn={() => setNameState('')}
                onChangeText={next => setNameState(next)} 
                ref={r_textbox} />
            <Text style={[global_styles.bodyCaption, setup_styles.bodyCaption]} >This should be a minimum of three (3) letters.</Text>
        </View>
        <View style={setup_styles.footerView}>
            <TouchableHighlight 
                style={s_name.length < 3 ? global_styles.primaryButtonDisabled : global_styles.primaryButton} 
                activeOpacity={0.6}
                underlayColor={appColors.main2}
                onPress={goToNextScreen} 
                disabled={s_name.length < 3}>
                <Text style={global_styles.primaryButtonText}>Change Name</Text>
            </TouchableHighlight>
            {/*<TouchableHighlight 
                style={global_styles.secondaryButton} 
                activeOpacity={0.6}
                underlayColor={appColors.content2}
                onPress={goToPreviousScreen}>
                <Text style={global_styles.secondaryButtonText}>Go Back</Text>
            </TouchableHighlight>*/}
        </View>
    </SafeAreaView>);
}