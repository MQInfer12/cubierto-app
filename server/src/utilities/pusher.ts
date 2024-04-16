import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1763164",
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "mt1",
  useTLS: true
});

export default pusher;