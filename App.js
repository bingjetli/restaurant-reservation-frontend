import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppConfig from './src/AppConfig';
import CreateDate from './src/screens/CreateDate';
import CreateFoundDuplicates from './src/screens/CreateFoundDuplicates';
import CreateGuest from './src/screens/CreateGuest';
import CreateName from './src/screens/CreateName';
import CreateNotes from './src/screens/CreateNotes';
import CreatePhoneNumber from './src/screens/CreatePhoneNumber';
import CreateReview from './src/screens/CreateReview';
import CreateTags from './src/screens/CreateTags';
import CreateTime from './src/screens/CreateTime';
import CreateWelcome from './src/screens/CreateWelcome';
import EditDate from './src/screens/EditDate';
import EditGuest from './src/screens/EditGuest';
import EditName from './src/screens/EditName';
import EditNotes from './src/screens/EditNotes';
import EditPhoneNumber from './src/screens/EditPhoneNumber';
import EditTags from './src/screens/EditTags';
import EditTime from './src/screens/EditTime';
import Home from './src/screens/Home';
import SetupApiKey from './src/screens/SetupApiKey';
import SetupApiUrl from './src/screens/SetupApiUrl';
import SetupFinish from './src/screens/SetupFinish';
import SetupWelcome from './src/screens/SetupWelcome';

const {Screen, Navigator} = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  //state
  const [s_config, setConfigState] = useState({
    tagData:[
      {name:'vegan', color:'gray'},
      {name:'vegetarian', color:'gray'},
      {name:'gluten-free', color:'gray'},
      {name:'seafood-allergy', color:'gray'},
      {name:'window-seat-preferred', color:'gray'},
      {name:'booth-preferred', color:'gray'},
      {name:'private-room', color:'gray'},
      {name:'downstairs-room', color:'gray'},
    ],
    env:{
      INITIALIZED:undefined,
      API_URL:undefined,
      API_KEY:undefined,
      API_KEY_HEADER_NAME:'Sativa',
    },
  });

  //cached
  useMemo(async () => { //run once on init-before side effects
    try {
      if(await SecureStore.getItemAsync('INITIALIZED') === 'TRUE'){
        //no need to run the setup, just load the env variables
        const s_config_copy = {...s_config};
        s_config_copy.env.API_KEY = await SecureStore.getItemAsync('API_KEY');
        s_config_copy.env.API_URL = await SecureStore.getItemAsync('API_URL');
        s_config_copy.env.INITIALIZED = true;
        setConfigState(s_config_copy);
      }
      else{
        const s_config_copy = {...s_config};
        s_config_copy.env.INITIALIZED = false;
        setConfigState(s_config_copy);
      }
    }
    catch (e){
      Alert.alert('Error Initializing App', `Something went wrong while starting the app and it may not function correctly, please contact your developer about this : ${e}`, [{text:'OK'}]);
    }
  }, []);

  //side-effects
  const [fonts_loaded] = useFonts({
    'YesevaOne-Regular':require('./assets/fonts/YesevaOne-Regular.ttf'),
    'PTSans-Regular':require('./assets/fonts/PTSans-Regular.ttf'),
    'PTSansNarrow-Regular':require('./assets/fonts/PTSansNarrow-Regular.ttf'),
    'PTSansCaption-Regular':require('./assets/fonts/PTSansCaption-Regular.ttf'),
    'PTSans-Bold':require('./assets/fonts/PTSans-Bold.ttf'),
    'PTSerif-Regular':require('./assets/fonts/PTSerif-Regular.ttf'),
    'PTSerifCaption-Regular':require('./assets/fonts/PTSerifCaption-Regular.ttf'),
    'PTSerif-Italic':require('./assets/fonts/PTSerif-Italic.ttf'),
  });

  // useEffect(() => { //run once on init and whenever s_config.env.INITIALIZED changes
  //   if(s_config.env.INITIALIZED){
  //     //if the environment variables are initialized, run the GET request

  //     const url = s_config.env.API_URL + '/tags';
  //     
  //     const headers = {};
  //     headers[s_config.env.API_KEY_HEADER_NAME] = s_config.env.API_KEY;
  //   
  //     Axios.get(url, {headers:headers}).then(r => {
  //       if(r.data.result === 'successful'){
  //         const config_copy = {...s_config};
  //         config_copy.tagData = r.data.tags

  //         setConfigState(config_copy);
  //       }
  //       else if(r.data.result === 'error_occured'){
  //         Alert.alert('Error Occured!', r.data.message, [{'text':'OK'}]);
  //       }
  //     });
  //   }
  // }, [s_config.env.INITIALIZED]);

  //event-handlers
  const handleRootViewLayout = useCallback(async () => { //run whenever fonts_loaded or s_config.env.INITIALIZED changes
    if(fonts_loaded && s_config.env.INITIALIZED !== undefined) {
      await SplashScreen.hideAsync();
    }
  }, [fonts_loaded, s_config.env.INITIALIZED]);


  if(!fonts_loaded) return null;
  else return (
    <GestureHandlerRootView style={{flex:1}} onLayout={handleRootViewLayout}>
      <NavigationContainer>
        <AppConfig.Provider value={[s_config, setConfigState]} >
          <StatusBar style="auto" />
          <Navigator screenOptions={{headerShown:false, animation:'fade_from_bottom'}}>
            {s_config.env.INITIALIZED ? <>
                <Screen name='home' component={Home} />
                <Screen name='create-welcome' component={CreateWelcome} />
                <Screen name='create-date' component={CreateDate} />
                <Screen name='create-time' component={CreateTime} />
                <Screen name='create-guest' component={CreateGuest} />
                <Screen name='create-name' component={CreateName} />
                <Screen name='create-phonenumber' component={CreatePhoneNumber} />
                <Screen name='create-tags' component={CreateTags} />
                <Screen name='create-notes' component={CreateNotes} />
                <Screen name='create-review' component={CreateReview} />
                <Screen name='create-found-duplicates' component={CreateFoundDuplicates} />
                <Screen name='edit-date' component={EditDate} />
                <Screen name='edit-time' component={EditTime} />
                <Screen name='edit-guest' component={EditGuest} />
                <Screen name='edit-name' component={EditName} />
                <Screen name='edit-phonenumber' component={EditPhoneNumber} />
                <Screen name='edit-tags' component={EditTags} />
                <Screen name='edit-notes' component={EditNotes} />
              </> : <>
                <Screen name='setup-welcome' component={SetupWelcome} />
                <Screen name='setup-apiurl' component={SetupApiUrl} />
                <Screen name='setup-apikey' component={SetupApiKey} />
                <Screen name='setup-finish' component={SetupFinish} />
              </>}
          </Navigator>
        </AppConfig.Provider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}