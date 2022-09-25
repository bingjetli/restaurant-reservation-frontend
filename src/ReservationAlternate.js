import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { appColors, getTimeString, parse24HourTimeString } from './common';
import global_styles from './styles/global_styles';
import reservation_styles from './styles/reservation_styles';
import TagViewer from './TagViewer';

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
        style={[reservation_styles.reservationMainView, reservation_styles.reservationAlternateView, selected === item._id && {borderColor:appColors.main, borderWidth:1, borderBottomColor:appColors.main, borderStyle:'solid'}]} 
        activeOpacity={0.6}
        underlayColor={appColors.content2}
        onPress={handleSelect} >
        <>
            <View style={reservation_styles.reservationHeaderView}>
                <Text style={[global_styles.bodyText, reservation_styles.reservationHeaderText, {color:appColors.main}]} >{item.name}</Text>
                <Text style={[global_styles.bodyText, reservation_styles.reservationHeaderText, {textTransform:'uppercase', color:appColors.main}]} >{getTimeString(parse24HourTimeString(item.time), true)}</Text>
            </View>
            <View style={reservation_styles.reservationHeaderView}>
                <Text style={[global_styles.bodyText, reservation_styles.reservationBodyText, {color:appColors.main}]} >{item.phoneNumber}</Text>
                <Text style={[global_styles.bodyText, reservation_styles.reservationBodyText, {color:appColors.main}]} >{item.seats} Guests</Text>
            </View>
            <View style={reservation_styles.reservationBodyView}>
                {item.tags && <TagViewer tags={item.tags} highlighted={true} />}
            </View>
            <View style={reservation_styles.reservationBodyView}>
                {item.notes && <Text style={[global_styles.bodyCaption, reservation_styles.reservationNotesText, {color:appColors.main}]} >“{item.notes}”</Text>}
            </View>
        </>
    </TouchableHighlight>);
}