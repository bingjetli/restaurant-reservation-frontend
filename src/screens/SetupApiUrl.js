import React, { useContext, useRef, useState } from 'react';
import { Alert, Image, Keyboard, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../assets/icons/arrow_back_ios.png';
import { appColors, appSizes } from '../common';
import * as SecureStore from 'expo-secure-store';
import AppConfig from '../AppConfig';
import setup_styles from '../styles/setup_styles';
import global_styles from '../styles/global_styles';

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
    bodyTextInput:{
        //color:appColors.iosSystemGray.light,
        color:appColors.main,
        fontSize:appSizes.large.title1,
        textAlign:'center',
        paddingHorizontal:15,
        maxWidth:300,
        minWidth:300,
        minHeight:30,
        //backgroundColor:appColors.iosSystemGray6.light,
        borderRadius:100,
        borderColor:appColors.main,
        borderWidth:1,
        borderStyle:'solid',
        marginTop:10,
    },
});

export default function({route, navigation}){
    const [s_config, setConfigState] = useContext(AppConfig);

    //state
    const [s_api_url, setApiUrlState] = useState('');

    //ref
    const r_textbox = useRef(null);

    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }

    function goToNextScreen(){
        SecureStore.setItemAsync('API_URL', s_api_url).then(r => {
            const s_config_copy = {...s_config};
            s_config_copy.env.API_URL = s_api_url;
            setConfigState(s_config_copy);

            //API_URL set successfully, move to the next screen
            navigation.navigate({
                name:'setup-apikey',
            });
        }).catch(e => {
            Alert.alert('Failed To Set API_URL', `The app may not work properly, please contact the developer to resolve this issue: ${e}`, [{text:'OK'}]);
        });
    }

    function goToPreviousScreen(){
        navigation.pop();
    }

    return (<SafeAreaView style={[global_styles.fullView, setup_styles.mainView]} onStartShouldSetResponder={ () => Keyboard.dismiss()}>
        <View style={global_styles.headerView}>
            {/*<TouchableHighlight 
                style={ss.headerBackPressable} 
                activeOpacity={0.6}
                underlayColor={appColors.iosSystemGray5.light}
                onPress={returnToHomeScreen} >
                <>
                <Image style={ss.headerBackIcon} source={ArrowBackIosIcon} />
                <Text style={ss.headerBackText} >Cancel</Text>
                </>
            </TouchableHighlight>*/}
            <View style={{flex:1}}></View>
            <Text style={global_styles.headerText}>Initial Setup</Text>
            <View style={{flex:1}}></View>
        </View>
        <View style={[global_styles.fullCenteringView, setup_styles.bodyView]}>
            <Text style={[global_styles.bodyHeading, setup_styles.bodyHeading]} >API URL</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >Please enter the API URL provided to you below.</Text>
            <TextInput 
                style={[global_styles.textBox, setup_styles.bodyTextBox, {marginTop:25, maxWidth:300, minWidth:300}]} 
                value={s_api_url} 
                autoFocus={true}
                onPressIn={() => setApiUrlState('')}
                onChangeText={next => setApiUrlState(next.trim())} 
                ref={r_textbox} />
        </View>
        <View style={setup_styles.footerView}>
            <TouchableHighlight 
                style={s_api_url.length < 19 ? global_styles.primaryButtonDisabled : global_styles.primaryButton} 
                disabled={s_api_url.length < 19}
                activeOpacity={0.6}
                underlayColor={appColors.mainComplementary1}
                onPress={goToNextScreen}>
                <Text style={global_styles.primaryButtonText}>Continue</Text>
            </TouchableHighlight>
            {/*<TouchableHighlight 
                style={ss.footerBackPressable} 
                activeOpacity={0.6}
                underlayColor={appColors.iosSystemGray5.light}
                onPress={goToPreviousScreen}>
                <Text style={ss.footerBackText}>Go Back</Text>
            </TouchableHighlight>*/}
        </View>
    </SafeAreaView>);
}