import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { appColors, appSizes } from './common';

const ss = StyleSheet.create({
    mainText:{
        backgroundColor:appColors.iosSystemGray5.light,
        color:appColors.iosSystemGray.light,
        textAlign:'center',
        textTransform:'capitalize',
        borderRadius:100,
        paddingHorizontal:10,
        paddingVertical:5,
        margin:2,
        fontSize:appSizes.large.caption1,
    },
    mainHighlightedText:{
        backgroundColor:appColors.mainComplementary1 + '33',
        color:appColors.main,
        textAlign:'center',
        textTransform:'capitalize',
        borderRadius:100,
        paddingHorizontal:10,
        paddingVertical:5,
        margin:2,
        fontSize:appSizes.large.caption1,
    },
});

export default function({tagName, highlighted}){
    return(<Text style={highlighted ? ss.mainHighlightedText : ss.mainText}>{tagName}</Text>);
}