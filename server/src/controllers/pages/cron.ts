import { Router } from "express";
import cron from 'node-cron';
import { cola } from "../../utilities/colaBeneficiario";
import pusher from "../../utilities/pusher";

const app = Router();

const checkInactiveBeneficiario = async () => {
  /* const ahora = new Date();
  const diff = ahora.getTime() - cola.updatedAt.getTime();
  const seconds = diff / 1000;
  const minutes = seconds / 60;
  if(minutes > 5) {
    cola.personas.shift();
    await pusher.trigger("cola-channel", "beneficiario", cola);
  } */
  console.log("Checking");
}

cron.schedule('*/1 * * * *', async () => {
  await checkInactiveBeneficiario();
});

app.get('/cola/cron', async (req, res) => {
  await checkInactiveBeneficiario();
})

export default app;