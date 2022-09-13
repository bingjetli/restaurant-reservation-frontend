import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Image, StyleSheet, Text, TextInput, View, TouchableHighlight, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appColors, appSizes } from '../common';
import ArrowBackIosIcon from '../../assets/icons/arrow_back_ios.png';
import Axios from 'axios';
import getEnv from '../env';


const ss = StyleSheet.create({
    mainView:{
        flex:1, //take up as much space as possible
        backgroundColor:appColors.iosSystemWhite.light,
    },
    headerView:{
        backgroundColor:appColors.iosSystemWhite.light,
        flexDirection:'row',
        alignItems:'center',
    },
    headerText:{
        color:appColors.mainText,
        fontSize:appSizes.large.title3,
        fontWeight:'bold',
        flex:2,
        textAlignVertical:'center',
        textAlign:'center',
    },
    headerBackPressable:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        minHeight:50,
    },
    headerBackText:{
        color:appColors.main,
        fontWeight:'bold',
        fontSize:appSizes.large.title3,
        marginRight:10,
    },
    headerBackIcon:{
        height:25,
        width:25,
        marginLeft:10,
        tintColor:appColors.main,
    },
    bodyView:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    bodyText:{
        color:appColors.iosSystemGray.light,
        textAlign:'center',
        fontSize:appSizes.large.body,
        margin:10,
        maxWidth:400,
    },
    bodyTitleText:{
        color:appColors.mainText,
        fontSize:appSizes.large.title1,
        fontWeight:'bold',
        textAlign:'center',
        margin:10,
        maxWidth:400,
    },
    footerView:{
    },
    footerNextPressable:{
        backgroundColor:appColors.main,
        margin:10,
        minHeight:50,
        justifyContent:'center',
    },
    footerNextDisabledPressable:{
        backgroundColor:appColors.iosSystemGray.light,
        margin:10,
        minHeight:50,
        justifyContent:'center',
    },
    footerNextText:{
        textAlign:'center',
        fontSize:appSizes.large.body,
        color:appColors.iosSystemWhite.light,
    },
    footerBackPressable:{
        minHeight:50,
        justifyContent:'center',
        marginHorizontal:10,
        marginBottom:10,
    },
    footerBackText:{
        textAlign:'center',
        fontSize:appSizes.large.body,
        color:appColors.main,
    },
    bodyTextInputPressable:{
        maxWidth:300,
        minWidth:300,
        minHeight:50,
        maxHeight:50,
        //backgroundColor:appColors.iosSystemGray6.light,
        borderRadius:15,
        borderColor:appColors.main,
        borderWidth:1,
        borderStyle:'solid',
        marginTop:10,
        flexDirection:'row',
        justifyContent:'center',
    },
    bodyTextInputAlt:{
        color:appColors.main,
        fontSize:appSizes.large.title1,
        alignSelf:'center',
        // borderColor:'blue',
        // borderWidth:1,
        // borderStyle:'solid',
    },
    bodyTextInput:{
        color:appColors.main,
        fontSize:appSizes.large.title1,
        textAlign:'center',
        // borderColor:'red',
        // borderWidth:1,
        // borderStyle:'solid',
        minWidth:70,
        maxWidth:70,
    },
});

export default function({route, navigation}){
    //XXX-XXX-XXXX
    //0123456789--

    //state
    const [s_area_code, setAreaCodeState] = useState(route.params.phoneNumber.slice(0,3));
    const [s_prefix, setPrefixState] = useState(route.params.phoneNumber.slice(4,7));
    const [s_line_number, setLineNumberState] = useState(route.params.phoneNumber.slice(8));

    //ref
    const r_area_code_textbox = useRef(null);
    const r_prefix_textbox = useRef(null);
    const r_line_number_textbox = useRef(null);

    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }

    function goToNextScreen(){
        //perform the update request on the backend
        const url = getEnv().API_URL + '/reservations';

        const headers = {};
        headers[getEnv().API_KEY_HEADER_NAME] = getEnv().API_KEY;

        const payload = {...route.params};
        payload.phoneNumber = s_area_code + '-' + s_prefix + '-' + s_line_number;

        Axios.put(url, payload, {headers:headers}).then(r => {
            if(r.data.result === 'successful'){
                navigation.popToTop();

                Alert.alert('Reservation Updated!', 'Phone Number changed successfully!', [{text:'OK'}]);
            }
            else if(r.data.result === 'error_occured'){
                Alert.alert('Error Occured!', r.data.message, [{'text':'OK'}]);
            }
        });
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

    return (<SafeAreaView style={ss.mainView}>
        <View style={ss.headerView}>
            <TouchableHighlight 
                style={ss.headerBackPressable} 
                activeOpacity={0.6}
                underlayColor={appColors.iosSystemGray5.light}
                onPress={returnToHomeScreen} >
                <>
                <Image style={ss.headerBackIcon} source={ArrowBackIosIcon} />
                <Text style={ss.headerBackText} >Cancel</Text>
                </>
            </TouchableHighlight>
            <Text style={ss.headerText}>Change Phone Number</Text>
            <View style={{flex:1}}></View>
        </View>
        <View style={ss.bodyView}>
            <Text style={ss.bodyTitleText} >Phone Number</Text>
            <Text style={ss.bodyText} >Please enter the new Phone Number to change to.</Text>
            <Pressable style={ss.bodyTextInputPressable} onPress={decideWhichTextBoxToFocus}>
                <Text style={ss.bodyTextInputAlt} >(</Text>
                <TextInput 
                    style={ss.bodyTextInput}
                    value={s_area_code}
                    maxLength={3}
                    keyboardType='number-pad'
                    onChangeText={areaCodeTextChange}
                    onKeyPress={areaCodeKeyPress}
                    onPressIn={() => setAreaCodeState('')}
                    ref={r_area_code_textbox} />
                <Text style={ss.bodyTextInputAlt} >)</Text>
                <TextInput 
                    style={ss.bodyTextInput}
                    value={s_prefix}
                    maxLength={3}
                    keyboardType='number-pad'
                    onChangeText={prefixTextChange}
                    onKeyPress={prefixKeyPress}
                    onPressIn={() => setPrefixState('')}
                    ref={r_prefix_textbox} />
                <Text style={ss.bodyTextInputAlt} >- </Text>
                <TextInput 
                    style={ss.bodyTextInput}
                    value={s_line_number}
                    maxLength={4}
                    keyboardType='number-pad'
                    onChangeText={lineNumberTextChange}
                    onKeyPress={lineNumberKeyPress}
                    onPressIn={() => setLineNumberState('')}
                    ref={r_line_number_textbox} />
            </Pressable>
        </View>
        <View style={ss.footerView}>
            <TouchableHighlight 
                style={s_area_code.length === 3 && s_prefix.length === 3 && s_line_number.length === 4 ? ss.footerNextPressable : ss.footerNextDisabledPressable} 
                activeOpacity={0.6}
                underlayColor={appColors.mainComplementary1}
                onPress={goToNextScreen} 
                disabled={!(s_area_code.length === 3 && s_prefix.length === 3 && s_line_number.length === 4)}>
                <Text style={ss.footerNextText}>Change Phone Number</Text>
            </TouchableHighlight>
        </View>
    </SafeAreaView>);
}