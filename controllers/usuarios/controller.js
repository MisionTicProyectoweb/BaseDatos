import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';
import jwtDecode from 'jwt-decode';
import { response } from 'express';
const crearUsuario = async(datosUsuarios, callback) => {
    /*  if (
         Object.keys(datosUsuarios).includes('ccUsuario') &&
         Object.keys(datosUsuarios).includes('nombre') &&
         Object.keys(datosUsuarios).includes('apellido') &&
         Object.keys(datosUsuarios).includes('estado') &&
         Object.keys(datosUsuarios).includes('rol')
     ) { */
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario').insertOne(datosUsuarios, callback);
    /*    } else {
           return 'error';
       } */
};

const queryAllUsuarios = async(callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario').find({}).limit(50).toArray(callback);
};
const consultaroCrearUsuario = async(req, callback) => {
    //6.1obtener los datos del usuario desde el token

    const token = req.headers.authorization.split('Bearer')[1];
    const user = jwtDecode(token)['http://localhost/userData'];
    console.log(user);
    //6.2. con el correo del usuario o con el id de auth0 si el //usario ya esta en la bd  o no 
    const basedatos = getDB();
    await basedatos.collection('usuario').findOne({ email: user.email }, async(err, res) => {

        console.log('responde consulta bd', res, user.email);

        if (res) {
            //7.si el usuario ya esta en la bd, devulve la info del usuario 
            callback(err, res);

        } else {
            //7.2 si el usuario no esta en la bd, lo creo y devulve la info 
            user.auth0ID = user._id;
            delete user._id;
            user.estado = 'Pendiente';
            user.rol = "Sin rol";
            await crearUsuario(user, (err, res) => callback(err, user));
        }
    });

};
const eliminarUsuario = async(id, callback) => {
    const filtroUsuario = { _id: new ObjectId(id) };
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario').deleteOne(filtroUsuario, callback);
};

const editarUsuario = async(id, edicion, callback) => {
    const filtroUsuario = { _id: new ObjectId(id) };
    //delete edicion.id
    const operacion = {
        $set: edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('usuario')
        .findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback);
};

export { queryAllUsuarios, eliminarUsuario, editarUsuario, crearUsuario, consultaroCrearUsuario };