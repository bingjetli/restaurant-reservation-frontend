import React from 'react';
import { Text } from 'react-native';
import { appColors } from './common';
import global_styles from './styles/global_styles';
import tag_styles from './styles/tag_styles';

export default function({tagName, highlighted}){
    return(<Text style={[global_styles.bodyCaption, tag_styles.mainText, highlighted && {color:appColors.main, borderColor:appColors.main}]}>{tagName}</Text>);
}