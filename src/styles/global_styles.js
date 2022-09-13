import { StyleSheet } from 'react-native';
import { appColors } from '../common';

export default StyleSheet.create({
    fullView:{
        flex:1,
    },
    fullCenteringView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    centeringView:{
        justifyContent:'center',
        alignItems:'center',
    },
    horizontalView:{
        flexDirection:'row',
    },
    horizontalCenteringView:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    horizontalWrapView:{
        flexDirection:'row',
        flexWrap:'wrap',
    },
    headerView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
    },
    headerBackButton:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        minHeight:50,
        marginLeft:10,
    },
    headerBackButtonText:{
        fontFamily:'PTSans-Regular',
        fontSize:22.5,
        color:'dodgerblue',
        marginLeft:-5,
    },
    headerBackButtonIcon:{
        width:25,
        height:25,
        tintColor:'dodgerblue',
    },
    headerText:{
        fontFamily:'PTSans-Regular',
        fontSize:22.5,
        flex:3,
        alignSelf:'center',
        textAlign:'center',
        color:appColors.text3,
        paddingHorizontal:10,
    },
    bodyHeading:{
        fontFamily:'PTSans-Regular',
        fontSize:36,
    },
    bodySubHeading:{
        fontFamily:'PTSans-Regular',
        fontSize:27,
    },
    bodyText:{
        fontFamily:'PTSerif-Regular',
        fontSize:18,
        maxWidth:400,
        lineHeight:27, //18 * 1.5 = 27
    },
    bodyCaption:{
        fontFamily:'PTSerifCaption-Regular',
        fontSize:13.5,
        lineHeight:19.5,
        maxWidth:400,
    },
    primaryButtonText:{
        fontFamily:'PTSans-Regular',
        fontSize:18,
        color:'ghostwhite',
        textAlign:'center',
    },
    primaryButton:{
        backgroundColor:'dodgerblue',
        maxWidth:400,
        minHeight:50,
        minWidth:50,
        width:'100%',
        justifyContent:'center',
        borderRadius:5,
    },
    primaryButtonDisabled:{
        backgroundColor:'gray',
        maxWidth:400,
        minHeight:50,
        minWidth:50,
        width:'100%',
        justifyContent:'center',
        borderRadius:5,
    },
    secondaryButtonText:{
        fontFamily:'PTSans-Regular',
        fontSize:18,
        color:'dodgerblue',
        textAlign:'center',
    },
    secondaryButton:{
        maxWidth:400,
        minHeight:50,
        minWidth:50,
        width:'100%',
        justifyContent:'center',
        borderRadius:5,
    },
    textBox:{
        fontFamily:'PTSans-Regular',
        fontSize:22.5,
        color:'dodgerblue',
        textAlign:'center',
        borderColor:'dodgerblue',
        borderWidth:1,
        borderRadius:5,
        padding:10,
    },
    iconButtonImage:{
        height:25,
        width:25,
        tintColor:'dodgerblue',
    },
    iconButton:{
        minHeight:50,
        minWidth:50,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
    },
    labeledIconButton:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        minHeight:50,
        minWidth:50,
        paddingHorizontal:10,
    },
    labeledIconButtonText:{
        fontFamily:'PTSans-Regular',
        fontSize:18,
        color:appColors.main,
        marginRight:5,
    },
    actionSheetModalView:{
        flex:1,
        flexDirection:'column-reverse',
        alignItems:'center',
        backgroundColor:'#00000055',
        padding:10,
    },
    actionSheetContentView:{
        backgroundColor:appColors.iosSystemWhite.light,
        marginBottom:10,
        borderRadius:5,
        alignItems:'center',
        width:'100%',
        maxWidth:400,
    },
    actionSheetContentDivider:{
        width:'100%',
        height:1,
        backgroundColor:appColors.iosSystemGray5.light,
    },
    actionSheetContentButton:{
        minHeight:50,
        justifyContent:'center',
        width:'100%',
    },
    actionSheetCancelButton:{
        backgroundColor:appColors.iosSystemWhite.light,
        width:'100%',
        maxWidth:400,
        borderRadius:5,
        minHeight:50,
        justifyContent:'center',
    },
});