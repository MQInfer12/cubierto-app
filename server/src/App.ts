import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola mundo! CUBIERTO SERVER');
});

app.listen(port, () => {
  return console.log(`server is listening on http://localhost:${port}`);
});
