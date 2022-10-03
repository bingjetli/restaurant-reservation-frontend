import { StyleSheet } from 'react-native';
import { appColors } from '../common';

export default StyleSheet.create({
    viewerView:{
        backgroundColor:appColors.content2,
    },
    viewerStatusView:{
        minHeight:100,
    },
    itemView:{
        backgroundColor:appColors.content,
        marginTop:10,
        marginHorizontal:10,
    },
    itemAlternateView:{
        width:'100%',
        maxWidth:400,
        paddingVertical:10,
        borderColor:appColors.content3,
        borderWidth:1,
        borderStyle:'dashed',
        marginBottom:10,
    },
    itemHeaderView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    itemNameText:{
        color:appColors.text,
        textTransform:'capitalize',
        marginLeft:10,
    },
    itemDateText:{
        color:appColors.text2,
        textTransform:'capitalize',
        marginLeft:10,
    },
    itemDetailsText:{
        color:appColors.text3,
        marginLeft:10,
        marginTop:10,
    },
    itemFooterView:{
        flexDirection:'row',
    },
});