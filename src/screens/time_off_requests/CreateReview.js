import Axios from 'axios';
import { format, parseISO } from 'date-fns';
import React, { useContext } from 'react';
import { Alert, Image, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowBackIosIcon from '../../../assets/icons/arrow_back_ios.png';
import AppConfig from '../../AppConfig';
import { appColors, getTimeString, parse24HourTimeString } from '../../common';
import global_styles from '../../styles/global_styles';
import setup_styles from '../../styles/setup_styles';
import TagViewer from '../../TagViewer';

export default function({route, navigation}){
    const [s_config, setConfigState] = useContext(AppConfig);

    //event-handlers
    function returnToHomeScreen(){
        navigation.popToTop();
    }

    function createTimeOffRequest(){
        const url = s_config.env.API_URL + '/time-off-requests';

        const headers = {};
        headers[s_config.env.API_KEY_HEADER_NAME] = s_config.env.API_KEY;

        Axios.post(url, route.params, {headers:headers}).then(response => {
            //close the new reservation form if successfully posted
            if(response.data.result === 'successful'){
                navigation.popToTop();

                Alert.alert('Created Successfully', 'Successfully created Time-0ff Request', [{text:'OK'}]);
            }

            else if(response.data.result === 'found_duplicates'){
                //notify the client that there may already be exising records with the same details if found
                const params = {
                    timeOffRequest:response.data.timeOffRequest,
                    existingTimeOffRequests:response.data.existingTimeOffRequests,
                    payload:{...route.params},
                };

                navigation.navigate({
                    name:'time-off-requests-create-found-duplicates',
                    params:params,
                    merge:true,
                });
            }
            else if(response.data.result === 'error_occured'){
                Alert.alert('Error Occured!', response.data.message, [{'text':'OK'}]);
            }
        });
    }
    
    function goToPreviousScreen(){
        navigation.pop();
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
            <Text style={global_styles.headerText}>Add Time-off Request</Text>
            <View style={{flex:1}}></View>
        </View>
        <View style={[global_styles.fullCenteringView, setup_styles.bodyView]}>
            <Text style={[global_styles.bodyHeading, setup_styles.bodyHeading]} >Review</Text>

            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >
                Make a time-off request for <Text style={setup_styles.bodyEmphasisText}>{route.params.name}</Text>  
                {route.params.startDate === route.params.endDate ? 
                <Text style={[global_styles.bodyText, setup_styles.bodyText]}> on <Text style={setup_styles.bodyEmphasisText}>{format(parseISO(route.params.startDate), 'PPPP')}</Text></Text> :
                <Text> starting on <Text style={setup_styles.bodyEmphasisText}>{format(parseISO(route.params.startDate), 'PPPP')}</Text> to <Text style={setup_styles.bodyEmphasisText}>{format(parseISO(route.params.endDate), 'PPPP')}</Text></Text>} ?
            </Text>
            {route.params.details && <Text style={[global_styles.bodyCaption, setup_styles.bodyCaption]}>&ldquo;{route.params.details}&rdquo;</Text>}
        </View>
        <View style={setup_styles.footerView}>
            <TouchableHighlight 
                style={global_styles.primaryButton} 
                activeOpacity={0.6}
                underlayColor={appColors.main2}
                onPress={createTimeOffRequest}>
                <Text style={global_styles.primaryButtonText}>Create</Text>
            </TouchableHighlight>
            <TouchableHighlight 
                style={global_styles.secondaryButton} 
                activeOpacity={0.6}
                underlayColor={appColors.content2}
                onPress={goToPreviousScreen}>
                <Text style={global_styles.secondaryButtonText}>Go Back</Text>
            </TouchableHighlight>
        </View>
    </SafeAreaView>);
}