import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { appColors, appSizes } from './common';
import global_styles from './styles/global_styles';
import tag_styles from './styles/tag_styles';

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
    return(<Text style={highlighted ? [global_styles.bodyCaption, tag_styles.mainText, {color:appColors.mainComplementary1, backgroundColor:appColors.mainComplementary1 + '15'}] : [global_styles.bodyCaption, tag_styles.mainText]}>{tagName}</Text>);
}