import Express from 'express';
import {queryAllVenta, crearVenta, consultarVenta,editarVenta, eliminarVenta} from '../../controllers/ventas/controller.js';

const rutasVenta = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los ventas');
  } else {
    res.json(result);
  }
};

rutasVenta.route('/ventas').get((req, res) => {
  queryAllVenta(genercCallback(res));
});

rutasVenta.route('/ventas/nuevo').post((req, res) => {
  crearVenta(req.body, genercCallback(res));
});

rutasVenta.route('/ventas/:id').get((req, res) => {
  consultarVenta(req.params.id, genercCallback(res));
});

rutasVenta.route('/ventas/:id').patch((req, res) => {
  editarVenta(req.params.id, req.body, genercCallback(res));
});

rutasVenta.route('/ventas/:id').delete((req, res) => {
  eliminarVenta(req.params.id, genercCallback(res));
});

export default rutasVenta;