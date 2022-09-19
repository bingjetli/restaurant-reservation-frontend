import React from 'react';
import { Text } from 'react-native';
import { appColors } from './common';
import global_styles from './styles/global_styles';
import tag_styles from './styles/tag_styles';

export default function({tagName, highlighted}){
    return(<Text style={highlighted ? [global_styles.bodyCaption, tag_styles.mainText, {color:appColors.main3, backgroundColor:appColors.main5 + '6f'}] : [global_styles.bodyCaption, tag_styles.mainText]}>{tagName}</Text>);
}