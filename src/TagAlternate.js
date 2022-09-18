import React from 'react';
import { Text } from 'react-native';
import { appColors } from './common';
import global_styles from './styles/global_styles';
import tag_styles from './styles/tag_styles';

export default function({tagName, highlighted}){
    return(<Text style={highlighted ? [global_styles.bodyCaption, tag_styles.mainText, {color:appColors.mainComplementary1, backgroundColor:appColors.mainComplementary1 + '15'}] : [global_styles.bodyCaption, tag_styles.mainText]}>{tagName}</Text>);
}