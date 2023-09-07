const endpoint = 'https://exp.host/--/api/v2/push/send';

interface Message {
  to: string,
  sound: string,
  title: string,
  body: string,
  data: {
    route: string
  }
}

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(body: Message | Message[]) {
  await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}