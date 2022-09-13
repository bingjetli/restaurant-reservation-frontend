import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../assets/icons/arrow_back_ios.png';
import { appColors, appSizes } from '../common';

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
        maxWidth:250,
        minWidth:250,
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
            <Text style={ss.headerText}>Add Reservation</Text>
            <View style={{flex:1}}></View>
        </View>
        <View style={ss.bodyView}>
            <Text style={ss.bodyTitleText} >Last Name</Text>
            <Text style={ss.bodyText} >Followed by the Last Name of the person to make this Reservation under.</Text>
            <Text style={ss.bodyText} >Likewise, this should also be a minimum of three (3) letters.</Text>
            <TextInput 
                style={ss.bodyTextInput} 
                value={s_last_name} 
                autoFocus={true}
                onPressIn={() => setLastNameState('')}
                onChangeText={next => setLastNameState(next.trim())} 
                ref={r_textbox} />
        </View>
        <View style={ss.footerView}>
            <TouchableHighlight 
                style={s_last_name.length < 3 ? ss.footerNextDisabledPressable : ss.footerNextPressable} 
                activeOpacity={0.6}
                underlayColor={appColors.mainComplementary1}
                onPress={goToNextScreen} 
                disabled={s_last_name.length < 3}>
                <Text style={ss.footerNextText}>Continue</Text>
            </TouchableHighlight>
            <TouchableHighlight 
                style={ss.footerBackPressable} 
                activeOpacity={0.6}
                underlayColor={appColors.iosSystemGray5.light}
                onPress={goToPreviousScreen}>
                <Text style={ss.footerBackText}>Go Back</Text>
            </TouchableHighlight>
        </View>
    </SafeAreaView>);
}