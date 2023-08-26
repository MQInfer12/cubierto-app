import { useEffect } from 'react';
import { Pusher, PusherEvent } from '@pusher/pusher-websocket-react-native';

type ApiResponse<T> = {
  message: string, 
  data: T
}

interface OnEvent {
  eventName: string
  handler: (event: PusherEvent) => any
}

export const usePusher = (channel: string, onEvents: OnEvent[]) => {
  useEffect(() => {
    const setupPusher = async () => {
      const pusher = Pusher.getInstance();
      await pusher.init({
        apiKey: process.env.EXPO_PUBLIC_PUSHER_APIKEY as string,
        cluster: "us2"
      });
      await pusher.connect();
      await pusher.subscribe({
        channelName: channel,
        onEvent: (e) => {
          const selected = onEvents.find(onEvent => onEvent.eventName === e.eventName);
          if(selected) {
            selected.handler(e);
          }
        }
      })
    }
    setupPusher();
  }, []);
}