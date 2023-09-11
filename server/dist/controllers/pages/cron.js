"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app = (0, express_1.Router)();
/* const checkInactiveBeneficiario = async () => {
  const ahora = new Date();
  const diff = ahora.getTime() - cola.updatedAt.getTime();
  const seconds = diff / 1000;
  const minutes = seconds / 60;
  if(minutes > 5) {
    cola.personas.shift();
    await pusher.trigger("cola-channel", "beneficiario", cola);
  }
} */
//cron.schedule('*/1 * * * *', async () => {
// await checkInactiveBeneficiario();
//});
/* app.get('/cola/cron', async (req, res) => {
  await checkInactiveBeneficiario();
  res.json({
    "message": "Checkeado inactividad de la cola"
  });
}) */
exports.default = app;
//# sourceMappingURL=cron.js.map