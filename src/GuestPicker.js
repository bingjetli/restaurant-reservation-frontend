import React, { useRef } from 'react';
import { Text, TextInput, TouchableHighlight, View } from 'react-native';
import { appColors } from './common';
import global_styles from './styles/global_styles';
import guest_picker_styles from './styles/guest_picker_styles';

export default function({guests, onUpdate}){

    //refs
    const r_textbox = useRef(null);

    //event-handlers
    function setGuests(guests){
        onUpdate(guests);
        r_textbox.current.blur();
    }

    return (<View style={global_styles.centeringView}>
        <TextInput 
            style={[global_styles.textBox, guest_picker_styles.textBox]} 
            value={guests.toString()}
            maxLength={3}
            keyboardType='number-pad'
            onFocus={() => r_textbox.current.clear()}
            onChangeText={text => onUpdate(Number(text))}
            ref={r_textbox} />
        <View style={guest_picker_styles.pickerView}>
            {[1, 2, 3, 4, 5].map(i => <TouchableHighlight 
                style={guests === i ? guest_picker_styles.pickerButtonSelected : guest_picker_styles.pickerButton} 
                activeOpacity={0.6}
                underlayColor={appColors.iosSystemGray5.light}
                onPress={() => setGuests(i)}
                key={i}>
                <Text style={guests === i ? guest_picker_styles.pickerButtonSelectedText : guest_picker_styles.pickerButtonText}>{i}</Text>
            </TouchableHighlight>)}
        </View>
        <View style={guest_picker_styles.pickerView}>
            {[6, 7, 8, 9, 10].map(i => <TouchableHighlight 
                style={guests === i ? guest_picker_styles.pickerButtonSelected : guest_picker_styles.pickerButton} 
                activeOpacity={0.6}
                underlayColor={appColors.iosSystemGray5.light}
                onPress={() => setGuests(i)}
                key={i}>
                <Text style={guests === i ? guest_picker_styles.pickerButtonSelectedText : guest_picker_styles.pickerButtonText}>{i}</Text>
            </TouchableHighlight>)}
        </View>
        <TouchableHighlight 
            style={guests > 10 || guests < 1 ? guest_picker_styles.pickerButtonAlternateSelected : guest_picker_styles.pickerButtonAlternate} 
            activeOpacity={0.6}
            underlayColor={appColors.iosSystemGray5.light}
            onPress={() => r_textbox.current.focus()} >
            <Text style={guests > 10 || guests < 1 ? guest_picker_styles.pickerButtonSelectedText : guest_picker_styles.pickerButtonText} >Custom Value</Text>
        </TouchableHighlight>
    </View>);
}