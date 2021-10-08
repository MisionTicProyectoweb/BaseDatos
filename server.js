import Express from 'express';
import {
    queryAllVehicles,
    crearProductos,
    editarProductos,
    eliminarProductos,
} from '../../controllers/productos/controller.js';
import { getDB } from '../../db/db.js';

const rutasProductos = Express.Router();

const genercCallback = (res) => (err, result) => {
    if (err) {
        res.status(500).send('Error consultando los Productoss');
    } else {
        res.json(result);
    }
};

rutasProductos.route('/productos').get((req, res) => {
    console.log('alguien hizo get en la ruta /productos');
    queryAllVehicles(genercCallback(res));
});

rutasProductos.route('/productos').post((req, res) => {
    crearProductos(req.body, genercCallback(res));
});

rutasProductos.route('/productos/:id').patch((req, res) => {
    editarProductos(req.params.id, req.body, genercCallback(res));
});

rutasProductos.route('/productos/:id').delete((req, res) => {
    eliminarProductos(req.params.id, genercCallback(res));
});

export default rutasProductos;
