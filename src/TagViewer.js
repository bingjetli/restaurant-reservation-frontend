import React from 'react';
import { View } from 'react-native';
import global_styles from './styles/global_styles';
import TagAlternate from './TagAlternate';

export default function({tags, centered, highlighted}){
    return(<View style={[global_styles.horizontalWrapView, {justifyContent:centered ? 'center' : 'flex-start'}]}>
        {tags.map(tag_name => <TagAlternate tagName={tag_name} key={tag_name} highlighted={highlighted} />)}
    </View>);
}