import React from 'react';
import { StyleSheet, View } from 'react-native';
import Tag from './Tag';

const ss = StyleSheet.create({
    mainView:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        margin:10,
    },
});

export default function({tagData, selected, onSelect}){
    return (<View style={ss.mainView}>
        {tagData.map(tag => <Tag data={tag} selected={selected[tag.name]} onSelect={onSelect} key={tag.name} />)}
    </View>);
}