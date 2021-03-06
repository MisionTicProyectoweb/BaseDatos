import Express from 'express';
import {
  queryAllClientes,
  crearCliente,
  editarCliente,
  eliminarCliente,
  consultarCliente,
} from '../../controllers/clientes/controller.js';

const rutasCliente = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los Clientes');
  } else {
    res.json(result);
  }
};

rutasCliente.route('/clientes').get((req, res) => {
  queryAllClientes(genercCallback(res));
});

rutasCliente.route('/clientes/nuevo').post((req, res) => {
  crearCliente(req.body, genercCallback(res));
});

rutasCliente.route('/clientes/:id').get((req, res) => {
  consultarCliente(req.params.id, genercCallback(res));
});

rutasCliente.route('/clientes/:id').patch((req, res) => {
  editarCliente(req.params.id, req.body, genercCallback(res));
});

rutasCliente.route('/clientes/:id').delete((req, res) => {
  eliminarCliente(req.params.id, genercCallback(res));
});

export default rutasCliente;