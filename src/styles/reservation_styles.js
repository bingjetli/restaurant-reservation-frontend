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
        color:appColors.text2,
        fontFamily:'PTSans-Regular',
        marginRight:10,
    },
    statusText:{
        color:appColors.text4,
        textAlign:'center',
    },
    statusView:{
        minHeight:50,
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
    },
    reservationHeaderView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    reservationHeaderText:{
        fontFamily:'PTSans-Regular',
        marginHorizontal:10,
        textTransform:'capitalize',
        color:appColors.text2,
    },
    reservationBodyText:{
        fontFamily:'PTSans-Regular',
        color:appColors.text4,
        marginHorizontal:10,
    },
    reservationBodyView:{
        marginTop:5,
        marginHorizontal:10,
    },
    reservationNotesText:{
        color:appColors.text4,
    },
    reservationFooterButton:{
        minHeight:50,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
    },
    presentButtonSelected:{
        tintColor:appColors.success3,
    },
    presentButtonSelectedText:{
        color:appColors.success3,
    },
    absentButtonSelected:{
        tintColor:appColors.warning3,
    },
    absentButtonSelectedText:{
        color:appColors.warning3,
    },
});