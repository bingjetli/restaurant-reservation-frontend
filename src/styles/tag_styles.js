import { StyleSheet } from 'react-native';
import { appColors } from '../common';

export default StyleSheet.create({
    mainText:{
        borderColor:appColors.content3,
        borderWidth:1,
        color:appColors.text2,
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:100,
        textTransform:'capitalize',
        margin:2,
    },
    pickerView:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
    },
    pickerButtonText:{
        color:appColors.main,
        textTransform:'capitalize',
    },
    pickerButtonSelectedText:{
        color:appColors.main,
        textTransform:'capitalize',
    },
    pickerButton:{
        paddingHorizontal:20,
        margin:5,
        borderRadius:100,
        minHeight:50,
        justifyContent:'center',
        borderWidth:1,
        borderColor:appColors.content3,
        borderStyle:'dashed',
    },
    pickerButtonSelected:{
        paddingHorizontal:20,
        margin:5,
        borderRadius:100,
        minHeight:50,
        justifyContent:'center',
        borderWidth:1,
        borderColor:appColors.main,
        borderStyle:'solid',
    },
});