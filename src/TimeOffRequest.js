import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Alert, Image, Modal, Text, TouchableHighlight, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import MoreVertIcon from '../assets/icons/more_vert.png';
import PersonIcon from '../assets/icons/person.png';
import PersonFilledIcon from '../assets/icons/person_filled.png';
import PersonOffIcon from '../assets/icons/person_off.png';
import PersonOffFilledIcon from '../assets/icons/person_off_filled.png';
import GroupIcon from '../assets/icons/group.png';
import AppConfig from './AppConfig';
import { appColors, getTimeString, parse24HourTimeString } from './common';
import global_styles from './styles/global_styles';
import reservation_styles from './styles/reservation_styles';
import TagViewer from './TagViewer';
import time_off_request_styles from './styles/time_off_request_styles';
import { format, parseISO } from 'date-fns';
import DoneIcon from '../assets/icons/done.png';

export default function({item, refreshViewer}){
    const navigation = useNavigation(); //hook to retreive navigation prop from nested component
    const [s_config, setConfigState] = useContext(AppConfig);

    //states
    const [s_status, setStatusState] = useState(item.status);
    const [s_show_options, setShowOptionsState] = useState(false);

    //cached
    const c_start_date = useMemo(() => {
        return parseISO(item.startDate);
    }, [item.startDate]);
    const c_end_date = useMemo(() => {
        return parseISO(item.endDate);
    }, [item.endDate]);

    //side-effects
    //useEffect(() => { //run this on init and everytime item changes
    //    setStatusState(item.status); //use this to synchronize the status state
    //}, [item]);

    //event-handlers
    function approveTimeOffRequest(){
        //implementing toggle functionality
        const status = s_status === 'approved' ? 'pending' : 'approved';

        //perform the update request on the backend
        const payload = {
            id:item._id,
            status:status,
        };
        const url = s_config.env.API_URL + '/time-off-requests';

        const headers = {};
        headers[s_config.env.API_KEY_HEADER_NAME] = s_config.env.API_KEY;

        Axios.put(url, payload, {headers:headers}).then(r => {
            if(r.data.result === 'successful'){
                setStatusState(status); //only update the status state if the update request was successful
            }
            else if(r.data.result === 'error_occured'){
                Alert.alert('Error Occured!', r.data.message, [{'text':'OK'}]);
            }
        });
    }

    function reschedule(){
        setShowOptionsState(false);

        navigation.navigate({
            name:'time-off-requests-edit-start-date',
            params:{
                endDate:item.endDate,
                startDate:item.startDate,
                id:item._id,
            },
        });
    }

    function editName(){
        setShowOptionsState(false);

        navigation.navigate({
            name:'time-off-requests-edit-name',
            params:{
                id:item._id,
                name:item.name,
            },
        });
    }

    function editDetails(){
        setShowOptionsState(false);

        navigation.navigate({
            name:'time-off-requests-edit-details',
            params:{
                id:item._id,
                details:item.details,
            },
        });
    }

    function deleteTimeOffRequest(){
        Alert.alert(
            'Delete This Time-off Request?', 
            'This time-off request will be PERMANENTLY DELETED from the system. Are you sure you want to continue?', 
            [
                {
                    text:'Cancel',
                },
                {
                    text:'Delete Permanently',
                    onPress:() => {
                        //delete logic
                        const url = s_config.env.API_URL + '/time-off-requests';

                        const headers = {};
                        headers[s_config.env.API_KEY_HEADER_NAME] = s_config.env.API_KEY;

                        const payload = {
                            ids:[item._id],
                        };

                        Axios.delete(url, {headers:headers, data:payload}).then(r => {
                            if(r.data.result === 'successful'){
                                setShowOptionsState(false);
                                refreshViewer();
                                Alert.alert('Successfully Deleted', 'This time-off request has been permanently deleted from the system.', [{text:'OK'}]);
                            }
                            else if(r.data.result === 'error_occured'){
                                Alert.alert('Error Occured!', r.data.message, [{'text':'OK'}]);
                            }
                        });
                    },
                },
            ]);
    }


    return (
        <View style={time_off_request_styles.itemView}>
            <Modal 
                visible={s_show_options} 
                animationType='fade' 
                transparent={true}
                onRequestClose={() => setShowOptionsState(false)}>
                <View style={global_styles.actionSheetModalView} onStartShouldSetResponder={() => setShowOptionsState(false)}>
                    <TouchableHighlight 
                        style={global_styles.actionSheetCancelButton} 
                        activeOpacity={0.6}
                        underlayColor={appColors.content2}
                        onPress={() => setShowOptionsState(false)}>
                        <Text style={global_styles.secondaryButtonText}>Cancel</Text>
                    </TouchableHighlight>
                    <Animated.View style={global_styles.actionSheetContentView} entering={FadeInDown} exiting={FadeOutDown}>
                        <View style={[{marginVertical:10, width:'100%', alignItems:'center'}]}>
                            <Text style={[global_styles.bodyText, time_off_request_styles.itemNameText]}>{item.name}</Text>
                            {
                                item.startDate === item.endDate ?
                                <Text style={[global_styles.bodyText, time_off_request_styles.itemDateText]} >{format(c_start_date, 'MMMM do')}</Text> :
                                <Text style={[global_styles.bodyText, time_off_request_styles.itemDateText]} >{format(c_start_date, 'MMMM do')}&ndash;{format(c_end_date, 'MMMM do')}</Text>
                            }
                        </View>
                        <View style={global_styles.actionSheetContentDivider} />

                        <TouchableHighlight 
                            style={global_styles.actionSheetContentButton} 
                            activeOpacity={0.6}
                            underlayColor={appColors.content2}
                            onPress={reschedule}>
                            <Text style={global_styles.secondaryButtonText} >Reschedule</Text>
                        </TouchableHighlight>
                        <View style={global_styles.actionSheetContentDivider} />

                        <TouchableHighlight 
                            style={global_styles.actionSheetContentButton} 
                            activeOpacity={0.6}
                            underlayColor={appColors.content2}
                            onPress={editName}>
                            <Text style={global_styles.secondaryButtonText} >Change Name</Text>
                        </TouchableHighlight>
                        <View style={global_styles.actionSheetContentDivider} />

                        <TouchableHighlight 
                            style={global_styles.actionSheetContentButton} 
                            activeOpacity={0.6}
                            underlayColor={appColors.content2}
                            onPress={editDetails}>
                            <Text style={global_styles.secondaryButtonText} >Edit Details</Text>
                        </TouchableHighlight>
                        <View style={global_styles.actionSheetContentDivider} />

                        <TouchableHighlight 
                            style={global_styles.actionSheetContentButton} 
                            activeOpacity={0.6}
                            underlayColor={appColors.content2}
                            onPress={deleteTimeOffRequest}>
                            <Text style={[global_styles.secondaryButtonText, {color:appColors.danger}]} >Delete</Text>
                        </TouchableHighlight>
                    </Animated.View>
                </View>
            </Modal>

            <View style={time_off_request_styles.itemHeaderView}>
                <Text style={[global_styles.bodyText, time_off_request_styles.itemNameText]}>{item.name}</Text>
                <TouchableHighlight 
                    style={global_styles.iconButton} 
                    activeOpacity={0.6}
                    underlayColor={appColors.content2}
                    onPress={() => setShowOptionsState(true)}>
                    <Image style={global_styles.iconButtonImage} source={MoreVertIcon} />
                </TouchableHighlight>
            </View>

            {
                item.startDate === item.endDate ?
                <Text style={[global_styles.bodyText, time_off_request_styles.itemDateText]} >{format(c_start_date, 'MMMM do')}</Text> :
                <Text style={[global_styles.bodyText, time_off_request_styles.itemDateText]} >{format(c_start_date, 'MMMM do')}&ndash;{format(c_end_date, 'MMMM do')}</Text>
            }

            {
                item.hasOwnProperty('details') && 
                <Text style={[global_styles.bodyCaption, time_off_request_styles.itemDetailsText]}>&ldquo;{item.details}&rdquo;</Text>
            }

            <View style={time_off_request_styles.itemFooterView}>
                {
                    s_status === 'approved' ? 
                    <TouchableHighlight 
                        style={reservation_styles.reservationFooterButton} 
                        activeOpacity={0.6}
                        underlayColor={appColors.content2}
                        onPress={() => approveTimeOffRequest()} >
                        <>
                            <Image style={[global_styles.iconButtonImage, reservation_styles.presentButtonSelected]} source={DoneIcon} />
                            <Text style={[global_styles.secondaryButtonText, reservation_styles.presentButtonSelectedText]} >Approved</Text>
                        </>
                    </TouchableHighlight> :
                    <TouchableHighlight 
                        style={reservation_styles.reservationFooterButton} 
                        activeOpacity={0.6}
                        underlayColor={appColors.content2}
                        onPress={() => approveTimeOffRequest()} >
                        <>
                            <Image style={global_styles.iconButtonImage} source={DoneIcon} />
                            <Text style={[global_styles.secondaryButtonText]} >Approve</Text>
                        </>
                    </TouchableHighlight>
                }
            </View>
        </View>
    );
}