import { StyleSheet } from 'react-native';
import { appColors, appSizes } from '../common';

export default StyleSheet.create({
    mainView:{
        backgroundColor:appColors.content2,
    },
    headerView:{
        backgroundColor:appColors.content,
        flexDirection:'row',
    },
    headerLogo:{
        width:60,
        height:60,
        resizeMode:'contain',

        marginVertical:10,
        marginLeft:10,
    },
    headerLogoView:{
        flexDirection:'row',
        alignItems:'center',
    },
    headerLogoText:{
        fontFamily:'YesevaOne-Regular',
        fontSize:appSizes.large.title3,
        paddingBottom:2,
        color:appColors.mainText,
    },
    controlsView:{
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center'
    },
});