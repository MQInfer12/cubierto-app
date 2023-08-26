import Pusher from 'pusher-js'

const API_KEY = process.env.EXPO_PUBLIC_PUSHER_APIKEY as string;

const pusher = new Pusher(API_KEY, {
  cluster: "us2"
});

export const channel = pusher.subscribe("cola-channel");