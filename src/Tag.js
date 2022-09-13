import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { appColors, appSizes } from './common';

import BoothIcon from '../assets/icons/tag_icons/booth.png';
import DownstairsRoomIcon from '../assets/icons/tag_icons/downstairs_room.png';
import GlutenFreeIcon from '../assets/icons/tag_icons/gluten_free.png';
import PeanutAllergyIcon from '../assets/icons/tag_icons/peanut_allergy.png';
import PrivateRoomIcon from '../assets/icons/tag_icons/private_room.png';
import SeafoodAllergyIcon from '../assets/icons/tag_icons/seafood_allergy.png';
import UndefinedIcon from '../assets/icons/tag_icons/undefined.png';
import VeganIcon from '../assets/icons/tag_icons/vegan.png';
import VegetarianIcon from '../assets/icons/tag_icons/vegetarian.png';
import WindowSeatIcon from '../assets/icons/tag_icons/window_seat.png';
import global_styles from './styles/global_styles';
import tag_styles from './styles/tag_styles';


const ss = StyleSheet.create({
    mainPressable:{
        margin:2,
        minHeight:50,
        minWidth:50,
        flexDirection:'row',
        alignItems:'center',
        borderRadius:100,
        backgroundColor:appColors.mainComplementary1 + '33',
    },
    mainSelectedPressable:{
        margin:2,
        minHeight:50,
        minWidth:50,
        flexDirection:'row',
        alignItems:'center',
        borderRadius:100,
        backgroundColor:appColors.main,
    },
    mainSelectedText:{
        textTransform:'capitalize',
        fontWeight:'bold',
        color:appColors.iosSystemWhite.light,
        fontSize:appSizes.large.body,
        marginHorizontal:10,
    },
    mainText:{
        textTransform:'capitalize',
        color:appColors.main,
        fontSize:appSizes.large.body,
        marginHorizontal:10,
    },
    mainIcon:{
        height:20,
        width:20,
        marginLeft:5,
    }
});

function getTagIcon(tag_name){
    switch(tag_name){
        case 'gluten-free' : return GlutenFreeIcon
        case 'vegan' : return VeganIcon
        case 'vegetarian' : return VegetarianIcon
        case 'peanut-allergy' : return PeanutAllergyIcon
        case 'seafood-allergy' : return SeafoodAllergyIcon
        case 'window-seat' : return WindowSeatIcon
        case 'booth' : return BoothIcon
        case 'private-room' : return PrivateRoomIcon
        case 'downstairs-room' : return DownstairsRoomIcon
        default: return UndefinedIcon;
    }
}

export default function({data, selected, onSelect}){

    return(<Pressable style={selected ? tag_styles.pickerButtonSelected : tag_styles.pickerButton} onPress={() => onSelect(data.name)}>
        {/*<Image style={[ss.mainIcon, {tintColor:data.color}]} source={getTagIcon(data.name)} />*/}
        <Text style={selected ? [global_styles.secondaryButtonText, tag_styles.pickerButtonSelectedText] : [global_styles.secondaryButtonText, tag_styles.pickerButtonText]}>{data.name}</Text>
    </Pressable>);
}