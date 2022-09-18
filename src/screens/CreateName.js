import React, { useRef, useState } from 'react';
import { Image, Keyboard, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../assets/icons/arrow_back_ios.png';
import { appColors } from '../common';
import setup_styles from '../styles/setup_styles';
import global_styles from '../styles/global_styles';

export default function({route, navigation}){
    //state
    const [s_name, setNameState] = useState('');

    //ref
    const r_textbox = useRef(null);

    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }

    function goToNextScreen(){
        const params = {...route.params};
        params.name = s_name.trim();

        navigation.navigate({
            name:'create-phonenumber',
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
        <View style={[global_styles.fullCenteringView, setup_styles.bodyView]}>
            <Text style={[global_styles.bodyHeading, setup_styles.bodyHeading]} >Name</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >Afterwards, please enter the name of the person to make this reservation under.</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >This should be a minimum of three (3) characters.</Text>
            <TextInput 
                style={[global_styles.textBox, setup_styles.bodyTextBox]} 
                value={s_name} 
                autoFocus={true}
                onPressIn={() => setNameState('')}
                onChangeText={next => setNameState(next)} 
                ref={r_textbox} />
        </View>
        <View style={setup_styles.footerView}>
            <TouchableHighlight 
                style={s_name.length < 3 ? global_styles.primaryButtonDisabled : global_styles.primaryButton} 
                activeOpacity={0.6}
                underlayColor={appColors.mainComplementary1}
                onPress={goToNextScreen} 
                disabled={s_name.length < 3}>
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