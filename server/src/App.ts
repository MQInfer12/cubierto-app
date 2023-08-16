import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import usuarioController from './controllers/usuario';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('¡CUBIERTO Backend!');
});

app.use(usuarioController); 

app.listen(port, () => {
  return console.log(`server is listening on http://localhost:${port}`);
});
