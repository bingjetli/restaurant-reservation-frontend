import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    textBox:{
        minWidth:75,
        maxWidth:75,
        marginBottom:10,
        fontSize:22.5,
    },
    pickerView:{
        flexDirection:'row',
    },
    pickerButtonText:{
        fontFamily:'PTSans-Regular',
        fontSize:18,
        color:'dodgerblue',
        textAlign:'center',
    },
    pickerButtonSelectedText:{
        fontFamily:'PTSans-Regular',
        fontSize:18,
        color:'ghostwhite',
        textAlign:'center',
    },
    pickerButton:{
        minHeight:50,
        minWidth:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        margin:2,
    },
    pickerButtonSelected:{
        minHeight:50,
        minWidth:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        margin:2,
        backgroundColor:'dodgerblue',
    },
    pickerButtonAlternate:{
        minHeight:50,
        paddingHorizontal:15,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        margin:2,
    },
    pickerButtonAlternateSelected:{
        minHeight:50,
        paddingHorizontal:15,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        margin:2,
        backgroundColor:'dodgerblue',
    },
});