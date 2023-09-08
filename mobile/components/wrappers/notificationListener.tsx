import { useEffect, useRef } from 'react'
import * as Notifications from 'expo-notifications'
import { router } from 'expo-router';
import { usePushToken } from '../../context/pushToken';
import { useUser } from '../../context/user';
import { sendRequest } from '../../utilities/sendRequest';
import { notChannel } from '../../pusher';

interface Props {
  children: JSX.Element | JSX.Element[] 
}

const NotificationListener = ({ children }: Props) => {
  const { pushToken } = usePushToken();
  const { user, changeNotificacionesPendientes } = useUser();
  const responseListener = useRef<any>();

  useEffect(() => {
    const changePushToken = async () => {
      await sendRequest(`usuario/pushToken/${user?.id}`, {
        pushToken: pushToken
      }, {
        method: "PATCH"
      });
    }
    if(!!pushToken && user?.pushToken !== pushToken) {
      changePushToken();
    }
  }, [pushToken, user]);

  useEffect(() => {
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      const route = data.route;
      router.push(route);
    });

    return () => {
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    notChannel.bind("all", () => {
      changeNotificacionesPendientes(old => old + 1);
    });
    return () => {
      notChannel.unbind("all");
    }
  }, []);

  return children
}

export default NotificationListener