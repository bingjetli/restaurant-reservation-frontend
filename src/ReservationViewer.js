import { formatISO } from 'date-fns';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, PanResponder, StyleSheet, Text, View } from 'react-native';
import AppConfig from './AppConfig';
import getEnv from './env';
import Axios from 'axios';
import Reservation from './Reservation';
import { appColors, appSizes, getTimeString, parse24HourTimeString } from './common';
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const ss = StyleSheet.create({
    mainView:{
        flex:1,
        marginTop:5,
    },
    statusView:{
        minHeight:100,
        justifyContent:'center',
    },
    statusText:{
        textAlign:'center',
        fontSize:appSizes.large.body,
        color:appColors.iosSystemGray.light,
    },
    sectionHeaderView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'baseline',
        marginTop:10,
    },
    timeText:{
        color:appColors.iosSystemGray.light,
        fontSize:appSizes.large.title2,
        marginLeft:10,
    },
    totalGuestsText:{
        color:appColors.iosSystemGray.light,
        fontSize:appSizes.large.body,
        marginRight:10,
    }
});

export default function({date, fetchCounter, onSwipeLeft, onSwipeRight, onPress}){
    const app_config = useContext(AppConfig);

    //state
    const [s_is_fetching, setIsFetchingState] = useState(true);
    const [s_has_reservations, setHasReservationsState] = useState(false);
    const [s_reservations_by_time, setReservationsByTimeState] = useState({});

    //cached
    const c_tag_colors = useMemo(() => {
        const tag_colors = {};
        app_config.tagData.forEach(tag => {
            tag_colors[tag.name] = tag.color;
        });
    }, [app_config]);

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

        const url = getEnv().API_URL + '/reservations?startDate=' + formatISO(date, {representation:'date'});
        const headers = {};
        headers[getEnv().API_KEY_HEADER_NAME] = getEnv().API_KEY;
        
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
    }, [date, fetchCounter]);

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
                sv_opacity.value = withTiming(1, {duration:250});
                sv_x_offset.value = withTiming(0, {duration:250});
            }
        }
    });

    return (<GestureDetector gesture={g_pan_handler}>
        <Animated.View style={[ss.mainView, as_main_view]} onStartShouldSetResponder={onPress}>
            <ScrollView>
                {s_has_reservations && Object.keys(s_reservations_by_time).sort().map(time_section => <View key={time_section}>
                    <View style={ss.sectionHeaderView} >
                        <Text style={ss.timeText}>{getTimeString(parse24HourTimeString(time_section), true)}</Text>
                        <Text style={ss.totalGuestsText} >Total Guests: {c_reservation_by_time_total_guests[time_section]}</Text>
                    </View>
                    {s_reservations_by_time[time_section].map(reservation => <Reservation
                        item={reservation}
                        getTagColor={tag_name => c_tag_colors[tag_name]}
                        key={reservation._id} />)}
                </View>)}
                <View style={ss.statusView}>
                    <Text style={ss.statusText}>{s_is_fetching ? 'Fetching reservations...' : 'That\'s all folks!'}</Text>
                    {s_is_fetching && <ActivityIndicator color={appColors.main} size='large' />}
                </View>
            </ScrollView>
        </Animated.View>
    </GestureDetector>);
}