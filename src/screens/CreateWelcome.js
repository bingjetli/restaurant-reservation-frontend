import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
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
    footerNextText:{
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
    function goToNextScreen(){
        navigation.navigate({
            name:'create-date',
        });
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
        <View style={ss.bodyView} >
            <Text style={ss.bodyTitleText} >Welcome!</Text>
            <Text style={ss.bodyText} >This setup will guide you through the process of creating a new Reservation.</Text>
            <Text style={ss.bodyText} >You can cancel this setup anytime by pressing the <Text style={{fontWeight:'bold'}}>Cancel</Text> button at the top-left corner of the screen.</Text>
        </View>
        <View style={ss.footerView}>
            <TouchableHighlight 
                style={ss.footerNextPressable} 
                activeOpacity={0.6}
                underlayColor={appColors.mainComplementary1}
                onPress={goToNextScreen}>
                <Text style={ss.footerNextText}>Continue</Text>
            </TouchableHighlight>
        </View>
    </SafeAreaView>);
}