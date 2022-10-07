import NetInfo from '@react-native-community/netinfo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Axios from 'axios';
import { useFonts } from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableHighlight, useWindowDimensions } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MenuBookIcon from './assets/icons/menu_book.png';
import MenuBookFilledIcon from './assets/icons/menu_book_filled.png';
import ScheduleIcon from './assets/icons/schedule.png';
import ScheduleFilledIcon from './assets/icons/schedule_filled.png';
import AppConfig from './src/AppConfig';
import { appColors } from './src/common';

import ReservationsCreateDate from './src/screens/reservations/CreateDate';
import ReservationsCreateFoundDuplicates from './src/screens/reservations/CreateFoundDuplicates';
import ReservationsCreateGuest from './src/screens/reservations/CreateGuest';
import ReservationsCreateName from './src/screens/reservations/CreateName';
import ReservationsCreateNotes from './src/screens/reservations/CreateNotes';
import ReservationsCreatePhoneNumber from './src/screens/reservations/CreatePhoneNumber';
import ReservationsCreateReview from './src/screens/reservations/CreateReview';
import ReservationsCreateTags from './src/screens/reservations/CreateTags';
import ReservationsCreateTime from './src/screens/reservations/CreateTime';
import ReservationsCreateWelcome from './src/screens/reservations/CreateWelcome';
import ReservationsEditDate from './src/screens/reservations/EditDate';
import ReservationsEditGuest from './src/screens/reservations/EditGuest';
import ReservationsEditName from './src/screens/reservations/EditName';
import ReservationsEditNotes from './src/screens/reservations/EditNotes';
import ReservationsEditPhoneNumber from './src/screens/reservations/EditPhoneNumber';
import ReservationsEditTags from './src/screens/reservations/EditTags';
import ReservationsEditTime from './src/screens/reservations/EditTime';
import Reservations from './src/screens/Reservations';

import Settings from './src/screens/Settings';
import SettingsApi from './src/screens/SettingsApi';
import SettingsApiFallbackUrl from './src/screens/SettingsApiFallbackUrl';
import SettingsApiKey from './src/screens/SettingsApiKey';
import SettingsApiUrl from './src/screens/SettingsApiUrl';
import SettingsCredits from './src/screens/SettingsCredits';
import SetupApiKey from './src/screens/SetupApiKey';
import SetupApiUrl from './src/screens/SetupApiUrl';
import SetupFinish from './src/screens/SetupFinish';
import SetupWelcome from './src/screens/SetupWelcome';

import TimeOffRequestsEditEndDate from './src/screens/time_off_requests/EditEndDate';
import TimeOffRequestsEditStartDate from './src/screens/time_off_requests/EditStartDate';
import TimeOffRequestsEditDetails from './src/screens/time_off_requests/EditDetails';
import TimeOffRequestsEditName from './src/screens/time_off_requests/EditName';
import TimeOffRequestsCreateFoundDuplicates from './src/screens/time_off_requests/CreateFoundDuplicates';
import TimeOffRequestsCreateReview from './src/screens/time_off_requests/CreateReview';
import TimeOffRequestsCreateDetails from './src/screens/time_off_requests/CreateDetails';
import TimeOffRequestsCreateEndDate from './src/screens/time_off_requests/CreateEndDate';
import TimeOffRequestsCreateStartDate from './src/screens/time_off_requests/CreateStartDate';
import TimeOffRequestsCreateName from './src/screens/time_off_requests/CreateName';
import TimeOffRequestsCreateWelcome from './src/screens/time_off_requests/CreateWelcome';
import TimeOffRequests from './src/screens/TimeOffRequests';

import global_styles from './src/styles/global_styles';

const NativeStack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const {height, width} = useWindowDimensions();

  /** STATE */
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

  /** SIDE-EFFECTS */
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

          /** Use the main URL as the default API URL */
          s_config_copy.env.API_URL = s_config_copy.env.API_MAIN_URL;

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


      /** Determine whether or not to use the fallback URL, we'll
       * only run this step if there is a fallback URL defined and
       * the fallback URL is not empty, otherwise this check would
       * be kind of pointless to run.
       */
      if(s_config_copy.env.API_FALLBACK_URL !== undefined && s_config_copy.env.API_FALLBACK_URL.length > 0){ 
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
      if(s_config.env.API_FALLBACK_URL !== undefined && s_config.env.API_FALLBACK_URL.length > 0 && net_state.type !== 'none' && net_state.isConnected){
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

  if(!s_loaded) return null; //return nothing until the app is loaded
  else return (
    <GestureHandlerRootView style={{flex:1}}>
      <NavigationContainer>
        <AppConfig.Provider value={[s_config, setConfigState]} >
          <StatusBar style="auto" />
          <NativeStack.Navigator screenOptions={{headerShown:false, animation:'fade_from_bottom'}}>
            {s_config.env.INITIALIZED ? <>
                <NativeStack.Screen name='home' component={HomeTabs} />

                <NativeStack.Screen name='reservations-create-welcome' component={ReservationsCreateWelcome} />
                <NativeStack.Screen name='reservations-create-date' component={ReservationsCreateDate} />
                <NativeStack.Screen name='reservations-create-time' component={ReservationsCreateTime} />
                <NativeStack.Screen name='reservations-create-guest' component={ReservationsCreateGuest} />
                <NativeStack.Screen name='reservations-create-name' component={ReservationsCreateName} />
                <NativeStack.Screen name='reservations-create-phonenumber' component={ReservationsCreatePhoneNumber} />
                <NativeStack.Screen name='reservations-create-tags' component={ReservationsCreateTags} />
                <NativeStack.Screen name='reservations-create-notes' component={ReservationsCreateNotes} />
                <NativeStack.Screen name='reservations-create-review' component={ReservationsCreateReview} />
                <NativeStack.Screen name='reservations-create-found-duplicates' component={ReservationsCreateFoundDuplicates} />

                <NativeStack.Screen name='reservations-edit-date' component={ReservationsEditDate} />
                <NativeStack.Screen name='reservations-edit-time' component={ReservationsEditTime} />
                <NativeStack.Screen name='reservations-edit-guest' component={ReservationsEditGuest} />
                <NativeStack.Screen name='reservations-edit-name' component={ReservationsEditName} />
                <NativeStack.Screen name='reservations-edit-phonenumber' component={ReservationsEditPhoneNumber} />
                <NativeStack.Screen name='reservations-edit-tags' component={ReservationsEditTags} />
                <NativeStack.Screen name='reservations-edit-notes' component={ReservationsEditNotes} />

                <NativeStack.Screen name='time-off-requests-create-welcome' component={TimeOffRequestsCreateWelcome} />
                <NativeStack.Screen name='time-off-requests-create-name' component={TimeOffRequestsCreateName} />
                <NativeStack.Screen name='time-off-requests-create-start-date' component={TimeOffRequestsCreateStartDate} />
                <NativeStack.Screen name='time-off-requests-create-end-date' component={TimeOffRequestsCreateEndDate} />
                <NativeStack.Screen name='time-off-requests-create-details' component={TimeOffRequestsCreateDetails} />
                <NativeStack.Screen name='time-off-requests-create-review' component={TimeOffRequestsCreateReview} />
                <NativeStack.Screen name='time-off-requests-create-found-duplicates' component={TimeOffRequestsCreateFoundDuplicates} />

                <NativeStack.Screen name='time-off-requests-edit-name' component={TimeOffRequestsEditName} />
                <NativeStack.Screen name='time-off-requests-edit-details' component={TimeOffRequestsEditDetails} />
                <NativeStack.Screen name='time-off-requests-edit-start-date' component={TimeOffRequestsEditStartDate} />
                <NativeStack.Screen name='time-off-requests-edit-end-date' component={TimeOffRequestsEditEndDate} />

                <NativeStack.Screen name='settings' component={Settings} />
                <NativeStack.Screen name='settings-api' component={SettingsApi} />
                <NativeStack.Screen name='settings-api-key' component={SettingsApiKey} />
                <NativeStack.Screen name='settings-api-url' component={SettingsApiUrl} />
                <NativeStack.Screen name='settings-api-fallback-url' component={SettingsApiFallbackUrl} />
                <NativeStack.Screen name='settings-credits' component={SettingsCredits} />
              </> : <>
                <NativeStack.Screen name='setup-welcome' component={SetupWelcome} />
                <NativeStack.Screen name='setup-apiurl' component={SetupApiUrl} />
                <NativeStack.Screen name='setup-apikey' component={SetupApiKey} />
                <NativeStack.Screen name='setup-finish' component={SetupFinish} />
              </>}
          </NativeStack.Navigator>
        </AppConfig.Provider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

function HomeTabs(){
  return (<BottomTab.Navigator screenOptions={ ({route}) => ({
    headerShown:false,
    animation:'fade_from_bottom',
    tabBarLabel: ({focused, color}) => {
      switch(route.name){
        case 'reservations': return (<Text style={[global_styles.secondaryButtonText, {fontFamily: focused ? 'PTSans-Bold' : 'PTSans-Regular'}]} >Reservations</Text>)
        case 'time-off': return (<Text style={[global_styles.secondaryButtonText, {fontFamily: focused ? 'PTSans-Bold' : 'PTSans-Regular'}]} >Time-off</Text>)
        default: return (<Text>Undefined</Text>)
      }
    },
    tabBarIcon: ({focused, color, size}) => {
      switch(route.name){
        case 'reservations': return (<Image style={global_styles.iconButtonImage} source={focused ? MenuBookFilledIcon : MenuBookIcon} />)
        case 'time-off': return (<Image style={global_styles.iconButtonImage} source={focused ? ScheduleFilledIcon : ScheduleIcon} />)
        default: return (<Text>Missing Icon</Text>)
      }
    },
    tabBarButton: (props) => (<TouchableHighlight underlayColor={appColors.content2} activeOpacity={0.6} {...props} />),
    tabBarStyle:{
      minHeight:50,
      backgroundColor:appColors.content,
    },
    tabBarLabelPosition:'below-icon',
  }) }>
    <BottomTab.Screen name='reservations' component={Reservations} />
    <BottomTab.Screen name='time-off' component={TimeOffRequests} />
  </BottomTab.Navigator>);
}