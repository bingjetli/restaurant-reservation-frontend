import React, { useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { appColors, appSizes } from './common';

const ss = StyleSheet.create({
    mainView:{
        alignItems:'center',
    },
    pickerView:{
        flexDirection:'row',
    },
    pickerPressable:{
        minHeight:50,
        minWidth:50,
        borderRadius:25,
        justifyContent:'center',
    },
    pickerSelectedPressable:{
        backgroundColor:appColors.main,
        minHeight:50,
        minWidth:50,
        borderRadius:25,
        justifyContent:'center',
    },
    pickerText:{
        color:appColors.main,
        textAlign:'center',
        fontSize:appSizes.large.body,
    },
    pickerSelectedText:{
        color:appColors.iosSystemWhite.light,
        textAlign:'center',
        fontSize:appSizes.large.body,
        fontWeight:'bold',
    },
    pickerSelectedAlternateText:{
        color:appColors.iosSystemWhite.light,
        textAlign:'center',
        fontSize:appSizes.large.body,
        fontWeight:'bold',
        marginHorizontal:10,
    },
    pickerTextInput:{
        color:appColors.main,
        textAlign:'center',
        fontSize:appSizes.large.title1,
        fontWeight:'bold',
        marginVertical:10,
        //backgroundColor:appColors.iosSystemGray6.light,
        borderRadius:100,
        borderColor:appColors.main,
        borderWidth:1,
        borderStyle:'solid',
        maxWidth:100,
        minWidth:100,
    },
});

export default function({guests, onUpdate}){

    //refs
    const r_textbox = useRef(null);

    //event-handlers
    function setGuests(guests){
        onUpdate(guests);
        r_textbox.current.blur();
    }

    return (<View style={ss.mainView}>
        <TextInput 
            style={ss.pickerTextInput} 
            value={guests.toString()}
            maxLength={3}
            keyboardType='number-pad'
            onFocus={() => r_textbox.current.clear()}
            onChangeText={text => onUpdate(Number(text))}
            ref={r_textbox} />
        <View style={ss.pickerView}>
            {[1, 2, 3, 4, 5].map(i => <TouchableHighlight 
                style={guests === i ? ss.pickerSelectedPressable : ss.pickerPressable} 
                activeOpacity={0.6}
                underlayColor={appColors.iosSystemGray5.light}
                onPress={() => setGuests(i)}
                key={i}>
                <Text style={guests === i ? ss.pickerSelectedText : ss.pickerText}>{i}</Text>
            </TouchableHighlight>)}
        </View>
        <View style={ss.pickerView}>
            {[6, 7, 8, 9, 10].map(i => <TouchableHighlight 
                style={guests === i ? ss.pickerSelectedPressable : ss.pickerPressable} 
                activeOpacity={0.6}
                underlayColor={appColors.iosSystemGray5.light}
                onPress={() => setGuests(i)}
                key={i}>
                <Text style={guests === i ? ss.pickerSelectedText : ss.pickerText}>{i}</Text>
            </TouchableHighlight>)}
        </View>
        <TouchableHighlight 
            style={guests > 10 || guests < 1 ? ss.pickerSelectedPressable : ss.pickerPressable} 
            activeOpacity={0.6}
            underlayColor={appColors.iosSystemGray5.light}
            onPress={() => r_textbox.current.focus()} >
            <Text style={guests > 10 || guests < 1 ? ss.pickerSelectedAlternateText : ss.pickerText} >Custom Value</Text>
        </TouchableHighlight>
    </View>);
}