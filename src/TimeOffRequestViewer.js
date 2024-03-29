import Axios from 'axios';
import { formatISO } from 'date-fns';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Image, Text, View } from 'react-native';
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import GroupIcon from '../assets/icons/group.png';
import AppConfig from './AppConfig';
import { appColors, getTimeString, parse24HourTimeString } from './common';
import Reservation from './Reservation';
import global_styles from './styles/global_styles';
import reservation_styles from './styles/reservation_styles';
import time_off_request_styles from './styles/time_off_request_styles';
import TimeOffRequest from './TimeOffRequest';

let abort_controller; //this variable is accessible from every other instance of this component, luckily there should only be one of these active at any moment.

export default function({date, onSwipeLeft, onSwipeRight, onPress}){
    const [s_config, setConfigState] = useContext(AppConfig);

    //state
    const [s_data, setDataState] = useState({
        isFetching : true,
        timeOffRequests : [],
    });

    //const [s_reservations_by_time, setReservationsByTimeState] = useState({});

    //cached
    // const c_reservation_by_time_total_guests = useMemo(() => {
    //     const reservation_by_time_total_guests = {};

    //     Object.keys(s_reservations_by_time).forEach(time_section => {
    //         reservation_by_time_total_guests[time_section] = s_reservations_by_time[time_section].reduce((previous_return_value , current_item) => {
    //             return previous_return_value + current_item.seats;
    //         }, 0)
    //     });

    //     return reservation_by_time_total_guests;

    // }, [s_reservations_by_time]);

    //useMemo(() => { //run this whenever date changes, but before useEffect[date] runs
    //    if(s_is_fetching) if(abort_controller) abort_controller.abort(); //make sure the previous request is canceled before starting a new one, this fixes some jank while quickly swiping the viewer
    //    setHasDataState(false); //hide the previous reservations while we fetch the new reservations
    //    setIsFetchingState(true); //set fetching state to true

    //}, [date]);

    /** SIDE-EFFECTS */
    useEffect(fetchTimeOffRequests, [date]); //Fetch the time-off requests on initialization and whenever the date changes.

    function fetchTimeOffRequests(){
        const url = s_config.env.API_URL + '/time-off-requests?date=' + formatISO(date, {representation:'date'});
        //const url = s_config.env.API_URL + '/time-off-requests';
        const headers = {};
        headers[s_config.env.API_KEY_HEADER_NAME] = s_config.env.API_KEY;
        
        //abort_controller = new AbortController();
        Axios.get(url, {headers:headers}).then(r => {
            if(r.data.result === 'not_found'){
                const data_copy = {...s_data};
                data_copy.isFetching = false;
                setDataState(data_copy);
            }
            else if(r.data.result === 'successful'){
                const data_copy = {...s_data};
                data_copy.isFetching = false;
                data_copy.timeOffRequests = r.data.timeOffRequests;
                setDataState(data_copy);
            }
            else if(r.data.result === 'error_occured'){
                Alert.alert('Error Occured!', r.data.message, [{'text':'OK'}]);
            }
        }).catch(e => {
            if(e.message !== 'canceled') Alert.alert('Error Occured!', `An error occured while fetching data for the time-off request viewer. \n${e.message}`, [{'text':'OK'}]);
        });
    }

    //event-handlers
    function refresh(){
        fetchTimeOffRequests();
    }

    //gestures and animations
    //const sv_x_offset = useSharedValue(0);
    //const sv_opacity = useSharedValue(1);
    //const as_main_view = useAnimatedStyle(() => {
    //    return {
    //        opacity:sv_opacity.value,
    //        transform:[
    //            {translateX: sv_x_offset.value},
    //        ],
    //    };
    //});
    //const g_pan_handler_ui = Gesture.Pan()
    //.onUpdate(e => {
    //    sv_x_offset.value = e.translationX;
    //    sv_opacity.value = (s_config.screen.width / 2 - Math.abs(e.translationX)) / (s_config.screen.width / 2); //opacity is a ratio of how far the screen has traveled from the center over the width of the screen
    //})
    //.onEnd(e => {
    //    if(Math.abs(e.translationX) > Math.abs(e.translationY)){ //run this comparison once
    //        if(e.velocityX > 500 || e.translationX > s_config.screen.width * 0.25){
    //            sv_x_offset.value = s_config.screen.width / -2;
    //            sv_opacity.value = withTiming(1, {duration:250});
    //            sv_x_offset.value = withTiming(0, {duration:250});
    //        }
    //        else if(e.velocityX < -500 || e.translationX < s_config.screen.width * -0.25){
    //            sv_x_offset.value = s_config.screen.width / 2;
    //            sv_opacity.value = withTiming(1, {duration:250});
    //            sv_x_offset.value = withTiming(0, {duration:250});
    //        }
    //        else{
    //            //interpolate component back to normal, if swipe gesture isn't fully detected
    //            sv_opacity.value = withTiming(1, {duration:250});
    //            sv_x_offset.value = withTiming(0, {duration:250});
    //        }
    //    }
    //    else{
    //        //interpolate component back to normal, if swipe gesture isn't fully detected
    //        sv_opacity.value = withTiming(1, {duration:250});
    //        sv_x_offset.value = withTiming(0, {duration:250});
    //    }
    //});
    //const g_pan_handler_js = Gesture.Pan().runOnJS(true)
    //.onEnd(e => {
    //    if(Math.abs(e.translationX) > Math.abs(e.translationY)){ //run this comparison once
    //        if(e.velocityX > 500 || e.translationX > s_config.screen.width * 0.25){
    //            //onSwipeRight();
    //        }
    //        else if(e.velocityX < -500 || e.translationX < s_config.screen.width * -0.25){
    //            //onSwipeLeft();
    //        }
    //    }
    //});

    //return (<GestureDetector gesture={Gesture.Simultaneous(g_pan_handler_js, g_pan_handler_ui)}>
    //    <Animated.View style={[global_styles.fullView, as_main_view, {maxWidth:'100%', width:'100%', alignSelf:'center'}]} onStartShouldSetResponder={onPress}>
    //        <ScrollView>
    //            {s_has_data && Object.keys(s_reservations_by_time).sort().map(time_section => <View key={time_section}>
    //                <View style={reservation_styles.sectionHeaderView} >
    //                    <Text style={[global_styles.bodySubHeading, reservation_styles.timeText]}>{getTimeString(parse24HourTimeString(time_section), true)}</Text>
    //                    <View style={[global_styles.horizontalCenteringView, {marginRight:15}]}>
    //                        <Text style={[global_styles.bodyText, reservation_styles.totalGuestsText]} >{c_reservation_by_time_total_guests[time_section]} TOTAL</Text>
    //                        <Image style={[global_styles.iconButtonImage, reservation_styles.totalGuestsIconImage]} source={GroupIcon} />
    //                    </View>
    //                </View>
    //                <View style={reservation_styles.reservationView}>
    //                    {s_reservations_by_time[time_section].map(reservation => <Reservation
    //                        item={reservation}
    //                        getTagColor={tag_name => c_tag_colors[tag_name]}
    //                        key={reservation._id} />)}
    //                </View>
    //            </View>)}
    //            <View style={[global_styles.centeringView, reservation_styles.statusView]}>
    //                <Text style={[global_styles.bodySubHeading, reservation_styles.statusText]}>{s_is_fetching ? 'Fetching reservations...' : 'That' + '’' + 's all folks!'}</Text>
    //                {s_is_fetching && <ActivityIndicator color={appColors.main} size='large' />}
    //            </View>
    //        </ScrollView>
    //    </Animated.View>
    //</GestureDetector>);
    return (
        <ScrollView style={[global_styles.fullView, time_off_request_styles.viewerView]}>
            {s_data.timeOffRequests.length > 0 && s_data.timeOffRequests.map((item, item_n) => (
                <TimeOffRequest key={item_n} item={item} refreshViewer={refresh} />
            ))}
            <View style={[global_styles.centeringView, time_off_request_styles.viewerStatusView]}>
                <Text style={[global_styles.bodySubHeading, reservation_styles.statusText]}>{s_data.isFetching ? 'Fetching time-off requests...' : 'That' + '’' + 's all folks!'}</Text>
                {s_data.isFetching && <ActivityIndicator color={appColors.main} size='large' />}
            </View>
        </ScrollView>
    );
}