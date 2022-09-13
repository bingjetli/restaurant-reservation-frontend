import React from 'react';
import { Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { appColors, appSizes, getTimeString, parse24HourTimeString } from './common';
import global_styles from './styles/global_styles';
import reservation_styles from './styles/reservation_styles';
import TagViewer from './TagViewer';

const ss = StyleSheet.create({
    mainPressable:{
        marginBottom:5,
        backgroundColor:appColors.iosSystemWhite.light,
        borderColor:appColors.iosSystemGray5.light,
        borderRadius:10,
        borderWidth:1,
        borderStyle:'dashed',
        minWidth:350,
        marginHorizontal:10,
        paddingVertical:5,
    },
    mainSelectedPressable:{
        marginBottom:5,
        backgroundColor:appColors.iosSystemWhite.light,
        borderColor:appColors.main,
        borderRadius:10,
        borderWidth:1,
        borderStyle:'solid',
        minWidth:350,
        marginHorizontal:10,
        paddingVertical:5,
    },
});

export default function({item, selected, onSelect}){
    //event-handlers
    function handleSelect(){
        if(selected === item._id){
            onSelect('');
        }
        else{
            onSelect(item._id);
        }
    }

    return (<TouchableHighlight 
        style={selected === item._id ? [reservation_styles.reservationMainView, reservation_styles.reservationAlternateView, {borderColor:appColors.main, borderWidth:1, borderBottomColor:appColors.main}] : [reservation_styles.reservationMainView, reservation_styles.reservationAlternateView]} 
        activeOpacity={0.6}
        underlayColor={appColors.iosSystemGray5.light}
        onPress={handleSelect} >
        <>
            <View style={reservation_styles.reservationHeaderView}>
                <Text style={[global_styles.bodyText, reservation_styles.reservationHeaderText, {color:appColors.main}]} >{item.name}</Text>
                <Text style={[global_styles.bodyText, reservation_styles.reservationHeaderText, {textTransform:'uppercase', color:appColors.main}]} >{getTimeString(parse24HourTimeString(item.time), true)}</Text>
            </View>
            <View style={reservation_styles.reservationHeaderView}>
                <Text style={[global_styles.bodyText, reservation_styles.reservationBodyText, {color:appColors.mainComplementary1}]} >{item.phoneNumber}</Text>
                <Text style={[global_styles.bodyText, reservation_styles.reservationBodyText, {color:appColors.mainComplementary1}]} >{item.seats} Guests</Text>
            </View>
            <View style={reservation_styles.reservationBodyView}>
                {item.tags && <TagViewer tags={item.tags} highlighted={true} />}
            </View>
            <View style={reservation_styles.reservationBodyView}>
                {item.notes && <Text style={[global_styles.bodyCaption, reservation_styles.reservationNotesText, {color:appColors.mainComplementary1}]} >“{item.notes}”</Text>}
            </View>
        </>
    </TouchableHighlight>);
}