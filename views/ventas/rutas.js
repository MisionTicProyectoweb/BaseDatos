import Express from 'express';
import {queryAllVentas} from '../../controllers/ventas/controller.js';

const rutasVenta = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los productos');
  } else {
    res.json(result);
  }
};

rutasVenta.route('/ventas').get((req, res) => {
  console.log('alguien hizo get en la ruta /ventas');
  queryAllVentas(genercCallback(res));
});

export default rutasVenta;