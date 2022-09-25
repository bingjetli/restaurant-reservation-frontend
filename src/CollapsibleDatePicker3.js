import { addMonths, addYears, eachDayOfInterval, endOfMonth, endOfWeek, format, formatISO, getDate, getDay, getMonth, getYear, startOfMonth, startOfWeek, subMonths, subYears } from 'date-fns';
import React, { useMemo, useState, useEffect, useContext } from 'react';
import { Image, Text, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector, TouchableHighlight } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import ChevronLeftIcon from '../assets/icons/chevron_left.png';
import ChevronRightIcon from '../assets/icons/chevron_right.png';
import GroupIcon from '../assets/icons/group.png';
import GroupFilledIcon from '../assets/icons/group_filled.png';
import TodayIcon from '../assets/icons/today.png';
import { appColors } from './common';
import date_picker_styles from './styles/date_picker_styles';
import global_styles from './styles/global_styles';
import Axios from 'axios';
import AppConfig from './AppConfig';

let abort_controller; //this is shared with all instances of this component, but it should be fine since we should only have one of these active at any given point in time

export default function({date, onSelect, isVisible}){
    const {height, width} = useWindowDimensions();
    const [s_config, setConfigState] = useContext(AppConfig);

    //state
    const [s_show_total_guests, setShowTotalGuestsState] = useState(false);
    const [s_reservation_data, setReservationData] = useState({date:undefined, total_guests:undefined});

    //cached
    const c_dates_array = useMemo(() => {
        const dates_array = eachDayOfInterval({
            start:startOfWeek(startOfMonth(date)),
            end:endOfWeek(endOfMonth(date))
        });
        
        return dates_array;
    }, [date]);

    useMemo(() => {
        //cancel the previous request before running the current one
        if(abort_controller) abort_controller.abort();
    }, [date]);

    //side-effects
    useEffect(fetchReservationData, [date]); //attempt to update the reservation data whenever the date changes, this only performs a GET request if the month or year is different

    //event-handler
    function nextMonth(){
        onSelect(addMonths(date, 1));
    }
    function previousMonth(){
        onSelect(subMonths(date, 1));
    }
    function nextYear(){
        onSelect(addYears(date, 1));
    }
    function previousYear(){
        onSelect(subYears(date, 1));
    }
    function setToToday(){
        onSelect(new Date());
    }
    function toggleTotalGuestsView(){
        if(s_show_total_guests === false){
            //send a get request if we're about to flip it
            fetchReservationData();
        }
        setShowTotalGuestsState(!s_show_total_guests);
    }

    //helper-functions
    function fetchReservationData(){

        //we'll only fetch the data if the month or year changed
        if(getMonth(s_reservation_data.date) !== getMonth(date) || getYear(s_reservation_data.date) !== getYear(date)){
            //if the month or year from the cached reservation data is not the same as the current date, run the get request
            const url = s_config.env.API_URL + '/reservations?startDate=' + formatISO(startOfMonth(date), {representation:'date'}) + '&endDate=' + formatISO(endOfMonth(date), {representation:'date'});
            const headers = {};
            headers[s_config.env.API_KEY_HEADER_NAME] = s_config.env.API_KEY;

            //reset the abort_controller
            abort_controller = new AbortController();

            Axios.get(url, {headers:headers, signal:abort_controller.signal}).then(r => {
                const reservation_data = {
                    date:date,
                    total_guests:{},
                };

                if(r.data.result === 'successful'){
                    r.data.reservations.forEach(reservation => {
                        if(reservation_data.total_guests.hasOwnProperty(reservation.date)){
                            //exists, increment
                            reservation_data.total_guests[reservation.date] += reservation.seats;
                        }
                        else{
                            //undefined, set to 1
                            reservation_data.total_guests[reservation.date] = reservation.seats;
                        }
                    });
                    setReservationData(reservation_data);
                }
                else if(r.data.result === 'not_found'){
                    setReservationData(reservation_data);
                }
                else if(r.data.result === 'error_occured'){
                    Alert.alert('Error Occured!', r.data.message, [{'text':'OK'}]);
                }
            }).catch(e => {
                console.log(e);
            });
        }
    }

    //gestures-and-animations
    //---shared-values
    const sv_calendar_xoffset = useSharedValue(0);
    const sv_calendar_opacity = useSharedValue(1);

    //---animated-styles
    const as_calendar_view = useAnimatedStyle(() => {
        return {
            opacity:sv_calendar_opacity.value,
            transform:[
                {translateX: sv_calendar_xoffset.value},
            ],
        };
    });
    const as_picker_view = useAnimatedStyle(() => {
        return {
            maxHeight:withTiming(isVisible ? 500 : 0, {duration:250}),
            opacity: withTiming(isVisible ? 1 : 0, {duration: 250}),
            paddingBottom: withTiming(isVisible ? 20 : 0, {duration:250}),
            overflow:'hidden',
        };
    });

    const g_pan_handler_ui = Gesture.Pan()
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
            }
            else if(e.velocityX < -500 || e.translationX < -200){
                sv_calendar_xoffset.value = 250;
                sv_calendar_opacity.value = withTiming(1, {duration:250});
                sv_calendar_xoffset.value = withTiming(0, {duration:250});
            }
            else{
                //interpolate component back to normal, if swipe gesture isn't fully detected
                sv_calendar_opacity.value = withTiming(1, {duration:250});
                sv_calendar_xoffset.value = withTiming(0, {duration:250});
            }
        }
        else{
            //interpolate component back to normal, if swipe gesture isn't fully detected
            sv_calendar_opacity.value = withTiming(1, {duration:250});
            sv_calendar_xoffset.value = withTiming(0, {duration:250});
        }
    });
    const g_pan_handler_js = Gesture.Pan().runOnJS(true)
    .onEnd(e => {
        if(Math.abs(e.velocityX) > Math.abs(e.velocityY)){ //run this comparison once
            //horizontal gesture detected
            if(e.velocityX > 500 || e.translationX > 200){
                previousMonth();
            }
            else if(e.velocityX < -500 || e.translationX < -200){
                nextMonth();
            }
        }
    });

    return(<View style={{flexDirection:'row-reverse', backgroundColor:appColors.content, justifyContent:'center', borderBottomColor:appColors.content3, borderBottomWidth:1}}>

        {width / 400 >= 1.5 && <Animated.View style={[{flex:1, justifyContent:'center', alignItems:'center'}, as_picker_view]}>
            <Text style={{color:appColors.text4, fontSize:125, textAlign:'center', fontFamily:'PTSans-Regular'}}>{getDate(date)}</Text>
            <Text style={{color:appColors.text4, fontSize:25, textAlign:'center', fontFamily:'PTSans-Regular', textTransform:'uppercase'}}>{format(date, 'EEEE')}</Text>
        </Animated.View>}

        <Animated.View style={[date_picker_styles.pickerMainView, as_picker_view]}>
            <View style={date_picker_styles.controlsView}>
                <View style={global_styles.horizontalCenteringView}>
                    <TouchableHighlight
                        style={global_styles.iconButton}
                        activeOpacity={0.6}
                        underlayColor={appColors.content2}
                        onPress={previousMonth}>
                        <Image style={[global_styles.iconButtonImage]} source={ChevronLeftIcon} />
                    </TouchableHighlight>

                    <Text style={[date_picker_styles.controlsText, date_picker_styles.monthNameText]}>{format(date, 'MMM')}</Text>

                    <TouchableHighlight 
                        style={global_styles.iconButton}
                        activeOpacity={0.6}
                        underlayColor={appColors.content2}
                        onPress={nextMonth}>
                        <Image style={[global_styles.iconButtonImage]} source={ChevronRightIcon} />
                    </TouchableHighlight>
                </View>

                <View style={global_styles.horizontalCenteringView}>
                    <TouchableHighlight
                        style={global_styles.iconButton}
                        activeOpacity={0.6}
                        underlayColor={appColors.content2}
                        onPress={previousYear}>
                        <Image style={[global_styles.iconButtonImage]} source={ChevronLeftIcon} />
                    </TouchableHighlight>

                    <Text style={date_picker_styles.controlsText}>{format(date, 'yyyy')}</Text>

                    <TouchableHighlight
                        style={global_styles.iconButton}
                        activeOpacity={0.6}
                        underlayColor={appColors.content2}
                        onPress={nextYear}>
                        <Image style={[global_styles.iconButtonImage]} source={ChevronRightIcon} />
                    </TouchableHighlight>
                </View>

                <TouchableHighlight 
                    style={global_styles.iconButton}
                    activeOpacity={0.6}
                    underlayColor={appColors.content2}
                    onPress={setToToday}>
                    <Image style={global_styles.iconButtonImage} source={TodayIcon} />
                </TouchableHighlight>

                <TouchableHighlight 
                    style={global_styles.iconButton}
                    activeOpacity={0.6}
                    underlayColor={appColors.content2}
                    onPress={toggleTotalGuestsView}>
                    <Image style={global_styles.iconButtonImage} source={s_show_total_guests ? GroupFilledIcon : GroupIcon} />
                </TouchableHighlight>
            </View>
            <GestureDetector gesture={Gesture.Simultaneous(g_pan_handler_ui, g_pan_handler_js)}>
                <Animated.View style={[date_picker_styles.calendarView, as_calendar_view]}>
                    <Text style={date_picker_styles.dayNameText}>Sun</Text>
                    <Text style={date_picker_styles.dayNameText}>Mon</Text>
                    <Text style={date_picker_styles.dayNameText}>Tue</Text>
                    <Text style={date_picker_styles.dayNameText}>Wed</Text>
                    <Text style={date_picker_styles.dayNameText}>Thu</Text>
                    <Text style={date_picker_styles.dayNameText}>Fri</Text>
                    <Text style={date_picker_styles.dayNameText}>Sat</Text>
                    {c_dates_array.map((item, item_i) => (<View style={date_picker_styles.dateView} key={item_i}>
                        {getMonth(date) === getMonth(item) && <TouchableHighlight 
                            style={getDate(date) === getDate(item) ? date_picker_styles.dateButtonSelected : date_picker_styles.dateButton}
                            activeOpacity={0.6}
                            underlayColor={appColors.content2}
                            onPress={() => onSelect(item)}>
                            <Text style={getDate(date) === getDate(item) ? 
                                date_picker_styles.dateButtonTextSelected : 
                                date_picker_styles.dateButtonText}>{s_show_total_guests && s_reservation_data.total_guests !== undefined ? 
                                    s_reservation_data.total_guests[formatISO(item, {representation:'date'})] === undefined ? 
                                        '-' : 
                                        s_reservation_data.total_guests[formatISO(item, {representation:'date'})]: 
                                    getDate(item)}</Text>
                        </TouchableHighlight>}
                    </View>))}
                </Animated.View>
            </GestureDetector>
        </Animated.View>
    </View>);
}