import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllUsuarios = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuario').find({}).limit(50).toArray(callback);
};

const eliminarUsuario = async (id, callback) => {
  const filtroUsuario = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuario').deleteOne(filtroUsuario, callback);
};

const editarUsuario = async (id, edicion, callback) => {  
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

export {queryAllUsuarios, eliminarUsuario, editarUsuario};