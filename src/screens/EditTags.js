import React, { useContext, useState } from 'react';
import { Pressable, Image, StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import { appColors, appSizes } from '../common';
import ArrowBackIosIcon from '../../assets/icons/arrow_back_ios.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import TagPicker from '../TagPicker';
import AppConfig from '../AppConfig';
import getEnv from '../env';
import Axios from 'axios';

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
    const app_config = useContext(AppConfig);

    //state
    const [s_tags, setTagsState] = useState(() => {
        const tags_object = {};
        route.params.tags.forEach(tag => {
            tags_object[tag] = true;
        });
        return tags_object;
    });

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
        payload.tags = Object.keys(s_tags);

        Axios.put(url, payload, {headers:headers}).then(r => {
            if(r.data.result === 'successful'){
                navigation.popToTop();

                Alert.alert('Reservation Updated!', 'Tags changed successfully!', [{text:'OK'}]);
            }
            else if(r.data.result === 'error_occured'){
                Alert.alert('Error Occured!', r.data.message, [{'text':'OK'}]);
            }
        });
    }

    function selectTag(selected_tag){
        const s_tags_copy = {...s_tags};

        if(s_tags[selected_tag]) delete s_tags_copy[selected_tag];
        else s_tags_copy[selected_tag] = true;

        setTagsState(s_tags_copy);
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
            <Text style={ss.headerText}>Change Tags</Text>
            <View style={{flex:1}}></View>
        </View>
        <View style={ss.bodyView}>
            <Text style={ss.bodyTitleText} >Tags</Text>
            <Text style={ss.bodyText} >Please select the new Tags to change to.</Text>
            <TagPicker tagData={app_config.tagData} selected={s_tags} onSelect={selectTag} />
        </View>
        <View style={ss.footerView}>
            <TouchableHighlight 
                style={ss.footerNextPressable} 
                activeOpacity={0.6}
                underlayColor={appColors.mainComplementary1}
                onPress={goToNextScreen}>
                <Text style={ss.footerNextText}>Change Tags</Text>
            </TouchableHighlight>
        </View>
    </SafeAreaView>);
}