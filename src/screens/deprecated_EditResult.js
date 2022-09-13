import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appColors } from '../common';

const ss = StyleSheet.create({
    mainView:{
        flex:1, //take up as much space as possible
        backgroundColor:appColors.iosSystemWhite.light,
    },
    headerView:{
        backgroundColor:appColors.iosSystemWhite.light,
        flexDirection:'row',
        alignItems:'center',
        paddingTop:20,
    },
    headerText:{
        color:appColors.mainText,
        fontSize:20,
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
        fontSize:20,
        marginHorizontal:10,
        marginVertical:5,
    },
    bodyTitleText:{
        color:appColors.mainText,
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        margin:10,
    },
    bodyEmphasisText:{
        color:appColors.iosSystemGray.light,
        textAlign:'center',
        fontSize:25,
        fontWeight:'bold',
        lineHeight:40,
        marginHorizontal:10,
        marginVertical:5,
    },
    footerView:{
    },
    footerPressable:{
        backgroundColor:appColors.main,
        margin:10,
    },
    footerText:{
        textAlign:'center',
        fontSize:20,
        marginVertical:10,
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
            <Text style={ss.headerText}>Edit Reservation</Text>
            <View style={{flex:1}}></View>
        </View>
        <View style={ss.bodyView}>
            <Text style={ss.bodyTitleText} >Success!</Text>
            <Text style={ss.bodyText} >The Reservation was successfully updated!</Text>
        </View>
        <View style={ss.footerView}>
            <Pressable style={ss.footerPressable} onPress={returnToHomeScreen}>
                <Text style={ss.footerText}>Continue</Text>
            </Pressable>
        </View>
    </SafeAreaView>);
}