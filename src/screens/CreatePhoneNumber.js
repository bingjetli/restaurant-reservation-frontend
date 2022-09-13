import React, { useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../assets/icons/arrow_back_ios.png';
import { appColors } from '../common';
import setup_styles from '../styles/setup_styles';
import global_styles from '../styles/global_styles';
import phone_number_styles from '../styles/phone_number_styles';

export default function({route, navigation}){
    //state
    const [s_area_code, setAreaCodeState] = useState('709');
    const [s_prefix, setPrefixState] = useState('');
    const [s_line_number, setLineNumberState] = useState('');

    //ref
    const r_area_code_textbox = useRef(null);
    const r_prefix_textbox = useRef(null);
    const r_line_number_textbox = useRef(null);

    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }

    function goToNextScreen(){
        const params = {...route.params};
        params.phoneNumber = s_area_code + '-' + s_prefix + '-' + s_line_number;

        navigation.navigate({
            name:'create-tags',
            params:params,
        });
    }

    function goToPreviousScreen(){
        navigation.pop();
    }

    function areaCodeKeyPress({nativeEvent:{key:keyValue}}){
        if(s_area_code.length === 3 && keyValue !== 'Backspace') r_prefix_textbox.current.focus();
    }

    function areaCodeTextChange(next){
        const valid = next.replace(/[^0-9]/gi, '');
        setAreaCodeState(valid);
        if(valid.length === 3) r_prefix_textbox.current.focus();
    }

    function prefixKeyPress({nativeEvent:{key:keyValue}}){
        if(keyValue === 'Backspace' && s_prefix.length === 0){
            r_area_code_textbox.current.focus();
        }
        else if(s_prefix.length === 3 && keyValue !== 'Backspace') r_line_number_textbox.current.focus();
    }

    function prefixTextChange(next){
        const valid = next.replace(/[^0-9]/gi, '');
        setPrefixState(valid);
        if(valid.length === 3) r_line_number_textbox.current.focus();
    }

    function lineNumberKeyPress({nativeEvent:{key:keyValue}}){
        if(keyValue === 'Backspace' && s_line_number.length === 0){
            r_prefix_textbox.current.focus();
        }
    }

    function lineNumberTextChange(next){
        const valid = next.replace(/[^0-9]/gi, '');
        setLineNumberState(valid);
    }

    function decideWhichTextBoxToFocus(){
        if(s_area_code.length < 3) r_area_code_textbox.current.focus();
        else if(s_prefix.length < 3) r_prefix_textbox.current.focus();
        else r_line_number_textbox.current.focus();
    }

    return (<SafeAreaView style={[global_styles.fullView, setup_styles.mainView]}>
        <KeyboardAvoidingView behavior='height'>
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
                <Text style={[global_styles.bodyHeading, setup_styles.bodyHeading]} >Phone Number</Text>
                <Text style={[global_styles.bodyText, setup_styles.bodyText]} >Almost done! Please enter a contact number for this Reservation.</Text>
                <View style={phone_number_styles.falseTextBox}>
                    <Text style={phone_number_styles.falseTextBoxText} >(</Text>
                    <TextInput 
                        style={[phone_number_styles.invisibleTextBox, {minWidth:40}]}
                        value={s_area_code}
                        maxLength={3}
                        keyboardType='number-pad'
                        onChangeText={areaCodeTextChange}
                        onKeyPress={areaCodeKeyPress}
                        onPressIn={() => setAreaCodeState('')}
                        ref={r_area_code_textbox} />
                    <Text style={phone_number_styles.falseTextBoxText} >)</Text>
                    <TextInput 
                        style={[phone_number_styles.invisibleTextBox, {minWidth:40}]}
                        value={s_prefix}
                        maxLength={3}
                        keyboardType='number-pad'
                        autoFocus={true}
                        onChangeText={prefixTextChange}
                        onKeyPress={prefixKeyPress}
                        onPressIn={() => setPrefixState('')}
                        ref={r_prefix_textbox} />
                    <Text style={phone_number_styles.falseTextBoxText} >&ndash;</Text>
                    <TextInput 
                        style={[phone_number_styles.invisibleTextBox, {minWidth:50}]}
                        value={s_line_number}
                        maxLength={4}
                        keyboardType='number-pad'
                        onChangeText={lineNumberTextChange}
                        onKeyPress={lineNumberKeyPress}
                        onPressIn={() => setLineNumberState('')}
                        ref={r_line_number_textbox} />
                </View>
            </View>
            <View style={setup_styles.footerView}>
                <TouchableHighlight 
                    style={s_area_code.length === 3 && s_prefix.length === 3 && s_line_number.length === 4 ? global_styles.primaryButton : global_styles.primaryButtonDisabled} 
                    activeOpacity={0.6}
                    underlayColor={appColors.mainComplementary1}
                    onPress={goToNextScreen} 
                    disabled={!(s_area_code.length === 3 && s_prefix.length === 3 && s_line_number.length === 4)}>
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
        </KeyboardAvoidingView>
    </SafeAreaView>);
}