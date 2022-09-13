import { addMonths, addYears, eachDayOfInterval, endOfMonth, endOfWeek, format, getDate, getMonth, startOfMonth, startOfWeek, subMonths, subYears } from 'date-fns';
import React, { useMemo, useRef, useState } from 'react';
import { Image, Modal, Text, View } from 'react-native';
import { Gesture, GestureDetector, gestureHandlerRootHOC, TouchableHighlight } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import ChevronLeftIcon from '../assets/icons/chevron_left.png';
import ChevronRightIcon from '../assets/icons/chevron_right.png';
import GroupIcon from '../assets/icons/group.png';
import TodayIcon from '../assets/icons/today.png';
import { appColors } from './common';
import date_picker_styles from './styles/date_picker_styles';
import global_styles from './styles/global_styles';

const DatePicker = gestureHandlerRootHOC(({date, onSelect, yOffset, xOffset, s_show_picker, setShowPickerState}) => {
    //state
    const [s_show_total_guests, setShowTotalGuestsState] = useState(false);

    //cached
    const c_dates_array = useMemo(() => {
        const dates_array = eachDayOfInterval({
            start:startOfWeek(startOfMonth(date)),
            end:endOfWeek(endOfMonth(date))
        });
        
        return dates_array;
    }, [date]);

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
        setShowTotalGuestsState(!s_show_total_guests);
    }
    function togglePicker(){
        setShowPickerState(!s_show_picker);
    }

    //gestures-and-animations
    const sv_calendar_xoffset = useSharedValue(0);
    const sv_calendar_opacity = useSharedValue(1);
    const as_calendar_view = useAnimatedStyle(() => {
        return {
            opacity:sv_calendar_opacity.value,
            transform:[
                {translateX: sv_calendar_xoffset.value},
            ],
        };
    });

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

    return (<View>
        <View style={[date_picker_styles.modalView, {marginTop:yOffset}]}>
            <TouchableHighlight 
                style={{minHeight:50, minWidth:250,}}
                activeOpacity={0.6}
                underlayColor={appColors.iosSystemGray6.light}
                onPress={togglePicker}>
            </TouchableHighlight>
            <View style={date_picker_styles.pickerView}>
                <View style={[date_picker_styles.controlsView]}>
                    <View style={global_styles.horizontalCenteringView}>
                        <TouchableHighlight
                            style={global_styles.iconButton}
                            activeOpacity={0.6}
                            underlayColor={appColors.iosSystemGray6.light}
                            onPress={previousMonth}>
                            <Image style={[global_styles.iconButtonImage]} source={ChevronLeftIcon} />
                        </TouchableHighlight>

                        <Text style={[date_picker_styles.controlsText, date_picker_styles.monthNameText]}>{format(date, 'MMM')}</Text>

                        <TouchableHighlight 
                            style={global_styles.iconButton}
                            activeOpacity={0.6}
                            underlayColor={appColors.iosSystemGray6.light}
                            onPress={nextMonth}>
                            <Image style={[global_styles.iconButtonImage]} source={ChevronRightIcon} />
                        </TouchableHighlight>
                    </View>

                    <View style={global_styles.horizontalCenteringView}>
                        <TouchableHighlight
                            style={global_styles.iconButton}
                            activeOpacity={0.6}
                            underlayColor={appColors.iosSystemGray6.light}
                            onPress={previousYear}>
                            <Image style={[global_styles.iconButtonImage]} source={ChevronLeftIcon} />
                        </TouchableHighlight>

                        <Text style={date_picker_styles.controlsText}>{format(date, 'yyyy')}</Text>

                        <TouchableHighlight
                            style={global_styles.iconButton}
                            activeOpacity={0.6}
                            underlayColor={appColors.iosSystemGray6.light}
                            onPress={nextYear}>
                            <Image style={[global_styles.iconButtonImage]} source={ChevronRightIcon} />
                        </TouchableHighlight>
                    </View>

                    <TouchableHighlight 
                        style={global_styles.iconButton}
                        activeOpacity={0.6}
                        underlayColor={appColors.iosSystemGray6.light}
                        onPress={setToToday}>
                        <Image style={global_styles.iconButtonImage} source={TodayIcon} />
                    </TouchableHighlight>

                    <TouchableHighlight 
                        style={global_styles.iconButton}
                        activeOpacity={0.6}
                        underlayColor={appColors.iosSystemGray6.light}
                        onPress={toggleTotalGuestsView}>
                        <Image style={global_styles.iconButtonImage} source={GroupIcon} />
                    </TouchableHighlight>
                </View>
                <GestureDetector gesture={g_pan_handler}>
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
                                underlayColor={appColors.iosSystemGray6.light}
                                onPress={() => onSelect(item)}>
                                <Text style={getDate(date) === getDate(item) ? date_picker_styles.dateButtonTextSelected : date_picker_styles.dateButtonText}>{getDate(item)}</Text>
                            </TouchableHighlight>}
                        </View>))}
                    </Animated.View>
                </GestureDetector>
            </View>
        </View>
    </View>);
});

export default function({date, onSelect}){
    //state
    const [s_show_picker, setShowPickerState] = useState(false);

    //refs
    const r_layout = useRef({
        layout:{
            width:0,
            height:0,
            y:0,
            x:0,
        },
        target:null,
    });

    function handleLayout({nativeEvent}){
        r_layout.current = nativeEvent;
        console.log(r_layout.current);
    }
    function togglePicker(){
        setShowPickerState(!s_show_picker);
    }

    return(<View onLayout={handleLayout}>
        <View style={[global_styles.horizontalCenteringView, {backgroundColor:'ghostwhite'}]}>
            <TouchableHighlight 
                style={date_picker_styles.pickerButton}
                activeOpacity={0.6}
                underlayColor={appColors.iosSystemGray6.light}
                onPress={togglePicker}>
                <Text style={date_picker_styles.pickerButtonText}>{format(date, 'PPPP')}</Text>
            </TouchableHighlight>
        </View>
        <Modal
            visible={s_show_picker} 
            transparent={true}
            onRequestClose={() => setShowPickerState(false)}>
                <DatePicker 
                    date={date} 
                    onSelect={onSelect} 
                    yOffset={r_layout.current.layout.y - r_layout.current.layout.height / 2} 
                    xOffset={0} 
                    s_show_picker={s_show_picker} 
                    setShowPickerState={setShowPickerState}/>
        </Modal>
    </View>);
}