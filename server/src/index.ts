import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import usuarioController from './controllers/usuario';
import authController from './controllers/auth';
import productoController from './controllers/producto';
import ubicacionController from './controllers/ubicacion';
import productoActivoController from './controllers/productoActivo';
import ventaController from './controllers/venta';
import detalleVentaController from './controllers/detalleVenta';
import donacionController from './controllers/donacion';
import detalleDonacionController from './controllers/detalleDonacion';
import favoritoController from './controllers/favorito'
import categoriaController from './controllers/categoria'

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

app.listen(port, () => {
  return console.log(`server is listening on http://localhost:${port}`);
});
