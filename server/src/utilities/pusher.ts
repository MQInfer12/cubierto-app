import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1658556",
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "us2",
  useTLS: true
});

export default pusher;