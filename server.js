// hacer el import de express tradicional
// const express = require('express');
// se instala nodemon asi: yarn add -D nodemon

// se debe agregar "type": "module", en el package.json para importar express con el nuevo import
// agregar tambien en el package.json
//   "scripts": {
//    "start": "nodemon server.js"
//  },

// hacer el nuevo import
import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from './db/db.js';
import rutasProducto from './views/productos/rutas.js';
//import rutasUsuario from './views/usuarios/rutas.js';
//import rutasVenta from './views/ventas/rutas.js';

dotenv.config({ path: './.env' });

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasProducto);
//app.use(rutasUsuario);
//app.use(rutasVenta);

const main = () => {
  return app.listen(process.env.PORT, () => {  
    console.log(`escuchando puerto ${process.env.PORT}`); 
  });
};

conectarBD(main);