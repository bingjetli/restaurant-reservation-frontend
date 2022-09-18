import Axios from 'axios';
import React, { useContext, useState } from 'react';
import { Alert, Image, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../assets/icons/arrow_back_ios.png';
import AppConfig from '../AppConfig';
import { appColors } from '../common';
import global_styles from '../styles/global_styles';
import setup_styles from '../styles/setup_styles';
import TagPicker from '../TagPicker';

export default function({route, navigation}){
    const [s_config, setConfigState] = useContext(AppConfig);

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
        const url = s_config.env.API_URL + '/reservations';

        const headers = {};
        headers[s_config.env.API_KEY_HEADER_NAME] = s_config.env.API_KEY;

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

    return (<SafeAreaView style={[global_styles.fullView, setup_styles.mainView]}>
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
            <Text style={global_styles.headerText}>Change Tags</Text>
            <View style={{flex:1}}></View>
        </View>
        <View style={[global_styles.fullCenteringView, setup_styles.bodyView]}>
            <Text style={[global_styles.bodyHeading, setup_styles.bodyHeading]} >Tags</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >You may change the tags associated with this reservation.</Text>
            <TagPicker tagData={s_config.tagData} selected={s_tags} onSelect={selectTag} />
        </View>
        <View style={setup_styles.footerView}>
            <TouchableHighlight 
                style={global_styles.primaryButton} 
                activeOpacity={0.6}
                underlayColor={appColors.mainComplementary1}
                onPress={goToNextScreen}>
                <Text style={global_styles.primaryButtonText}>Change Tags</Text>
            </TouchableHighlight>
        </View>
    </SafeAreaView>);
}