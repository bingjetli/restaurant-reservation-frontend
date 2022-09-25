import React from 'react';
import { Pressable, Text } from 'react-native';

import global_styles from './styles/global_styles';
import tag_styles from './styles/tag_styles';

export default function({data, selected, onSelect}){

    return(<Pressable style={selected ? tag_styles.pickerButtonSelected : tag_styles.pickerButton} onPress={() => onSelect(data.name)}>
        <Text style={[global_styles.secondaryButtonText, selected ? tag_styles.pickerButtonSelectedText : tag_styles.pickerButtonText]}>{data.name}</Text>
    </Pressable>);
}