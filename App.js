import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, useWindowDimensions } from 'react-native';
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
import Settings from './src/screens/Settings';
import SettingsApi from './src/screens/SettingsApi';
import SettingsApiKey from './src/screens/SettingsApiKey';
import SettingsApiUrl from './src/screens/SettingsApiUrl';
import SettingsApiFallbackUrl from './src/screens/SettingsApiFallbackUrl';
import SettingsCredits from './src/screens/SettingsCredits';
import Axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

let abort_controller;
const {Screen, Navigator} = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const {height, width} = useWindowDimensions();

  //state
  const [s_loaded, setLoadedState] = useState(false);
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
      API_MAIN_URL:undefined,
      API_FALLBACK_URL:undefined,
      API_KEY:undefined,
      API_KEY_HEADER_NAME:'Sativa',
    },
    screen:{
      width:-1,
      height:-1,
    },
  });

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

  useEffect(() => { //run once on init
    async function init(){
      //create a copy of the config state to modify and trigger a re-render with setState()
      const s_config_copy = {...s_config};

      //determine if the setup needs to be ran
      try {
        if(await SecureStore.getItemAsync('INITIALIZED') === 'TRUE'){
          //no need to run the setup, just load the env variables
          s_config_copy.env.API_KEY = await SecureStore.getItemAsync('API_KEY');
          s_config_copy.env.API_MAIN_URL = await SecureStore.getItemAsync('API_MAIN_URL');
          s_config_copy.env.API_FALLBACK_URL = await SecureStore.getItemAsync('API_FALLBACK_URL');

          s_config_copy.env.INITIALIZED = true;
        }
        else{
          s_config_copy.env.INITIALIZED = false;
        }
      }
      catch (e){
        Alert.alert('Error Initializing App', `Something went wrong while starting the app and it may not function correctly, please contact your developer about this : ${e}`, [{text:'OK'}]);
      }

      //set window dimensions
      s_config_copy.screen.height = height;
      s_config_copy.screen.width = width;

      //determine whether or not to use the fallback URL
      if(s_config_copy.env.API_FALLBACK_URL !== undefined){ //only run this step if there is a fallback url set, otherwise it's kind of pointless to run the check
        const headers = {};
        headers[s_config_copy.env.API_KEY_HEADER_NAME] = s_config_copy.env.API_KEY;

        const promise_array = [
          Axios.get(s_config_copy.env.API_MAIN_URL, {headers:headers, timeout:1000}),
          Axios.get(s_config_copy.env.API_FALLBACK_URL, {headers:headers, timeout:1000}),
        ];

        try{
          const response = await Promise.race(promise_array);
          if(response.status === 200){
            s_config_copy.env.API_URL = response.config.url;
          }
          else throw new Error(`promise resolved with status ${response.status}`);
        }
        catch(e){
          Alert.alert('Error Initializing App', `The app could not connect to the backend server. Please make sure your internet connection is working and that your API Key and URLs are not set incorrectly. If this problem persists, please contact the developer about this issue. \n ${e}`, [{text:'OK'}]);
        }
      }

      //update the state and trigger the re-render using .setState()
      setConfigState(s_config_copy);
    }

    /** Add an event listener to monitor network changes.
     * This function runs atleast once after the app has loaded, and runs whenever the network state changes.
     * This function also runs asynchronously to the other instructions in this useEffect();
     *  i.e setConfigState() runs before this function's body when placed inside init();
     * 
     * We moved it outside to run before init() because of this async property.
     * 
     * For some reason, this function also runs three (3) times whenever the WiFi is turned off, 
     * so we should use an AbortController() to avoid sending multiple GET requests
     * UPDATE: It seems this function is called everytime a network switch is made, so only calling this when the net_state isConnected makes it work as expected
     */
    NetInfo.addEventListener(net_state => {
      /** By the time this function body executes, s_config.env will either be undefined -- meaning it ran on init, 
       * or it will have values already -- meaning it ran on network change
       */
      async function checkNetwork(){
        const s_config_copy = {...s_config};

        const headers = {};
        headers[s_config_copy.env.API_KEY_HEADER_NAME] = s_config_copy.env.API_KEY;

        const promise_array = [
          Axios.get(s_config_copy.env.API_MAIN_URL, {headers:headers, timeout:1000}),
          Axios.get(s_config_copy.env.API_FALLBACK_URL, {headers:headers, timeout:1000}),
        ];

        try{
          const response = await Promise.race(promise_array);
          if(response.status === 200){
            s_config_copy.env.API_URL = response.config.url;
            setConfigState(s_config_copy); //update the state and re-render
          }
          else throw new Error(`promise resolved with status ${response.status}`);
        }
        catch(e){
          Alert.alert('Network Error', `The app could not connect to the backend server. Please make sure your internet connection is working and that your API Key and URLs are not set incorrectly. If this problem persists, please contact the developer about this issue. \n ${e}`, [{text:'OK'}]);
        }
      }

      //check the network only when a Fallback URL is defined and the client is connected to a network
      if(s_config.env.API_FALLBACK_URL !== undefined && net_state.type !== 'none' && net_state.isConnected){
        checkNetwork();
      }
    });

    //initialize the app
    init();
  }, []);

  useEffect(() => { //run this side-effect whenever fonts are loaded or s_config.env.INITIALIZED 
    if(fonts_loaded && s_config.env.INITIALIZED !== undefined){
      SplashScreen.hideAsync();
      setLoadedState(true);
    }

  }, [fonts_loaded, s_config.env.INITIALIZED, s_config.env.API_URL]);

  //event-handlers

  if(!s_loaded) return null; //return nothing until the app is loaded
  else return (
    <GestureHandlerRootView style={{flex:1}}>
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
                <Screen name='settings' component={Settings} />
                <Screen name='settings-api' component={SettingsApi} />
                <Screen name='settings-api-key' component={SettingsApiKey} />
                <Screen name='settings-api-url' component={SettingsApiUrl} />
                <Screen name='settings-api-fallback-url' component={SettingsApiFallbackUrl} />
                <Screen name='settings-credits' component={SettingsCredits} />
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