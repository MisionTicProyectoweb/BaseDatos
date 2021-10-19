import Express from 'express';
import { queryAllUsuarios, eliminarUsuario, editarUsuario, crearUsuario, consultaroCrearUsuario } from '../../controllers/usuarios/controller.js';

const rutasUsuario = Express.Router();

const genercCallback = (res) => (err, result) => {
    if (err) {
        res.status(500).send(err);
    } else {
        res.json(result);
    }
};

rutasUsuario.route('/usuarios/nuevo').post((req, res) => {
    crearUsuario(req.body, genercCallback(res));
});

rutasUsuario.route('/usuarios').get((req, res) => {
    queryAllUsuarios(genercCallback(res));
});
//ruta del usuario registrado con autenticacion AUTH0
rutasUsuario.route('/usuarios/self').get((req, res) => {
    console.log('obteniendo la ruta self');
    consultaroCrearUsuario(req, genercCallback(res))
});

rutasUsuario.route('/usuarios/:id').delete((req, res) => {

    eliminarUsuario(req.params.id, genercCallback(res));
});

rutasUsuario.route('/usuarios/editar/:id').patch((req, res) => {
    editarUsuario(req.params.id, req.body, genercCallback(res));
});

export default rutasUsuario;