import { StyleSheet } from 'react-native';
import { appColors } from '../common';

export default StyleSheet.create({
    sectionHeaderView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'baseline',
        marginTop:10,
    },
    timeText:{
        color:appColors.text,
        fontFamily:'PTSans-Regular',
        fontSize:22.5,
        marginLeft:10,
    },
    totalGuestsText:{
        color:appColors.text,
        fontFamily:'PTSans-Regular',
        marginRight:10,
    },
    statusText:{
        color:appColors.text3,
        textAlign:'center',
    },
    statusView:{
        minHeight:100,
    },
    reservationView:{
        paddingHorizontal:10,
    },
    reservationMainView:{
        backgroundColor:appColors.content,
        marginBottom:5,
        borderBottomColor:appColors.content3,
        borderBottomWidth:1,
    },
    reservationAlternateView:{
        width:'100%',
        maxWidth:400,
        paddingVertical:10,
        borderColor:appColors.content3,
        borderWidth:1,
        borderStyle:'dashed'
    },
    reservationHeaderView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    reservationHeaderText:{
        fontFamily:'PTSans-Regular',
        marginHorizontal:10,
        textAlign:'center',
        textTransform:'capitalize',
        color:appColors.text,
    },
    reservationBodyText:{
        fontFamily:'PTSans-Regular',
        color:appColors.text3,
        marginHorizontal:10,
    },
    guestsIconImage:{
        tintColor:appColors.text3,
    },
    totalGuestsIconImage:{
        tintColor:appColors.text,
    },
    reservationBodyView:{
        marginTop:5,
        marginHorizontal:10,
    },
    reservationNotesText:{
        color:appColors.text3,
    },
    reservationFooterButton:{
        minHeight:50,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
    },
    presentButtonSelected:{
        tintColor:appColors.success,
    },
    presentButtonSelectedText:{
        color:appColors.success,
    },
    absentButtonSelected:{
        tintColor:appColors.warning,
    },
    absentButtonSelectedText:{
        color:appColors.warning,
    },
});