import { View } from 'react-native'
import React from 'react'
import Button from '../../components/global/button'
import { sendPushNotification } from '../../utilities/notifications';
import FontedText from '../../components/global/fontedText';
import { usePushToken } from '../../context/pushToken';

const Notification = () => {
  const { pushToken } = usePushToken();

  const handleEnviarNotificacion = async () => {
    await sendPushNotification(pushToken);
  }

  return (
    <View>
      <FontedText>Your expo push token: {JSON.stringify(pushToken)}</FontedText>
      <Button onPress={handleEnviarNotificacion}>Enviar notificacion</Button>
    </View>
  )
}

export default Notification