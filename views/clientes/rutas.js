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

rutasCliente.route('/Clientes').get((req, res) => {
  queryAllClientes(genercCallback(res));
});

rutasCliente.route('/Clientes').post((req, res) => {
  crearCliente(req.body, genercCallback(res));
});

rutasCliente.route('/Clientes/:id').get((req, res) => {
  consultarCliente(req.params.id, genercCallback(res));
});

rutasCliente.route('/Clientes/:id').patch((req, res) => {
  editarCliente(req.params.id, req.body, genercCallback(res));
});

rutasCliente.route('/Clientes/:id').delete((req, res) => {
  eliminarCliente(req.params.id, genercCallback(res));
});

export default rutasCliente;