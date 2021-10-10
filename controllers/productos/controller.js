import { ObjectId } from 'mongodb';
import { getDB } from '../../../BaseDatos/db/db.js';

const queryAllProductos = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('producto').find().limit(50).toArray(callback);
};

const crearProductos = async (datosProductos, callback) => {
  if (
    Object.keys(datosProductos).includes('name') &&
    Object.keys(datosProductos).includes('brand') &&
    Object.keys(datosProductos).includes('model')
  ) {
    const baseDeDatos = getDB();
    // implementar código para crear producto en la BD
    await baseDeDatos.collection('productos').insertOne(datosProductos, callback);
  } else {
    return 'error';
  }
};

const editarProductos = async (id, edicion, callback) => {
  const filtroProductos = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('productos')
    .findOneAndUpdate(filtroProductos, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarProductos = async (id, callback) => {
  const filtroProductos = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('productos').deleteOne(filtroProductos, callback);
};

export { queryAllProductos, crearProductos, editarProductos, eliminarProductos };
