import Axios from 'axios';
import { formatISO } from 'date-fns';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import AppConfig from './AppConfig';
import { appColors, getTimeString, parse24HourTimeString } from './common';
import Reservation from './Reservation';
import global_styles from './styles/global_styles';
import reservation_styles from './styles/reservation_styles';

export default function({date, onSwipeLeft, onSwipeRight, onPress}){
    const [s_config, setConfigState] = useContext(AppConfig);

    //state
    const [s_is_fetching, setIsFetchingState] = useState(true);
    const [s_has_reservations, setHasReservationsState] = useState(false);
    const [s_reservations_by_time, setReservationsByTimeState] = useState({});

    //cached
    const c_tag_colors = useMemo(() => {
        const tag_colors = {};
        s_config.tagData.forEach(tag => { 
            tag_colors[tag.name] = tag.color;
        });
    }, [s_config]);

    const c_reservation_by_time_total_guests = useMemo(() => {
        const reservation_by_time_total_guests = {};

        Object.keys(s_reservations_by_time).forEach(time_section => {
            reservation_by_time_total_guests[time_section] = s_reservations_by_time[time_section].reduce((previous_return_value , current_item) => {
                return previous_return_value + current_item.seats;
            }, 0)
        });

        return reservation_by_time_total_guests;

    }, [s_reservations_by_time]);

    //side-effects
    useEffect(() => { //run this whenever date changes
        setIsFetchingState(true);

        const url = s_config.env.API_URL + '/reservations?startDate=' + formatISO(date, {representation:'date'});
        const headers = {};
        headers[s_config.env.API_KEY_HEADER_NAME] = s_config.env.API_KEY;

        //Alert.alert('Fetching...', `fetching from ${url} with ${process.env.API_KEY_HEADER_NAME}:${process.env.API_KEY}`, [{text:'OK'}]);
        
        Axios.get(url, {headers:headers}).then(r => {
            if(r.data.result === 'not_found'){
                setIsFetchingState(false);
                setHasReservationsState(false);
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

                setIsFetchingState(false);
                setHasReservationsState(true);
                setReservationsByTimeState(reservation_object_by_time);
            }
            else if(r.data.result === 'error_occured'){
                Alert.alert('Error Occured!', r.data.message, [{'text':'OK'}]);
            }
        });
    }, [date]);

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
    const g_pan_handler = Gesture.Pan().runOnJS(true)
    .onUpdate(e => {
        sv_x_offset.value = e.translationX;
        sv_opacity.value = (200 - Math.abs(e.translationX)) / 200;
    })
    .onEnd(e => {
        if(Math.abs(e.velocityX) > Math.abs(e.velocityY)){ //run this comparison once
            if(e.velocityX > 500 || e.translationX > 200){
                sv_x_offset.value = -250;
                sv_opacity.value = withTiming(1, {duration:250});
                sv_x_offset.value = withTiming(0, {duration:250});
                onSwipeRight();
            }
            else if(e.velocityX < -500 || e.translationX < -200){
                sv_x_offset.value = 250;
                sv_opacity.value = withTiming(1, {duration:250});
                sv_x_offset.value = withTiming(0, {duration:250});
                onSwipeLeft();
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

    return (<GestureDetector gesture={g_pan_handler}>
        <Animated.View style={[global_styles.fullView, as_main_view, {maxWidth:'100%', width:'100%', alignSelf:'center'}]} onStartShouldSetResponder={onPress}>
            <ScrollView>
                {s_has_reservations && Object.keys(s_reservations_by_time).sort().map(time_section => <View key={time_section}>
                    <View style={reservation_styles.sectionHeaderView} >
                        <Text style={[global_styles.bodySubHeading, reservation_styles.timeText]}>{getTimeString(parse24HourTimeString(time_section), true)}</Text>
                        <Text style={[global_styles.bodyText, reservation_styles.totalGuestsText]} >Total Guests: {c_reservation_by_time_total_guests[time_section]}</Text>
                    </View>
                    <View style={reservation_styles.reservationView}>
                        {s_reservations_by_time[time_section].map(reservation => <Reservation
                            item={reservation}
                            getTagColor={tag_name => c_tag_colors[tag_name]}
                            key={reservation._id} />)}
                    </View>
                </View>)}
                <View style={[global_styles.centeringView, reservation_styles.statusView]}>
                    <Text style={[global_styles.bodySubHeading, reservation_styles.statusText]}>{s_is_fetching ? 'Fetching reservations...' : 'That\'s all folks!'}</Text>
                    {s_is_fetching && <ActivityIndicator color={appColors.main} size='large' />}
                </View>
            </ScrollView>
        </Animated.View>
    </GestureDetector>);
}