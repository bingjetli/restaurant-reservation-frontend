import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppConfig from './src/AppConfig';
import getEnv from './src/env';
import CreateDate from './src/screens/CreateDate';
import CreateFirstName from './src/screens/CreateFirstName';
import CreateFoundDuplicates from './src/screens/CreateFoundDuplicates';
import CreateGuest from './src/screens/CreateGuest';
import CreateLastName from './src/screens/CreateLastName';
import CreateNotes from './src/screens/CreateNotes';
import CreatePhoneNumber from './src/screens/CreatePhoneNumber';
import CreateReview from './src/screens/CreateReview';
import CreateTags from './src/screens/CreateTags';
import CreateTime from './src/screens/CreateTime';
import CreateWelcome from './src/screens/CreateWelcome';
import EditDate from './src/screens/EditDate';
import EditFirstName from './src/screens/EditFirstName';
import EditGuest from './src/screens/EditGuest';
import EditLastName from './src/screens/EditLastName';
import EditNotes from './src/screens/EditNotes';
import EditPhoneNumber from './src/screens/EditPhoneNumber';
import EditTags from './src/screens/EditTags';
import EditTime from './src/screens/EditTime';
import Home from './src/screens/Home';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Alert } from 'react-native';

const {Screen, Navigator} = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  //state
  const [s_config, setConfigState] = useState({
    tagData:[],
  });

  //side-effects
  const [fonts_loaded] = useFonts({
    'YesevaOne-Regular':require('./assets/fonts/YesevaOne-Regular.ttf'),
  });

  useEffect(() => { //run once on init
    const url = getEnv().API_URL + '/tags';
    
    const headers = {};
    headers[getEnv().API_KEY_HEADER_NAME] = getEnv().API_KEY;
  
    Axios.get(url, {headers:headers}).then(r => {
      if(r.data.result === 'successful'){
        const config_copy = {...s_config};
        config_copy.tagData = r.data.tags

        setConfigState(config_copy);
      }
      else if(r.data.result === 'error_occured'){
        Alert.alert('Error Occured!', r.data.message, [{'text':'OK'}]);
      }
    });
  }, []);

  //event-handlers
  const handleRootViewLayout = useCallback(async () => {
    if(fonts_loaded) {
      await SplashScreen.hideAsync();
    }
  }, [fonts_loaded]);


  if(!fonts_loaded) return null;
  else return (
    <GestureHandlerRootView style={{flex:1}} onLayout={handleRootViewLayout}>
      <NavigationContainer>
        <AppConfig.Provider value={s_config} >
          <StatusBar style="auto" />
          <Navigator screenOptions={{headerShown:false, animation:'fade_from_bottom'}}>
            <Screen name='home' component={Home} initialParams={{fetchCounter:0}} />
            <Screen name='create-welcome' component={CreateWelcome} />
            <Screen name='create-date' component={CreateDate} />
            <Screen name='create-time' component={CreateTime} />
            <Screen name='create-guest' component={CreateGuest} />
            <Screen name='create-firstname' component={CreateFirstName} />
            <Screen name='create-lastname' component={CreateLastName} />
            <Screen name='create-phonenumber' component={CreatePhoneNumber} />
            <Screen name='create-tags' component={CreateTags} />
            <Screen name='create-notes' component={CreateNotes} />
            <Screen name='create-review' component={CreateReview} />
            <Screen name='create-found-duplicates' component={CreateFoundDuplicates} />
            <Screen name='edit-date' component={EditDate} />
            <Screen name='edit-time' component={EditTime} />
            <Screen name='edit-guest' component={EditGuest} />
            <Screen name='edit-firstname' component={EditFirstName} />
            <Screen name='edit-lastname' component={EditLastName} />
            <Screen name='edit-phonenumber' component={EditPhoneNumber} />
            <Screen name='edit-tags' component={EditTags} />
            <Screen name='edit-notes' component={EditNotes} />
          </Navigator>
        </AppConfig.Provider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}