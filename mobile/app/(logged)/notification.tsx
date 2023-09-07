import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Button from '../../components/global/button'
import { registerForPushNotificationsAsync, sendPushNotification } from '../../utilities/notifications';
import * as Notifications from 'expo-notifications'
import FontedText from '../../components/global/fontedText';
import { router } from 'expo-router';

const Notification = () => {
  const [expoPushToken, setExpoPushToken] = useState<any>('');
  const responseListener = useRef<any>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token?.data));

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      const route = data.route;
      router.push(route);
    });

    return () => {
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const handleEnviarNotificacion = async () => {
    await sendPushNotification(expoPushToken);
  }
    
  return (
    <View>
      <FontedText>Your expo push token: {JSON.stringify(expoPushToken)}</FontedText>
      <Button onPress={handleEnviarNotificacion}>Enviar notificacion</Button>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({})