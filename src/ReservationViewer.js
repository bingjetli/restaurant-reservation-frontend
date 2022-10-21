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

/** This variable can be accessed from every other instance
 * of this component, luckily there should only be one of 
 * these active at any moment.
 */
let abort_controller;

export default function({date, onSwipeLeft, onSwipeRight, onPress}){
    const [s_config, setConfigState] = useContext(AppConfig);

    /** STATE */
    const [s_data, setDataState] = useState({
        isFetching : true,
        hasReservations : false,
        reservationsByTime : [],
    });

    /** RENDER-TIME VARIABLES */
    const total_guests_by_time = {};

    /** RENDER-TIME OPERATIONS */
    Object.keys(s_data.reservationsByTime).forEach(time_section => {
        total_guests_by_time[time_section] = s_data.reservationsByTime[time_section].reduce((previous_value, current_item) => previous_value + current_item.seats, 0);
    });

    /** SIDE-EFFECTS */
    useEffect(() => {
        /** Make sure that the previous request is cancelled before
         * starting a new one, this fixes some jank that occurs
         * while quickly swiping the viewer.
         */
        s_data.isFetching && abort_controller && abort_controller.abort();

        /** Whenever the date changes and before fetching the
         * reservations from the backend, reset the hasReservations 
         * state and the isFetching state
         */
        const data_copy = {...s_data};
        data_copy.hasReservations = false;
        data_copy.isFetching = true;
        setDataState(data_copy);

        fetchReservations();
    }, [date]);

    function fetchReservations(){
        const url = s_config.env.API_URL + '/reservations?startDate=' + formatISO(date, {representation:'date'});
        const headers = {};
        headers[s_config.env.API_KEY_HEADER_NAME] = s_config.env.API_KEY;
        
        abort_controller = new AbortController();
        Axios.get(url, {headers:headers, signal:abort_controller.signal}).then(r => {
            if(r.data.result === 'not_found'){
                const data_copy = {...s_data};
                data_copy.hasReservations = false;
                data_copy.isFetching = false;
                setDataState(data_copy);
            }
            else if(r.data.result === 'successful'){
                //[{date, time, ...}, {date, time, ...}, ...] -> {time1 : [{date, time, ...}, {date, time, ...}, ...], time2 : { ... }}
                const reservation_object_by_time = {};

                r.data.reservations.forEach(reservation => {
                    if(!reservation_object_by_time.hasOwnProperty(reservation.time)){
                        //this property does not exist in this object, so we need to initialize it
                        reservation_object_by_time[reservation.time] = [];
                    }
                    reservation_object_by_time[reservation.time].push(reservation);
                });

                const data_copy = {...s_data};
                data_copy.hasReservations = true;
                data_copy.isFetching = false;
                data_copy.reservationsByTime = reservation_object_by_time;
                setDataState(data_copy);
            }
            else if(r.data.result === 'error_occured'){
                Alert.alert('Error Occured!', r.data.message, [{'text':'OK'}]);
            }
        }).catch(e => {
            if(e.message !== 'canceled') Alert.alert('Error Occured!', `An error occured while fetching reservations for the Reservation Viewer. \n${e}`, [{'text':'OK'}]);
        });
    }


    //event-handlers
    function refresh(){
        fetchReservations();
    }

    //gestures and animations
    const sv_x_offset = useSharedValue(0);
    const sv_opacity = useSharedValue(1);
    const as_main_view = useAnimatedStyle(() => {
        return {
            opacity:sv_opacity.value,
            transform:[
                {translateX: sv_x_offset.value},
            ],
        };
    });
    const g_pan_handler_ui = Gesture.Pan()
    .onUpdate(e => {
        sv_x_offset.value = e.translationX;
        sv_opacity.value = (s_config.screen.width / 2 - Math.abs(e.translationX)) / (s_config.screen.width / 2); //opacity is a ratio of how far the screen has traveled from the center over the width of the screen
    })
    .onEnd(e => {
        if(Math.abs(e.translationX) > Math.abs(e.translationY)){ //run this comparison once
            if(e.velocityX > 500 || e.translationX > s_config.screen.width * 0.25){
                sv_x_offset.value = s_config.screen.width / -2;
                sv_opacity.value = withTiming(1, {duration:250});
                sv_x_offset.value = withTiming(0, {duration:250});
            }
            else if(e.velocityX < -500 || e.translationX < s_config.screen.width * -0.25){
                sv_x_offset.value = s_config.screen.width / 2;
                sv_opacity.value = withTiming(1, {duration:250});
                sv_x_offset.value = withTiming(0, {duration:250});
            }
            else{
                //interpolate component back to normal, if swipe gesture isn't fully detected
                sv_opacity.value = withTiming(1, {duration:250});
                sv_x_offset.value = withTiming(0, {duration:250});
            }
        }
        else{
            //interpolate component back to normal, if swipe gesture isn't fully detected
            sv_opacity.value = withTiming(1, {duration:250});
            sv_x_offset.value = withTiming(0, {duration:250});
        }
    });
    const g_pan_handler_js = Gesture.Pan().runOnJS(true)
    .onEnd(e => {
        if(Math.abs(e.translationX) > Math.abs(e.translationY)){ //run this comparison once
            if(e.velocityX > 500 || e.translationX > s_config.screen.width * 0.25){
                onSwipeRight();
            }
            else if(e.velocityX < -500 || e.translationX < s_config.screen.width * -0.25){
                onSwipeLeft();
            }
        }
    });

    return (<GestureDetector gesture={Gesture.Simultaneous(g_pan_handler_js, g_pan_handler_ui)}>
        <Animated.View style={[global_styles.fullView, as_main_view, {maxWidth:'100%', width:'100%', alignSelf:'center'}]} onStartShouldSetResponder={onPress}>
            <ScrollView>
                {s_data.hasReservations && Object.keys(s_data.reservationsByTime).sort().map(time_section => <View key={time_section}>
                    <View style={reservation_styles.sectionHeaderView} >
                        <Text style={[global_styles.bodySubHeading, reservation_styles.timeText]}>{getTimeString(parse24HourTimeString(time_section), true)}</Text>
                        <View style={[global_styles.horizontalCenteringView, {marginRight:15}]}>
                            <Text style={[global_styles.bodyText, reservation_styles.totalGuestsText]} >{total_guests_by_time[time_section]} TOTAL</Text>
                            <Image style={[global_styles.iconButtonImage, reservation_styles.totalGuestsIconImage]} source={GroupIcon} />
                        </View>
                    </View>
                    <View style={reservation_styles.reservationView}>
                        {s_data.reservationsByTime[time_section].map(reservation => <Reservation
                            item={reservation}
                            refreshViewer={refresh}
                            key={reservation._id} />)}
                    </View>
                </View>)}
                <View style={[global_styles.centeringView, reservation_styles.statusView]}>
                    <Text style={[global_styles.bodySubHeading, reservation_styles.statusText]}>{s_data.isFetching ? 'Fetching reservations...' : 'That' + '’' + 's all folks!'}</Text>
                    {s_data.isFetching && <ActivityIndicator color={appColors.main} size='large' />}
                </View>
            </ScrollView>
        </Animated.View>
    </GestureDetector>);
}