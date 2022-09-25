import { StyleSheet } from 'react-native';
import { appColors } from '../common';

export default StyleSheet.create({
    falseTextBox:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        borderColor:appColors.main,
        borderWidth:1,
        borderRadius:5,
        minHeight:50,
        minWidth:250,
        maxHeight:50,
        maxWidth:250,
        padding:10,
    },
    invisibleTextBox:{
        fontSize:22,
        fontFamily:'PTSans-Regular',
        color:appColors.main,
        textAlign:'center',
    },
    falseTextBoxText:{
        fontSize:22,
        fontFamily:'PTSans-Regular',
        color:appColors.main,
    },
});