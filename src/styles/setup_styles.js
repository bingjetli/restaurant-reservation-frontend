import { StyleSheet } from 'react-native';
import { appColors } from '../common';

export default StyleSheet.create({
    mainView:{
        backgroundColor:appColors.content,
    },
    bodyView:{
        marginHorizontal:10,
    },
    bodyContent:{
        paddingVertical:'25%',
    },
    bodyHeading:{
        marginBottom:10,
        color:appColors.text4,
        textAlign:'center',
    },
    bodyText:{
        textAlign:'center',
        color:appColors.text3,
        marginBottom:10,
    },
    bodyEmphasisText:{
        color:appColors.text,
        fontFamily:'PTSerif-Italic',
    },
    bodyCaption:{
        color:appColors.text3,
        marginTop:10,
    },
    bodyTextBox:{
        minHeight:50,
        maxHeight:50,
        minWidth:250,
        maxWidth:250,
    },
    bodyTextField:{
        textAlignVertical:'top',
        fontFamily:'PTSans-Regular',
        fontSize:22,
        color:'dodgerblue',
        borderColor:'dodgerblue',
        borderWidth:1,
        borderRadius:5,
        padding:10,
        overflow:'scroll',

        minHeight:100,
        maxHeight:100,
        minWidth:350,
        maxWidth:350,
    },
    footerView:{
        alignItems:'center',
        padding:10,
    },
    reservationsView:{
        marginTop:10,
    },
});