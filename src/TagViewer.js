import React from 'react';
import { StyleSheet, View } from 'react-native';
import TagAlternate from './TagAlternate';

const ss = StyleSheet.create({
    mainView:{
        flexDirection:'row',
        flexWrap:'wrap',
    },
});

export default function({tags, centered, highlighted}){
    return(<View style={[ss.mainView, {justifyContent:centered ? 'center' : 'flex-start'}]}>
        {tags.map(tag_name => <TagAlternate tagName={tag_name} key={tag_name} highlighted={highlighted} />)}
    </View>);
}