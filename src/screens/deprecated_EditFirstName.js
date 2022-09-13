import React, { useRef, useState } from 'react';
import { Image, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../assets/icons/arrow_back_ios.png';
import { appColors } from '../common';
import global_styles from '../styles/global_styles';
import setup_styles from '../styles/setup_styles';

export default function({route, navigation}){
    //state
    const [s_first_name, setFirstNameState] = useState(route.params.firstName);

    //ref
    const r_textbox = useRef(null);

    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }

    function goToNextScreen(){
        const params = {...route.params};
        params.firstName = s_first_name;

        navigation.navigate({
            name:'edit-lastname',
            params:params,
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
            <Text style={global_styles.headerText}>Change Names</Text>
            <View style={{flex:1}}></View>
        </View>
        <View style={[global_styles.fullCenteringView, setup_styles.bodyView]}>
            <Text style={[global_styles.bodyHeading, setup_styles.bodyHeading]} >First Name</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >You may change the first name for the person this Reservation was created under.</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >This should be a minimum of three (3) letters.</Text>
            <TextInput 
                style={[global_styles.textBox, setup_styles.bodyTextBox]} 
                value={s_first_name} 
                onPressIn={() => setFirstNameState('')}
                onChangeText={next => setFirstNameState(next.trim())} 
                ref={r_textbox} />
        </View>
        <View style={setup_styles.footerView}>
            <TouchableHighlight 
                style={s_first_name.length < 3 ? global_styles.primaryButtonDisabled : global_styles.primaryButton} 
                disabled={s_first_name.length < 3}
                activeOpacity={0.6}
                underlayColor={appColors.mainComplementary1}
                onPress={goToNextScreen}>
                <Text style={global_styles.primaryButtonText}>Continue</Text>
            </TouchableHighlight>
        </View>
    </SafeAreaView>);
}