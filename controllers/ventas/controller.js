import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllVenta = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('ventas').find({}).limit(50).toArray(callback);
};

const crearVenta = async (datosVenta, callback) => {
  if (
    Object.keys(datosVenta).includes('idVentas') &&
    Object.keys(datosVenta).includes('arrayProductos') &&
    Object.keys(datosVenta).includes('fecha') &&
    Object.keys(datosVenta).includes('ccCliente') &&
    Object.keys(datosVenta).includes('valor') &&
    Object.keys(datosVenta).includes('idVendedor')
  ) {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('ventas').insertOne(datosVenta, callback);
  } else {
    return 'error';
  }
};

const consultarVenta = async (id, callback) => {
  const filtroVenta = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('ventas').findOne(filtroVenta, callback);
};

const editarVenta = async (id, edicion, callback) => {  
  const filtroVenta = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };  
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('ventas')
    .findOneAndUpdate(filtroVenta, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarVenta = async (id, callback) => {
  const filtroVenta = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('ventas').deleteOne(filtroVenta, callback);
};

export { queryAllVenta, crearVenta, consultarVenta,editarVenta, eliminarVenta };