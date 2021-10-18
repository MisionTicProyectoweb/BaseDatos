import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllVenta = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('ventas').find({}).limit(50).toArray(callback);
};

const crearVenta = async (datosVenta, callback) => {
  if (
    Object.keys(datosVenta).includes('') &&
    Object.keys(datosVenta).includes('') &&
    Object.keys(datosVenta).includes('') &&
    Object.keys(datosVenta).includes('')
  ) {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('ventas').insertOne(datosVenta, callback);
  } else {
    return 'error';
  }
};

const consultarVenta = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('venta').findOne({ _id: new ObjectId(id) }, callback);
};

const editarVenta = async (id, edicion, callback) => {  
  const filtroVenta = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };  
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('venta')
    .findOneAndUpdate(filtroVenta, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarVenta = async (id, callback) => {
  const filtroProducto = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('venta').deleteOne(filtroProducto, callback);
};

export { queryAllVenta, crearVenta, consultarVenta,editarVenta, eliminarVenta };