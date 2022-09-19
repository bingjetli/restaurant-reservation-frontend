import { StyleSheet } from 'react-native';
import { appColors } from '../common';

export default StyleSheet.create({
    mainView:{
        maxWidth:400,
    },
    pickerMainView:{
        maxWidth:400,
        backgroundColor:appColors.content,
    },
    displayText:{
        fontFamily:'PTSansNarrow-Regular',
        fontSize:27,
        textAlign:'center',
        color:appColors.text,
        marginBottom:10,

        padding:10,
    },
    controlsView:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
    },
    controlsText:{
        fontFamily:'PTSans-Regular',
        fontSize:18,
        color:appColors.text3,
        textAlign:'center',
    },
    monthNameText:{
        width:35,
    },
    calendarView:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-evenly',
        alignItems:'center',
    },
    dayNameText:{
        width:'14.28%',
        fontFamily:'PTSansCaption-Regular',
        fontSize:13.5,
        textAlign:'center',
        color:appColors.text4,
    },
    dateView:{
        width:'14.28%',
        aspectRatio:1,
        justifyContent:'center',
        alignItems:'center',
    },
    dateButton:{
        minHeight:50,
        minWidth:50,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
    },
    dateButtonSelected:{
        minHeight:50,
        minWidth:50,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:appColors.main3,
    },
    dateButtonText:{
        fontFamily:'PTSans-Regular',
        fontSize:18,
        color:appColors.main3,
    },
    dateButtonTextSelected:{
        fontFamily:'PTSans-Regular',
        fontSize:18,
        color:appColors.content,
    },
    pickerView:{
        maxWidth:400,
        overflow:'hidden',
    },
    pickerButton:{
        minHeight:50,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:10,
        borderRadius:5,
    },
    pickerButtonText:{
        fontFamily:'PTSans-Regular',
        fontSize:18,
        textAlign:'center',
        color:appColors.main3,
    },
    modalView:{
        alignItems:'center',
    },
});