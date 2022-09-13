import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { appColors, appSizes, getTimeString } from './common';

const ss = StyleSheet.create({
    pickerView:{
        flexDirection:'row',
        alignItems:'center',
    },
    pickerPressable:{
        //backgroundColor:appColors.iosSystemGray4.light,
        minHeight:50,
        minWidth:50,
        borderRadius:25,
        justifyContent:'center',
    },
    pickerSelectedPressable:{
        backgroundColor:appColors.main,
        minHeight:50,
        minWidth:50,
        borderRadius:25,
        justifyContent:'center',
    },
    pickerText:{
        color:appColors.main,
        textAlign:'center',
        fontSize:appSizes.large.body,
    },
    pickerSelectedText:{
        color:appColors.iosSystemWhite.light,
        textAlign:'center',
        fontSize:appSizes.large.body,
        fontWeight:'bold',
    },
    ampmView:{
        justifyContent:'center',
        padding:10,
        borderColor:appColors.iosSystemGray4.light,
        borderWidth:1,
        borderStyle:'dashed',
        borderRadius:10,
        maxHeight:120,
        marginHorizontal:10,
    },
    hoursView:{
        flexDirection:'row',
        padding:10,
        borderColor:appColors.iosSystemGray4.light,
        borderWidth:1,
        borderStyle:'dashed',
        borderRadius:10,
        marginHorizontal:10,
    },
    minutesView:{
        flexDirection:'row',
        padding:10,
        borderColor:appColors.iosSystemGray4.light,
        borderWidth:1,
        borderStyle:'dashed',
        borderRadius:10,
        marginHorizontal:10,
    },
    displayText:{
        color:appColors.iosSystemGray.light,
        textAlign:'center',
        fontSize:appSizes.large.title1,
        fontWeight:'bold',
        marginVertical:10,
    },
});

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

    return (<View>
        <Text style={ss.displayText}>{getTimeString(time, true)}</Text>
        <View style={ss.pickerView}>
            <View style={ss.hoursView}>
                <View>
                    {[1, 2, 3, 4, 5, 6].map(i => <TouchableHighlight 
                        style={to12Hour(time.hour) === i ? ss.pickerSelectedPressable : ss.pickerPressable} 
                        activeOpacity={0.6}
                        underlayColor={appColors.iosSystemGray5.light}
                        onPress={() => setHour(i)}
                        key={i}>
                        <Text style={to12Hour(time.hour) === i ? ss.pickerSelectedText : ss.pickerText}>{i}</Text>
                    </TouchableHighlight>)}
                </View>
                <View>
                    {[7, 8, 9, 10, 11, 0].map(i => <TouchableHighlight 
                        style={to12Hour(time.hour) === i ? ss.pickerSelectedPressable : ss.pickerPressable} 
                        activeOpacity={0.6}
                        underlayColor={appColors.iosSystemGray5.light}
                        onPress={() => setHour(i)}
                        key={i}>
                        <Text style={to12Hour(time.hour) === i ? ss.pickerSelectedText : ss.pickerText}>{i === 0 ? 12 : i}</Text>
                    </TouchableHighlight>)}
                </View>
            </View>

            <View style={ss.minutesView}>
                <View>
                    {[0, 5, 10, 15, 20, 25].map(i => <TouchableHighlight 
                        style={time.minute === i ? ss.pickerSelectedPressable : ss.pickerPressable} 
                        activeOpacity={0.6}
                        underlayColor={appColors.iosSystemGray5.light}
                        onPress={() => setMinute(i)}
                        key={i}>
                        <Text style={time.minute === i ? ss.pickerSelectedText : ss.pickerText}>{i < 10 ? '0' + i : i}</Text>
                    </TouchableHighlight>)}
                </View>
                <View>
                    {[30, 35, 40, 45, 50, 55].map(i => <TouchableHighlight 
                        style={time.minute === i ? ss.pickerSelectedPressable : ss.pickerPressable} 
                        activeOpacity={0.6}
                        underlayColor={appColors.iosSystemGray5.light}
                        onPress={() => setMinute(i)}
                        key={i}>
                        <Text style={time.minute === i ? ss.pickerSelectedText : ss.pickerText}>{i}</Text>
                    </TouchableHighlight>)}
                </View>
            </View>

            <View style={ss.ampmView}>
                <TouchableHighlight 
                    style={time.hour < 12 ? ss.pickerSelectedPressable : ss.pickerPressable} 
                    activeOpacity={0.6}
                    underlayColor={appColors.iosSystemGray5.light}
                    onPress={toggleTimeOfDay}>
                    <Text style={time.hour < 12 ? ss.pickerSelectedText : ss.pickerText} >AM</Text>
                </TouchableHighlight>
                <TouchableHighlight 
                    style={time.hour >= 12 ? ss.pickerSelectedPressable : ss.pickerPressable} 
                    activeOpacity={0.6}
                    underlayColor={appColors.iosSystemGray5.light}
                    onPress={toggleTimeOfDay} >
                    <Text style={time.hour >= 12 ? ss.pickerSelectedText : ss.pickerText} >PM</Text>
                </TouchableHighlight>
            </View>
        </View>
    </View>);
}