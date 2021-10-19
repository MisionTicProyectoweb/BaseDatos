import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const crearCliente = async (datosClientes, callback) => {
  if (
    Object.keys(datosClientes).includes('cccliente') &&
    Object.keys(datosClientes).includes('nombre') &&
    Object.keys(datosClientes).includes('apellido')
  ) {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('cliente').insertOne(datosClientes, callback);
  } else {
    return 'error';
  }
};
const consultarCliente = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('cliente').findOne({ _id: new ObjectId(id) }, callback);
};

const queryAllClientes = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('cliente').find({}).limit(50).toArray(callback);
};

const eliminarCliente = async (id, callback) => {
  const filtrocliente = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('cliente').deleteOne(filtrocliente, callback);
};

const editarCliente = async (id, edicion, callback) => {  
  const filtrocliente = { _id: new ObjectId(id) };
  //delete edicion.id
  const operacion = {
    $set: edicion,
  };  
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('cliente')
    .findOneAndUpdate(filtrocliente, operacion, { upsert: true, returnOriginal: true }, callback);
};

export {queryAllClientes, eliminarCliente, editarCliente, crearCliente,consultarCliente};