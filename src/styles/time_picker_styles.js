import { StyleSheet } from 'react-native';
import { appColors } from '../common';

export default StyleSheet.create({
    mainView:{
        maxWidth:400,
        alignItems:'center',
        //backgroundColor:'#ffff0055'
    },
    pickerView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        width:'100%',
        //backgroundColor:'#00ff0055'
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
    displayText:{
        fontFamily:'PTSans-Regular',
        fontSize:27,
        textAlign:'center',
        color:appColors.text,
        marginBottom:10,

        // borderColor:'darkslategray',
        // borderWidth:1,
        // borderRadius:5,

        padding:10,
        maxWidth:150,
    },
    hourView:{
        flexDirection:'row',
        //backgroundColor:'#ff000055'
    },
    minuteView:{
        flexDirection:'row',
        //backgroundColor:'#ff000055'
    },
    ampmView:{
        //backgroundColor:'#ff000055'
    },
});