import Axios from 'axios';
import { addDays, addMonths, addYears, eachDayOfInterval, endOfMonth, endOfWeek, format, formatISO, getDate, getMonth, startOfMonth, startOfWeek, subDays, subMonths, subYears } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { FadeInUp, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import ChevronLeftIcon from '../assets/icons/chevron_left.png';
import ChevronRightIcon from '../assets/icons/chevron_right.png';
import ExpandIcon from '../assets/icons/expand.png';
import GroupIcon from '../assets/icons/group.png';
import TodayIcon from '../assets/icons/today.png';
import { appColors, appSizes } from './common';
import getEnv from './env';

const ss = StyleSheet.create({
    mainView:{
        backgroundColor:appColors.iosSystemWhite.light,
    },
    collapsedView:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    setToTodayPressable:{
        minHeight:50,
        minWidth:50,
        //backgroundColor:appColors.iosSystemGray6.light,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
    },
    setToTodayIcon:{
        height:25,
        width:25,
        tintColor:appColors.main,
    },
    setToTodayText:{
        color:appColors.main,
    },
    showPickerPressable:{
        minHeight:50,
        minWidth:50,
        flexDirection:'row',
        alignItems:'center',
        //backgroundColor:appColors.iosSystemGray6.light,
    },
    selectedDateText:{
        fontSize:appSizes.large.body, //14 is the default
        marginRight:10,
        marginLeft:10,
        color:appColors.main,
    },
    showPickerIcon:{
        height:25,
        width:25,
        marginRight:10,
        tintColor:appColors.main,
    },
    calendarControlsView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
    },
    calendarControlsText:{
        fontSize:appSizes.large.body,
    },
    monthControlsView:{
        flexDirection:'row',
        alignItems:'center',
    },
    monthControlsPressable:{
        minHeight:50,
        minWidth:50,
        alignItems:'center',
        justifyContent:'center',
    },
    monthControlsIcon:{
        height:25,
        width:25,
        tintColor:appColors.main,
    },
    yearControlsView:{
        flexDirection:'row',
        alignItems:'center',
    },
    yearControlsPressable:{
        minHeight:50,
        minWidth:50,
        alignItems:'center',
        justifyContent:'center',
    },
    yearControlsIcon:{
        height:25,
        width:25,
        tintColor:appColors.main,
    },
    calendarView:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-evenly',
        alignItems:'center',
        marginBottom:10,
    },
    calendarHeaderText:{
        flexBasis:'14%',
        textAlign:'center',
        fontWeight:'bold',
        color:appColors.iosSystemGray.light,
    },
    datePressable:{
        flexBasis:'14%',
        aspectRatio:1,
        minHeight:50,
        minWidth:50,
        justifyContent:'center',
    },
    dateSelectedPressable:{
        flexBasis:'14%',
        aspectRatio:1,
        backgroundColor:appColors.main,
        borderRadius:10,
        minHeight:50,
        minWidth:50,
        justifyContent:'center',
    },
    dateText:{
        textAlign:'center',
        color:appColors.main,
        fontSize:appSizes.large.body,
    },
    dateSelectedText:{
        textAlign:'center',
        color:appColors.mainTextInvert,
        fontSize:appSizes.large.body,
    },
    totalGuestsView:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    totalGuestsText:{
        textAlign:'center',
        color:appColors.mainComplementary1,
        fontSize:appSizes.large.footnote,
    },
    totalGuestsSelectedText:{
        textAlign:'center',
        color:appColors.mainTextInvert,
        fontSize:appSizes.large.footnote,
    },
    totalGuestsIcon:{
        height:12,
        width:12,
        tintColor:appColors.mainComplementary1,
    },
    totalGuestsSelectedIcon:{
        height:12,
        width:12,
        tintColor:appColors.iosSystemWhite.light
    },
});

export default function CollapsibleDatePicker({date, onSelect, showPicker, onTogglePicker}){

    //state
    //const [s_show_picker, setShowPickerState] = useState(startExpanded ? true : false);
    const [s_total_guests_per_day, setTotalGuestsPerDayState] = useState({});

    //cached
    const c_calendar_dates = useMemo(() => { //returns the array of dates corresponding to the current month
        const dates_array = eachDayOfInterval({
            start:startOfWeek(startOfMonth(date)),
            end:endOfWeek(endOfMonth(date))
        });

        const current_month = getMonth(date);
        const current_date = getDate(date);

        return dates_array.map((date, date_i) => {
            if(getMonth(date) === current_month){
                const total_guests = s_total_guests_per_day[formatISO(date, {representation : 'date'})];
                if(current_date === getDate(date)) return (<TouchableHighlight
                    style={ss.dateSelectedPressable}
                    activeOpacity={0.6}
                    underlayColor={appColors.mainComplementary1}
                    onPress={() => onSelect(date)}
                    key={date_i} >
                    <>
                        <Text style={ss.dateSelectedText} > {getDate(date)} </Text>
                        <View style={ss.totalGuestsView} >
                            <Text style={ss.totalGuestsSelectedText} > {total_guests === undefined ? '0' : total_guests} </Text>
                            <Image style={ss.totalGuestsSelectedIcon} source={GroupIcon} />
                        </View>
                    </>
                </TouchableHighlight>);
                else return (<TouchableHighlight
                    style={ss.datePressable}
                    activeOpacity={0.6}
                    underlayColor={appColors.iosSystemGray5.light}
                    onPress={() => onSelect(date)}
                    key={date_i} >
                    <>
                        <Text style={ss.dateText} > {getDate(date)} </Text>
                        <View style={ss.totalGuestsView} >
                            <Text style={ss.totalGuestsText} > {total_guests === undefined ? '0' : total_guests} </Text>
                            <Image style={ss.totalGuestsIcon} source={GroupIcon} />
                        </View>
                    </>
                </TouchableHighlight>);
            }
            else{
                return (<Text style={ss.datePressable} key={date_i}></Text>);
            }
        });
    }, [date, s_total_guests_per_day]);

    //event-handlers
    function togglePicker(){
        if(onTogglePicker !== undefined){
            if(showPicker){
                //picker is shown, we want to hide it
                onTogglePicker(false);
            }
            else{
                //picker is hidden, we want to show it
                onTogglePicker(true);
                fetchReservationData();
            }
        }
    }

    function fetchReservationData(reference_date=date){
        const url = getEnv().API_URL + '/reservations?startDate=' + formatISO(startOfMonth(reference_date), {representation:'date'}) + '&endDate=' + formatISO(endOfMonth(reference_date), {representation:'date'});
        const headers = {};
        headers[getEnv().API_KEY_HEADER_NAME] = getEnv().API_KEY;

        Axios.get(url, {headers:headers}).then(r => {
            if(r.data.result === 'successful'){
                const month_total_seats = {};
                r.data.reservations.forEach(reservation => {
                    if(month_total_seats.hasOwnProperty(reservation.date)){
                        //exists, increment
                        month_total_seats[reservation.date] += reservation.seats;
                    }
                    else{
                        //undefined, set to 1
                        month_total_seats[reservation.date] = reservation.seats;
                    }
                });
                setTotalGuestsPerDayState(month_total_seats);
            }
            else if(r.data.result === 'not_found'){
                setTotalGuestsPerDayState({});
            }
            else if(r.data.result === 'error_occured'){
                Alert.alert('Error Occured!', r.data.message, [{'text':'OK'}]);
            }
        });
    }

    function previousMonth(){
        onSelect(subMonths(date, 1));
        fetchReservationData(subMonths(date, 1));
    }

    function nextMonth(){
        onSelect(addMonths(date, 1));
        fetchReservationData(addMonths(date, 1));
    }

    function previousYear(){
        onSelect(subYears(date, 1));
        fetchReservationData(subYears(date, 1));
    }

    function nextYear(){
        onSelect(addYears(date, 1));
        fetchReservationData(addYears(date, 1));
    }

    function setToTodaysDate(){
        //setShowPickerState(false);
        if(onTogglePicker !== undefined) onTogglePicker(false);
        onSelect(new Date());
    }

    //gestures-and-animations
    const sv_picker_max_height = useSharedValue(100);
    const sv_picker_opacity = useSharedValue(1);
    const sv_calendar_xoffset = useSharedValue(0);
    const sv_calendar_opacity = useSharedValue(1);
    const as_picker_view = useAnimatedStyle(() => {
        return {
            maxHeight:`${sv_picker_max_height.value}%`,
            opacity:sv_picker_opacity.value,
            overflow:'hidden',
        };
    });
    const as_calendar_view = useAnimatedStyle(() => {
        return {
            opacity:sv_calendar_opacity.value,
            transform:[
                {translateX: sv_calendar_xoffset.value},
            ],
        };
    });

    useEffect(() => { //run this whenever the picker visibility changes
        if(showPicker){
            sv_picker_max_height.value = withTiming(100, {duration:250});
            sv_picker_opacity.value = withTiming(1, {duration:500});
        }
        else{
            sv_picker_max_height.value = withTiming(0, {duration:250});
            sv_picker_opacity.value = withTiming(0, {duration:125});
        }
    }, [showPicker]);

    const g_pan_handler = Gesture.Pan().runOnJS(true)
    .onUpdate(e => {
        sv_calendar_xoffset.value = e.translationX;
        sv_calendar_opacity.value = (200 - Math.abs(e.translationX)) / 200;
    })
    .onEnd(e => {
        if(Math.abs(e.velocityX) > Math.abs(e.velocityY)){ //run this comparison once
            //horizontal gesture detected
            if(e.velocityX > 500 || e.translationX > 200){
                sv_calendar_xoffset.value = -250;
                sv_calendar_opacity.value = withTiming(1, {duration:250});
                sv_calendar_xoffset.value = withTiming(0, {duration:250});
                previousMonth();
            }
            else if(e.velocityX < -500 || e.translationX < -200){
                sv_calendar_xoffset.value = 250;
                sv_calendar_opacity.value = withTiming(1, {duration:250});
                sv_calendar_xoffset.value = withTiming(0, {duration:250});
                nextMonth();
            }
            else{
                sv_calendar_opacity.value = withTiming(1, {duration:250});
                sv_calendar_xoffset.value = withTiming(0, {duration:250});
            }
        }
    });

    return(
        <View style={ss.mainView}>
            <View style={ss.collapsedView}>
                <TouchableHighlight 
                    style={ss.showPickerPressable} 
                    activeOpacity={0.6}
                    underlayColor={appColors.iosSystemGray5.light}
                    onPress={togglePicker}>
                    <>
                        <Text style={ss.selectedDateText} >{format(date, 'PPPP')}</Text>
                        {showPicker ? 
                            <Image style={ss.showPickerIcon} source={ExpandIcon} /> :
                            <Image style={ss.showPickerIcon} source={ChevronLeftIcon} />}
                    </>
                </TouchableHighlight>
                <TouchableHighlight 
                    style={ss.setToTodayPressable} 
                    activeOpacity={0.6}
                    underlayColor={appColors.iosSystemGray5.light}
                    onPress={setToTodaysDate} >
                    <>
                        <Image style={ss.setToTodayIcon} source={TodayIcon} />
                        <Text style={ss.setToTodayText} >Today</Text>
                    </>
                </TouchableHighlight>
            </View>

            <GestureDetector gesture={g_pan_handler}>
                <Animated.View style={as_picker_view}>
                    <View style={ss.calendarControlsView}>
                        <View style={ss.monthControlsView}>
                            <TouchableHighlight 
                                style={ss.monthControlsPressable} 
                                activeOpacity={0.6}
                                underlayColor={appColors.iosSystemGray5.light}
                                onPress={() => previousMonth()} >
                                <Image style={ss.monthControlsIcon} source={ChevronLeftIcon} />
                            </TouchableHighlight>
                            <Text style={ss.calendarControlsText} >{format(date, 'MMMM')}</Text>
                            <TouchableHighlight 
                                style={ss.monthControlsPressable} 
                                activeOpacity={0.6}
                                underlayColor={appColors.iosSystemGray5.light}
                                onPress={() => nextMonth()} >
                                <Image style={ss.monthControlsIcon} source={ChevronRightIcon} />
                            </TouchableHighlight>
                        </View>
                        <View style={ss.yearControlsView}>
                            <TouchableHighlight 
                                style={ss.yearControlsPressable} 
                                activeOpacity={0.6}
                                underlayColor={appColors.iosSystemGray5.light}
                                onPress={() => previousYear()} >
                                <Image style={ss.yearControlsIcon} source={ChevronLeftIcon} />
                            </TouchableHighlight>
                            <Text style={ss.calendarControlsText} >{format(date, 'yyyy')}</Text>
                            <TouchableHighlight 
                                style={ss.yearControlsPressable} 
                                activeOpacity={0.6}
                                underlayColor={appColors.iosSystemGray5.light}
                                onPress={() => nextYear()} >
                                <Image style={ss.yearControlsIcon} source={ChevronRightIcon} />
                            </TouchableHighlight>
                        </View>
                    </View>
                    <Animated.View style={[ss.calendarView, as_calendar_view]}>
                        <Text style={ss.calendarHeaderText} >Sun</Text>
                        <Text style={ss.calendarHeaderText} >Mon</Text>
                        <Text style={ss.calendarHeaderText} >Tue</Text>
                        <Text style={ss.calendarHeaderText} >Wed</Text>
                        <Text style={ss.calendarHeaderText} >Thu</Text>
                        <Text style={ss.calendarHeaderText} >Fri</Text>
                        <Text style={ss.calendarHeaderText} >Sat</Text>
                        {c_calendar_dates}
                    </Animated.View>
                </Animated.View>
            </GestureDetector>
        </View>
    );
}