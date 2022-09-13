import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    },
    bodyEmphasisText:{
        color:appColors.iosSystemGray.light,
        textAlign:'center',
        fontSize:appSizes.large.title3,
        fontWeight:'bold',
        lineHeight:30,
        marginHorizontal:10,
        marginVertical:5,
    },
    footerView:{
    },
    footerPressable:{
        backgroundColor:appColors.main,
        margin:10,
        minHeight:50,
        justifyContent:'center',
    },
    footerText:{
        textAlign:'center',
        fontSize:appSizes.large.body,
        color:appColors.iosSystemWhite.light,
    },
});

export default function({route, navigation}){
    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }

    return (<SafeAreaView style={ss.mainView}>
        <View style={ss.headerView}>
            <View style={{flex:1}}></View>
            <Text style={ss.headerText}>Add Reservation</Text>
            <View style={{flex:1}}></View>
        </View>
        <View style={ss.bodyView}>
            <Text style={ss.bodyTitleText} >Success!</Text>
            <Text style={ss.bodyText} >The Reservation was successfully created!</Text>
        </View>
        <View style={ss.footerView}>
            <TouchableHighlight 
                style={ss.footerPressable} 
                activeOpacity={0.6}
                underlayColor={appColors.mainComplementary1}
                onPress={returnToHomeScreen}>
                <Text style={ss.footerText}>Continue</Text>
            </TouchableHighlight>
        </View>
    </SafeAreaView>);
}