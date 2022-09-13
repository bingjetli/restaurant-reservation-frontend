import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appColors } from '../common';
import global_styles from '../styles/global_styles';
import setup_styles from '../styles/setup_styles';

export default function({route, navigation}){
    //event-handlers
    function goToNextScreen(){
        navigation.navigate({
            name:'setup-apiurl',
        });
    }

    return (<SafeAreaView style={[global_styles.fullView, setup_styles.mainView]}>
        <View style={global_styles.headerView}>
            {/*<TouchableHighlight 
                style={ss.headerBackPressable} 
                activeOpacity={0.6}
                underlayColor={appColors.iosSystemGray5.light}
                onPress={returnToHomeScreen} >
                <>
                    <Image style={ss.headerBackIcon} source={ArrowBackIosIcon} />
                    <Text style={ss.headerBackText} >Cancel</Text>
                </>
            </TouchableHighlight>*/}
            <View style={{flex:1}}></View>
            <Text style={global_styles.headerText}>Initial Setup</Text>
            <View style={{flex:1}}></View>
        </View>
        <View style={[global_styles.fullCenteringView, setup_styles.bodyView]} >
            <Text style={[global_styles.bodyHeading, setup_styles.bodyHeading]} >Welcome!</Text>
            <Text style={[global_styles.bodyText, setup_styles.bodyText]} >Before you get started, we need to configure a few settings in order to connect with the server.</Text>
            {/*<Text style={[global_styles.bodyText, setup_styles.bodyText]} >These can be changed later in the Settings Menu.</Text>*/}
        </View>
        <View style={setup_styles.footerView}>
            <TouchableHighlight 
                style={global_styles.primaryButton} 
                activeOpacity={0.6}
                underlayColor={appColors.mainComplementary1}
                onPress={goToNextScreen}>
                <Text style={global_styles.primaryButtonText}>Continue</Text>
            </TouchableHighlight>
        </View>
    </SafeAreaView>);
}