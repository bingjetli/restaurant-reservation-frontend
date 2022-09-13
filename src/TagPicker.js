import React from 'react';
import { StyleSheet, View } from 'react-native';
import Tag from './Tag';
import tag_styles from './styles/tag_styles';

export default function({tagData, selected, onSelect}){
    return (<View style={tag_styles.pickerView}>
        {tagData.map(tag => <Tag data={tag} selected={selected[tag.name]} onSelect={onSelect} key={tag.name} />)}
    </View>);
}