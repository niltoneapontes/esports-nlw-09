
import { StatusBar } from 'react-native';
import { Background } from './src/components/Background';
import * as Notifications from 'expo-notifications';

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

import './src/services/notificationsConfig'
import { getPushNotificationToken } from './src/services/getPushNotificationToken';
import { useEffect, useRef } from 'react';
import { Subscription } from 'expo-modules-core';



export default function App() {

  const getNotificationListener = useRef<Subscription>()
  const responseNotificationListener = useRef<Subscription>()

  useEffect(() => {
    getPushNotificationToken();
  }, [])

  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.info(notification);
    });

    responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.info(response);
    });

    return () => {
      if(getNotificationListener.current && responseNotificationListener.current) {
        Notifications.removeNotificationSubscription(getNotificationListener.current);
        Notifications.removeNotificationSubscription(responseNotificationListener.current);
      }
    }
  }, [])

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  })
  return (
    <Background>
      <StatusBar barStyle='light-content' backgroundColor="transparent" translucent/>
      {fontsLoaded ? (
        <Routes></Routes>
      ) : (
        <Loading></Loading>
      )}
    </Background>
  );
}
