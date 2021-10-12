import Express from 'express';
import {
  queryAllProductos,
  crearProducto,
  editarProducto,
  eliminarProducto,
  consultarProducto,
} from '../../controllers/productos/controller.js';

const rutasProducto = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los productos');
  } else {
    res.json(result);
  }
};

rutasProducto.route('/productos').get((req, res) => {
  console.log('Alguien hizo get en la ruta /productos');
  queryAllProductos(genercCallback(res));
});

rutasProducto.route('/productos/nuevo').post((req, res) => {
  crearProducto(req.body, genercCallback(res));
});

rutasProducto.route('/productos/:id').get((req, res) => {
  console.log('Alguien hizo get en la ruta /productos');
  consultarProducto(req.params.id, genercCallback(res));
});

rutasProducto.route('/productos/:id').patch((req, res) => {
  editarProducto(req.params.id, req.body, genercCallback(res));
});

rutasProducto.route('/productos/:id').delete((req, res) => {
  eliminarProducto(req.params.id, genercCallback(res));
});

export default rutasProducto;
