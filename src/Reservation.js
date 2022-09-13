import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
import React, { useState } from 'react';
import { Alert, Image, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import MoreVertIcon from '../assets/icons/more_vert.png';
import PersonIcon from '../assets/icons/person.png';
import PersonOffIcon from '../assets/icons/person_off.png';
import { appColors, appSizes, getTimeString, parse24HourTimeString } from './common';
import getEnv from './env';
import TagViewer from './TagViewer';

const ss = StyleSheet.create({
    mainView:{
        marginBottom:5,
        backgroundColor:appColors.iosSystemWhite.light,
    },
    headerView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        //backgroundColor:'blue'
    },
    headerMainText:{
        fontSize:appSizes.large.title3,
        fontWeight:'bold',
        textTransform:'capitalize',
        color:appColors.mainText,
        marginLeft:10,
        //backgroundColor:'gray',
    },
    headerMainAlternateText:{
        fontSize:appSizes.large.title3,
        fontWeight:'bold',
        color:appColors.iosSystemGray.light,
        marginRight:10,
    },
    headerSecondaryText:{
        fontSize:appSizes.large.body,
        color:appColors.iosSystemGray.light,
        marginHorizontal:10,
    },
    optionsPressable:{
        minHeight:50,
        minWidth:50,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        //backgroundColor:'red',
    },
    optionsIcon:{
        width:25,
        height:25,
        tintColor:appColors.main,
    },
    bodyView:{
        marginTop:5,
        flexDirection:'row',
        flexWrap:'wrap',
        marginHorizontal:10,
    },
    bodyNotesText:{
        fontSize:appSizes.large.subhead,
        color:appColors.iosSystemGray.light,
    },
    footerView:{
        flex:1, //fill all available space
        flexDirection:'row',
    },
    footerPressable:{
        minHeight:50,
        minWidth:50,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        //backgroundColor:'red',
    },
    footerIcon:{
        height:25,
        width:25,
        tintColor:appColors.main,
    },
    footerAbsentSelectedIcon:{
        height:25,
        width:25,
        tintColor:appColors.iosSystemOrange.light,
    },
    footerPresentSelectedIcon:{
        height:25,
        width:25,
        tintColor:appColors.iosSystemGreen.light,
    },
    footerText:{
        color:appColors.main,
        fontSize:appSizes.large.body,
        marginLeft:5,
    },
    footerSelectedPresentText:{
        color:appColors.main,
        marginLeft:5,
        fontWeight:'bold',
        color:appColors.iosSystemGreen.light,
        fontSize:appSizes.large.body,
    },
    footerSelectedAbsentText:{
        color:appColors.main,
        marginLeft:5,
        fontWeight:'bold',
        color:appColors.iosSystemOrange.light,
        fontSize:appSizes.large.body,
    },
    optionsSheetModalView:{
        backgroundColor:appColors.iosSystemBlack.light + '44',
        flex:1,
        alignItems:'center'
    },
    optionsSheetView:{
        backgroundColor:appColors.iosSystemWhite.light,
        position:'absolute',
        bottom:110,
        minWidth:400,
        alignItems:'center',
        borderRadius:10,
    },
    optionsSheetHeaderView:{
        width:400,
        flexDirection:'row',
        justifyContent:'space-evenly',
        paddingVertical:10,
    },
    optionsSheetPressable:{
        minHeight:50,
        justifyContent:'center',
        width:'100%',
    },
    optionsSheetText:{
        fontSize:appSizes.large.body,
        textAlign:'center',
        color:appColors.main,
    },
    optionsSheetCancelPressable:{
        position:'absolute',
        bottom:50,
        backgroundColor:appColors.iosSystemWhite.light,
        minHeight:50,
        minWidth:400,
        borderRadius:10,
        justifyContent:'center',
    },
    optionsSheetCancelText:{
        fontSize:appSizes.large.body,
        textAlign:'center',
        color:appColors.main,
        margin:10,
    },
    divider:{
        width:'100%',
        height:2,
        backgroundColor:appColors.iosSystemGray5.light,
    },
});

export default function({item}){
    const navigation = useNavigation(); //hook to retreive navigation prop from nested component

    //states
    const [s_status, setStatusState] = useState(item.status);
    const [s_show_options, setShowOptionsState] = useState(false);

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
        const url = getEnv().API_URL + '/reservations';

        const headers = {};
        headers[getEnv().API_KEY_HEADER_NAME] = getEnv().API_KEY;

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

    function editNames(){
        setShowOptionsState(false);

        navigation.navigate({
            name:'edit-firstname',
            params:{
                id:item._id,
                firstName:item.firstName,
                lastName:item.lastName,
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
                        const url = getEnv().API_URL + '/reservations';

                        const headers = {};
                        headers[getEnv().API_KEY_HEADER_NAME] = getEnv().API_KEY;

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

    return (<View style={ss.mainView} >
        <Modal 
            visible={s_show_options} 
            animationType='fade' 
            transparent={true}
            onRequestClose={() => setShowOptionsState(false)}>
            <View style={ss.optionsSheetModalView} onStartShouldSetResponder={() => setShowOptionsState(false)}>
                <Animated.View style={ss.optionsSheetView} entering={FadeInDown} exiting={FadeOutDown}>
                    <View style={ss.optionsSheetHeaderView}>
                        <View>
                            <Text style={ss.headerMainText}>{item.firstName} {item.lastName}</Text>
                            <Text style={ss.headerSecondaryText}>{item.phoneNumber}</Text>
                        </View>
                        <View>
                            <Text style={ss.headerMainAlternateText}>{getTimeString(parse24HourTimeString(item.time), true)}</Text>
                            <Text style={ss.headerSecondaryText}>{item.seats} Guests</Text>
                        </View>
                    </View>
                    <View style={ss.divider} />

                    <TouchableHighlight 
                        style={ss.optionsSheetPressable} 
                        activeOpacity={0.6}
                        underlayColor={appColors.iosSystemGray5.light}
                        onPress={reschedule}>
                        <Text style={ss.optionsSheetText} >Reschedule Date/Time</Text>
                    </TouchableHighlight>
                    <View style={ss.divider} />

                    <TouchableHighlight 
                        style={ss.optionsSheetPressable} 
                        activeOpacity={0.6}
                        underlayColor={appColors.iosSystemGray5.light}
                        onPress={editGuests}>
                        <Text style={ss.optionsSheetText} >Change Amount Of Guests</Text>
                    </TouchableHighlight>
                    <View style={ss.divider} />

                    <TouchableHighlight 
                        style={ss.optionsSheetPressable} 
                        activeOpacity={0.6}
                        underlayColor={appColors.iosSystemGray5.light}
                        onPress={editNames}>
                        <Text style={ss.optionsSheetText} >Change Names</Text>
                    </TouchableHighlight>
                    <View style={ss.divider} />

                    <TouchableHighlight 
                        style={ss.optionsSheetPressable} 
                        activeOpacity={0.6}
                        underlayColor={appColors.iosSystemGray5.light}
                        onPress={editPhoneNumber}>
                        <Text style={ss.optionsSheetText} >Change Phone Number</Text>
                    </TouchableHighlight>
                    <View style={ss.divider} />

                    <TouchableHighlight 
                        style={ss.optionsSheetPressable} 
                        activeOpacity={0.6}
                        underlayColor={appColors.iosSystemGray5.light}
                        onPress={editTags}>
                        <Text style={ss.optionsSheetText} >Change Tags</Text>
                    </TouchableHighlight>
                    <View style={ss.divider} />

                    <TouchableHighlight 
                        style={ss.optionsSheetPressable} 
                        activeOpacity={0.6}
                        underlayColor={appColors.iosSystemGray5.light}
                        onPress={editNotes}>
                        <Text style={ss.optionsSheetText} >Edit Notes</Text>
                    </TouchableHighlight>
                    <View style={ss.divider} />

                    <TouchableHighlight 
                        style={ss.optionsSheetPressable} 
                        activeOpacity={0.6}
                        underlayColor={appColors.iosSystemGray5.light}
                        onPress={deleteReservation}>
                        <Text style={[ss.optionsSheetText, {color:appColors.iosSystemRed.light}]} >Delete</Text>
                    </TouchableHighlight>
                </Animated.View>
                <TouchableHighlight 
                    style={ss.optionsSheetCancelPressable} 
                    activeOpacity={0.6}
                    underlayColor={appColors.iosSystemGray5.light}
                    onPress={() => setShowOptionsState(false)}>
                    <Text style={ss.optionsSheetCancelText}>Cancel</Text>
                </TouchableHighlight>
            </View>
        </Modal>
        <View style={ss.headerView}>
            <Text style={ss.headerMainText} >{item.firstName} {item.lastName}</Text>
            <TouchableHighlight 
                style={ss.optionsPressable} 
                activeOpacity={0.6}
                underlayColor={appColors.iosSystemGray5.light}
                onPress={() => setShowOptionsState(true)}>
                <Image style={ss.optionsIcon} source={MoreVertIcon} />
            </TouchableHighlight>
        </View>
        <View style={ss.headerView}>
            <Text style={ss.headerSecondaryText} >{item.phoneNumber}</Text>
            <Text style={ss.headerSecondaryText} >{item.seats} Guests</Text>
        </View>

        <View style={ss.bodyView}>
            {item.tags && <TagViewer tags={item.tags} />}
        </View>
        <View style={ss.bodyView}>
            {item.notes && <Text style={ss.bodyNotesText} >“{item.notes}”</Text>}
        </View>

        <View style={ss.footerView}>
            {s_status === 'present' ? 
                <TouchableHighlight 
                    style={ss.footerPressable} 
                    activeOpacity={0.6}
                    underlayColor={appColors.iosSystemGray5.light}
                    onPress={() => markStatusForReservation('present')} >
                    <>
                        <Image style={ss.footerPresentSelectedIcon} source={PersonIcon} />
                        <Text style={ss.footerSelectedPresentText} >Present</Text>
                    </>
                </TouchableHighlight> :
                <TouchableHighlight 
                    style={ss.footerPressable} 
                    activeOpacity={0.6}
                    underlayColor={appColors.iosSystemGray5.light}
                    onPress={() => markStatusForReservation('present')} >
                    <>
                        <Image style={ss.footerIcon} source={PersonIcon} />
                        <Text style={ss.footerText} >Present</Text>
                    </>
                </TouchableHighlight>}

            {s_status === 'absent' ? 
                <TouchableHighlight 
                    style={ss.footerPressable} 
                    activeOpacity={0.6}
                    underlayColor={appColors.iosSystemGray5.light}
                    onPress={() => markStatusForReservation('absent')}>
                    <>
                        <Image style={ss.footerAbsentSelectedIcon} source={PersonOffIcon} />
                        <Text style={ss.footerSelectedAbsentText} >Absent</Text>
                    </>
                </TouchableHighlight> :
                <TouchableHighlight 
                    style={ss.footerPressable} 
                    activeOpacity={0.6}
                    underlayColor={appColors.iosSystemGray5.light}
                    onPress={() => markStatusForReservation('absent')}>
                    <>
                        <Image style={ss.footerIcon} source={PersonOffIcon} />
                        <Text style={ss.footerText} >Absent</Text>
                    </>
                </TouchableHighlight>}
        </View>
    </View>);
}