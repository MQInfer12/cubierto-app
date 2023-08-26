import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import usuarioController from './controllers/models/usuario';
import productoController from './controllers/models/producto';
import ubicacionController from './controllers/models/ubicacion';
import productoActivoController from './controllers/models/productoActivo';
import ventaController from './controllers/models/venta';
import detalleVentaController from './controllers/models/detalleVenta';
import donacionController from './controllers/models/donacion';
import detalleDonacionController from './controllers/models/detalleDonacion';
import favoritoController from './controllers/models/favorito';
import categoriaController from './controllers/models/categoria';
import authController from './controllers/auth';
import getPagesController from './controllers/pages/get';
import postPagesController from './controllers/pages/post';
import colaController from './controllers/pages/cola';

const app = express();
const port = 3000;

dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('¡CUBIERTO Backend!');
});

app.use(usuarioController); 
app.use(authController);
app.use(productoController);
app.use(ubicacionController);
app.use(productoActivoController);
app.use(ventaController);
app.use(detalleVentaController);
app.use(donacionController);
app.use(detalleDonacionController);
app.use(favoritoController);
app.use(categoriaController);
app.use(getPagesController);
app.use(postPagesController);
app.use(colaController);

app.listen(port, () => {
  return console.log(`server is listening on http://localhost:${port}`);
});
