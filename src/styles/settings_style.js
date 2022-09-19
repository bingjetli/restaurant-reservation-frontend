import { StyleSheet } from 'react-native';
import { appColors } from '../common';

export default StyleSheet.create({
    mainView:{
        backgroundColor:appColors.content,
        alignItems:'center',
    },
    bodyView:{
        width:'100%',
    },
    bodyContent:{
        paddingTop:50,
        marginHorizontal:10,
        //backgroundColor:'red'
    },
    bodyHeading:{
        color:appColors.text2,
        marginBottom:10,
    },
    bodySubHeading:{
        color:appColors.main3,
    },
    bodyText:{
        color:appColors.main4,
        marginHorizontal:10,
    },
    settingButton:{
        marginVertical:5,
        padding:10,
        borderRadius:5,
    },
});