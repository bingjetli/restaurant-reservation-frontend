import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { appColors, getTimeString } from './common';
import time_picker_styles from './styles/time_picker_styles';

export default function({time, onSelect}){
    //helper-functions
    function to12Hour(hour){
        return hour < 12 ? hour : hour - 12;
    }

    //event-handlers
    function toggleTimeOfDay(){
        const time_copy = {...time};
        if(time_copy.hour < 12){
            //ante-meridian
            time_copy.hour += 12;
            onSelect(time_copy);
        }
        else{
            //post-meridian
            time_copy.hour -= 12;
            onSelect(time_copy);
        }
    }

    function setHour(hour){
        const time_copy = {...time};
        time_copy.hour = time_copy.hour < 12 ? hour : hour + 12;
        onSelect(time_copy);
    }

    function setMinute(minute){
        const time_copy = {...time};
        time_copy.minute = minute;
        onSelect(time_copy);
    }

    return (<View style={time_picker_styles.mainView}>
        <Text style={time_picker_styles.displayText}>{getTimeString(time, true)}</Text>
        <View style={time_picker_styles.pickerView}>
            <View style={time_picker_styles.hourView}>
                <View>
                    {[1, 2, 3, 4, 5, 6].map(i => <TouchableHighlight 
                        style={to12Hour(time.hour) === i ? time_picker_styles.pickerButtonSelected : time_picker_styles.pickerButton} 
                        activeOpacity={0.6}
                        underlayColor={appColors.iosSystemGray5.light}
                        onPress={() => setHour(i)}
                        key={i}>
                        <Text style={to12Hour(time.hour) === i ? time_picker_styles.pickerButtonSelectedText : time_picker_styles.pickerButtonText}>{i}</Text>
                    </TouchableHighlight>)}
                </View>
                <View>
                    {[7, 8, 9, 10, 11, 0].map(i => <TouchableHighlight 
                        style={to12Hour(time.hour) === i ? time_picker_styles.pickerButtonSelected : time_picker_styles.pickerButton} 
                        activeOpacity={0.6}
                        underlayColor={appColors.iosSystemGray5.light}
                        onPress={() => setHour(i)}
                        key={i}>
                        <Text style={to12Hour(time.hour) === i ? time_picker_styles.pickerButtonSelectedText : time_picker_styles.pickerButtonText}>{i === 0 ? 12 : i}</Text>
                    </TouchableHighlight>)}
                </View>
            </View>

            <View style={time_picker_styles.minuteView}>
                <View>
                    {[0, 5, 10, 15, 20, 25].map(i => <TouchableHighlight 
                        style={time.minute === i ? time_picker_styles.pickerButtonSelected : time_picker_styles.pickerButton} 
                        activeOpacity={0.6}
                        underlayColor={appColors.iosSystemGray5.light}
                        onPress={() => setMinute(i)}
                        key={i}>
                        <Text style={time.minute === i ? time_picker_styles.pickerButtonSelectedText : time_picker_styles.pickerButtonText}>{i < 10 ? '0' + i : i}</Text>
                    </TouchableHighlight>)}
                </View>
                <View>
                    {[30, 35, 40, 45, 50, 55].map(i => <TouchableHighlight 
                        style={time.minute === i ? time_picker_styles.pickerButtonSelected : time_picker_styles.pickerButton} 
                        activeOpacity={0.6}
                        underlayColor={appColors.iosSystemGray5.light}
                        onPress={() => setMinute(i)}
                        key={i}>
                        <Text style={time.minute === i ? time_picker_styles.pickerButtonSelectedText : time_picker_styles.pickerButtonText}>{i}</Text>
                    </TouchableHighlight>)}
                </View>
            </View>

            <View style={time_picker_styles.ampmView}>
                <TouchableHighlight 
                    style={time.hour < 12 ? time_picker_styles.pickerButtonSelected : time_picker_styles.pickerButton} 
                    activeOpacity={0.6}
                    underlayColor={appColors.iosSystemGray5.light}
                    onPress={toggleTimeOfDay}>
                    <Text style={time.hour < 12 ? time_picker_styles.pickerButtonSelectedText : time_picker_styles.pickerButtonText} >AM</Text>
                </TouchableHighlight>
                <TouchableHighlight 
                    style={time.hour >= 12 ? time_picker_styles.pickerButtonSelected : time_picker_styles.pickerButton} 
                    activeOpacity={0.6}
                    underlayColor={appColors.iosSystemGray5.light}
                    onPress={toggleTimeOfDay} >
                    <Text style={time.hour >= 12 ? time_picker_styles.pickerButtonSelectedText : time_picker_styles.pickerButtonText} >PM</Text>
                </TouchableHighlight>
            </View>
        </View>
    </View>);
}