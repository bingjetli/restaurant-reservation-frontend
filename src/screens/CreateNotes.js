import React, { useState } from 'react';
import { Pressable, Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableHighlight } from 'react-native';
import { appColors, appSizes } from '../common';
import ArrowBackIosIcon from '../../assets/icons/arrow_back_ios.png';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    },
    bodyContent:{
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
    bodyTextInput:{
        //color:appColors.iosSystemGray.light,
        color:appColors.main,
        textAlignVertical:'top',
        fontSize:appSizes.large.body,
        padding:10,
        overflow:'scroll',
        maxWidth:375,
        maxHeight:200,
        minWidth:375,
        minHeight:100,
        //backgroundColor:appColors.iosSystemGray6.light,
        borderRadius:15,
        borderColor:appColors.main,
        borderWidth:1,
        borderStyle:'solid',
        marginTop:10,
    },
    footerView:{
    },
    footerNextPressable:{
        backgroundColor:appColors.main,
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
});

export default function({route, navigation}){
    //state
    const [s_notes, setNotesState] = useState('');

    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }

    function goToNextScreen(){
        const params = {...route.params};
        params.notes = s_notes.trim();

        navigation.navigate({
            name:'create-review',
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
        <ScrollView style={ss.bodyView} contentContainerStyle={ss.bodyContent}>
            <Text style={ss.bodyTitleText} >Notes</Text>
            <Text style={ss.bodyText} >Finally, are there any additional details that you would like to specify for this Reservation?</Text>
            <Text style={ss.bodyText} >This step is also optional.</Text>
            <TextInput
                style={ss.bodyTextInput}
                value={s_notes}
                onChangeText={setNotesState}
                multiline={true} />
        </ScrollView>
        <View style={ss.footerView}>
            <TouchableHighlight 
                style={ss.footerNextPressable} 
                activeOpacity={0.6}
                underlayColor={appColors.mainComplementary1}
                onPress={goToNextScreen}>
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