import React, { useRef, useState } from 'react';
import { Image, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../assets/icons/arrow_back_ios.png';
import { appColors } from '../common';
import setup_styles from '../styles/setup_styles';
import global_styles from '../styles/global_styles';

export default function({route, navigation}){
    //state
    const [s_last_name, setLastNameState] = useState('');

    //ref
    const r_textbox = useRef(null);

    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }

    function goToNextScreen(){
        const params = {...route.params};
        params.lastName = s_last_name;

        navigation.navigate({
            name:'create-phonenumber',
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
            <Text style={[global_styles.bodyHeading, setup_styles.bodyHeading]} >Last Name</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >Followed by the Last Name of the person to make this Reservation under.</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >Likewise, this should also be a minimum of three (3) letters.</Text>
            <TextInput 
                style={[global_styles.textBox, setup_styles.bodyTextBox]} 
                value={s_last_name} 
                autoFocus={true}
                onPressIn={() => setLastNameState('')}
                onChangeText={next => setLastNameState(next.trim())} 
                ref={r_textbox} />
        </View>
        <View style={setup_styles.footerView}>
            <TouchableHighlight 
                style={s_last_name.length < 3 ? global_styles.primaryButtonDisabled : global_styles.primaryButton} 
                activeOpacity={0.6}
                underlayColor={appColors.mainComplementary1}
                onPress={goToNextScreen} 
                disabled={s_last_name.length < 3}>
                <Text style={global_styles.primaryButtonText}>Continue</Text>
            </TouchableHighlight>
            <TouchableHighlight 
                style={global_styles.secondaryButton} 
                activeOpacity={0.6}
                underlayColor={appColors.iosSystemGray5.light}
                onPress={goToPreviousScreen}>
                <Text style={global_styles.secondaryButtonText}>Go Back</Text>
            </TouchableHighlight>
        </View>
    </SafeAreaView>);
}