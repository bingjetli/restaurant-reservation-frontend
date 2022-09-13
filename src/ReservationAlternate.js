import React from 'react';
import { Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { appColors, appSizes, getTimeString, parse24HourTimeString } from './common';
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
    headerView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    headerMainText:{
        fontSize:appSizes.large.title3,
        fontWeight:'bold',
        textTransform:'capitalize',
        color:appColors.main,
        marginLeft:10,
    },
    headerMainAlternateText:{
        fontSize:appSizes.large.title3,
        fontWeight:'bold',
        color:appColors.mainComplementary1,
        marginRight:10,
    },
    headerSecondaryText:{
        color:appColors.mainComplementary1,
        marginHorizontal:10,
    },
    bodyView:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginHorizontal:10,
    },
    bodyNotesText:{
        color:appColors.mainComplementary1,
        fontSize:appSizes.large.subhead,
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
        style={selected === item._id ? ss.mainSelectedPressable : ss.mainPressable} 
        activeOpacity={0.6}
        underlayColor={appColors.iosSystemGray5.light}
        onPress={handleSelect} >
        <>
            <View style={ss.headerView}>
                <Text style={ss.headerMainText} >{item.firstName} {item.lastName}</Text>
                <Text style={ss.headerMainAlternateText} >{getTimeString(parse24HourTimeString(item.time), true)}</Text>
            </View>
            <View style={ss.headerView}>
                <Text style={ss.headerSecondaryText} >{item.phoneNumber}</Text>
                <Text style={ss.headerSecondaryText} >{item.seats} Guests</Text>
            </View>
            <View style={ss.bodyView}>
                {item.tags && <TagViewer tags={item.tags} highlighted={true} />}
            </View>
            <View style={ss.bodyView}>
                {item.notes && <Text style={ss.bodyNotesText} >“{item.notes}”</Text>}
            </View>
        </>
    </TouchableHighlight>);
}