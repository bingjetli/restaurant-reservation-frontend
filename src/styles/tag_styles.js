import { StyleSheet } from 'react-native';
import { appColors } from '../common';

export default StyleSheet.create({
    mainText:{
        backgroundColor:appColors.content2,
        color:appColors.text4,
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:5,
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
        color:appColors.iosSystemWhite.light,
        textTransform:'capitalize',
    },
    pickerButton:{
        paddingHorizontal:10,
        margin:2,
        borderRadius:5,
        minHeight:50,
        justifyContent:'center',
        backgroundColor:appColors.main + '15',
    },
    pickerButtonSelected:{
        paddingHorizontal:10,
        margin:2,
        borderRadius:5,
        minHeight:50,
        justifyContent:'center',
        backgroundColor:appColors.main,
    },
});