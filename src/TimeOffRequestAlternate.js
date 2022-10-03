import { format, parseISO } from 'date-fns';
import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { appColors } from './common';
import global_styles from './styles/global_styles';
import time_off_request_styles from './styles/time_off_request_styles';

export default function({item, refreshViewer, selected, onSelect}){
    /** EVENT-HANDLERS */
    function handleSelect(){
        if(selected === item._id){
            onSelect('');
        }
        else{
            onSelect(item._id);
        }
    }

    return (
        <TouchableHighlight 
            style={[time_off_request_styles.itemAlternateView, selected === item._id && {borderColor:appColors.main, borderWidth:1, borderBottomColor:appColors.main, borderStyle:'solid'}]}
            activeOpacity={0.6}
            underlayColor={appColors.content2}
            onPress={handleSelect} >
            <>
                <View style={time_off_request_styles.itemHeaderView}>
                    <Text style={[global_styles.bodyText, time_off_request_styles.itemNameText, {color:appColors.main}]}>{item.name}</Text>
                </View>

                {
                    item.startDate === item.endDate ?
                    <Text style={[global_styles.bodyText, time_off_request_styles.itemDateText, {color:appColors.main}]} >{format(parseISO(item.startDate), 'MMMM do')}</Text> :
                    <Text style={[global_styles.bodyText, time_off_request_styles.itemDateText, {color:appColors.main}]} >{format(parseISO(item.startDate), 'MMMM do')}&ndash;{format(parseISO(item.endDate), 'MMMM do')}</Text>
                }

                {
                    item.hasOwnProperty('details') && 
                    <Text style={[global_styles.bodyCaption, time_off_request_styles.itemDetailsText, {color:appColors.main}]}>&ldquo;{item.details}&rdquo;</Text>
                }
            </>
        </TouchableHighlight>
    );
}