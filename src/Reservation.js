import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, Modal, Text, TouchableHighlight, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import MoreVertIcon from '../assets/icons/more_vert.png';
import PersonIcon from '../assets/icons/person.png';
import PersonFilledIcon from '../assets/icons/person_filled.png';
import PersonOffIcon from '../assets/icons/person_off.png';
import PersonOffFilledIcon from '../assets/icons/person_off_filled.png';
import AppConfig from './AppConfig';
import { appColors, getTimeString, parse24HourTimeString } from './common';
import global_styles from './styles/global_styles';
import reservation_styles from './styles/reservation_styles';
import TagViewer from './TagViewer';

export default function({item}){
    const navigation = useNavigation(); //hook to retreive navigation prop from nested component
    const [s_config, setConfigState] = useContext(AppConfig);

    //states
    const [s_status, setStatusState] = useState(item.status);
    const [s_show_options, setShowOptionsState] = useState(false);

    //side-effects
    useEffect(() => { //run this on init and everytime item changes
        setStatusState(item.status); //use this to synchronize the status state
    }, [item]);

    //event-handlers
    function markStatusForReservation(proposed_status){

        //implementing toggle functionality
        let status = proposed_status
        if(proposed_status === s_status){
            //if the proposed status is already selected, we will just toggle it off
            status = 'default';
        }

        //perform the update request on the backend
        const payload = {
            id:item._id,
            status:status,
        };
        const url = s_config.env.API_URL + '/reservations';

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
            name:'edit-date',
            params:{
                date:item.date,
                time:item.time,
                id:item._id,
            },
        });
    }

    function editGuests(){
        setShowOptionsState(false);

        navigation.navigate({
            name:'edit-guest',
            params:{
                id:item._id,
                seats:item.seats,
            },
        });
    }

    function editName(){
        setShowOptionsState(false);

        navigation.navigate({
            name:'edit-name',
            params:{
                id:item._id,
                name:item.name,
            },
        });
    }

    function editPhoneNumber(){
        setShowOptionsState(false);

        navigation.navigate({
            name:'edit-phonenumber',
            params:{
                id:item._id,
                phoneNumber:item.phoneNumber,
            },
        });
    }

    function editTags(){
        setShowOptionsState(false);

        navigation.navigate({
            name:'edit-tags',
            params:{
                id:item._id,
                tags:item.tags,
            },
        });
    }

    function editNotes(){
        setShowOptionsState(false);

        navigation.navigate({
            name:'edit-notes',
            params:{
                id:item._id,
                notes:item.notes,
            },
        });
    }

    function deleteReservation(){
        Alert.alert(
            'Delete This Reservation?', 
            'This Reservation will be PERMANENTLY DELETED from the system. Are you sure you want to continue?', 
            [
                {
                    text:'Cancel',
                },
                {
                    text:'Delete Permanently',
                    onPress:() => {
                        //delete logic
                        const url = s_config.env.API_URL + '/reservations';

                        const headers = {};
                        headers[s_config.env.API_KEY_HEADER_NAME] = s_config.env.API_KEY;

                        const payload = {
                            ids:[item._id],
                        };

                        Axios.delete(url, {headers:headers, data:payload}).then(r => {
                            if(r.data.result === 'successful'){
                                setShowOptionsState(false);
                                Alert.alert('Successfully Deleted', 'The Reservation has been permanently deleted from the system.', [{text:'OK'}]);
                            }
                            else if(r.data.result === 'error_occured'){
                                Alert.alert('Error Occured!', r.data.message, [{'text':'OK'}]);
                            }
                        });
                    },
                },
            ]);
    }


    return (<View style={reservation_styles.reservationMainView} >
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
                    <View style={[global_styles.horizontalView, {marginVertical:10}]}>
                        <View style={{flex:1, alignItems:'flex-end'}}>
                            <Text style={[global_styles.bodyText, reservation_styles.reservationHeaderText, {marginRight:5}]}>{item.name}</Text>
                            <Text style={[global_styles.bodyText, reservation_styles.reservationBodyText, {marginRight:5}]}>{getTimeString(parse24HourTimeString(item.time), true)}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={[global_styles.bodyText, reservation_styles.reservationHeaderText, {textTransform:'uppercase', marginLeft:5}]}>{item.phoneNumber}</Text>
                            <Text style={[global_styles.bodyText, reservation_styles.reservationBodyText, {marginLeft:5}]}>{item.seats} Guests</Text>
                        </View>
                    </View>
                    <View style={global_styles.actionSheetContentDivider} />

                    <TouchableHighlight 
                        style={global_styles.actionSheetContentButton} 
                        activeOpacity={0.6}
                        underlayColor={appColors.content2}
                        onPress={reschedule}>
                        <Text style={global_styles.secondaryButtonText} >Reschedule Date/Time</Text>
                    </TouchableHighlight>
                    <View style={global_styles.actionSheetContentDivider} />

                    <TouchableHighlight 
                        style={global_styles.actionSheetContentButton} 
                        activeOpacity={0.6}
                        underlayColor={appColors.content2}
                        onPress={editGuests}>
                        <Text style={global_styles.secondaryButtonText} >Change Group Size</Text>
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
                        onPress={editPhoneNumber}>
                        <Text style={global_styles.secondaryButtonText} >Change Phone Number</Text>
                    </TouchableHighlight>
                    <View style={global_styles.actionSheetContentDivider} />

                    <TouchableHighlight 
                        style={global_styles.actionSheetContentButton} 
                        activeOpacity={0.6}
                        underlayColor={appColors.content2}
                        onPress={editTags}>
                        <Text style={global_styles.secondaryButtonText} >Change Tags</Text>
                    </TouchableHighlight>
                    <View style={global_styles.actionSheetContentDivider} />

                    <TouchableHighlight 
                        style={global_styles.actionSheetContentButton} 
                        activeOpacity={0.6}
                        underlayColor={appColors.content2}
                        onPress={editNotes}>
                        <Text style={global_styles.secondaryButtonText} >Edit Notes</Text>
                    </TouchableHighlight>
                    <View style={global_styles.actionSheetContentDivider} />

                    <TouchableHighlight 
                        style={global_styles.actionSheetContentButton} 
                        activeOpacity={0.6}
                        underlayColor={appColors.content2}
                        onPress={deleteReservation}>
                        <Text style={[global_styles.secondaryButtonText, {color:appColors.hexadic2}]} >Delete</Text>
                    </TouchableHighlight>
                </Animated.View>
            </View>
        </Modal>
        <View style={reservation_styles.reservationHeaderView}>
            <Text style={[global_styles.bodyText, reservation_styles.reservationHeaderText]} >{item.name}</Text>
            <TouchableHighlight 
                style={global_styles.iconButton} 
                activeOpacity={0.6}
                underlayColor={appColors.content2}
                onPress={() => setShowOptionsState(true)}>
                <Image style={global_styles.iconButtonImage} source={MoreVertIcon} />
            </TouchableHighlight>
        </View>
        <View style={reservation_styles.reservationHeaderView}>
            <Text style={[global_styles.bodyText, reservation_styles.reservationBodyText]} >{item.phoneNumber}</Text>
            <Text style={[global_styles.bodyText, reservation_styles.reservationBodyText]} >{item.seats} Guests</Text>
        </View>

        <View style={reservation_styles.reservationBodyView}>
            {item.tags && <TagViewer tags={item.tags} />}
        </View>
        <View style={reservation_styles.reservationBodyView}>
            {item.notes && <Text style={[global_styles.bodyCaption, reservation_styles.reservationNotesText]} >&ldquo;{item.notes}&rdquo;</Text>}
        </View>

        <View style={[global_styles.horizontalView, {justifyContent:'flex-start'}]}>
            {s_status === 'present' ? 
                <TouchableHighlight 
                    style={reservation_styles.reservationFooterButton} 
                    activeOpacity={0.6}
                    underlayColor={appColors.content2}
                    onPress={() => markStatusForReservation('present')} >
                    <>
                        <Image style={[global_styles.iconButtonImage, reservation_styles.presentButtonSelected]} source={PersonFilledIcon} />
                        <Text style={[global_styles.secondaryButtonText, reservation_styles.presentButtonSelectedText]} >Present</Text>
                    </>
                </TouchableHighlight> :
                <TouchableHighlight 
                    style={reservation_styles.reservationFooterButton} 
                    activeOpacity={0.6}
                    underlayColor={appColors.content2}
                    onPress={() => markStatusForReservation('present')} >
                    <>
                        <Image style={global_styles.iconButtonImage} source={PersonIcon} />
                        <Text style={[global_styles.secondaryButtonText]} >Present</Text>
                    </>
                </TouchableHighlight>}

            {s_status === 'absent' ? 
                <TouchableHighlight 
                    style={reservation_styles.reservationFooterButton} 
                    activeOpacity={0.6}
                    underlayColor={appColors.content2}
                    onPress={() => markStatusForReservation('absent')}>
                    <>
                        <Image style={[global_styles.iconButtonImage, reservation_styles.absentButtonSelected]} source={PersonOffFilledIcon} />
                        <Text style={[global_styles.secondaryButtonText, reservation_styles.absentButtonSelectedText]} >Absent</Text>
                    </>
                </TouchableHighlight> :
                <TouchableHighlight 
                    style={reservation_styles.reservationFooterButton} 
                    activeOpacity={0.6}
                    underlayColor={appColors.content2}
                    onPress={() => markStatusForReservation('absent')}>
                    <>
                        <Image style={global_styles.iconButtonImage} source={PersonOffIcon} />
                        <Text style={global_styles.secondaryButtonText} >Absent</Text>
                    </>
                </TouchableHighlight>}
        </View>
    </View>);
}