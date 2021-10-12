import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllVentas = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('ventas').find({}).limit(50).toArray(callback);
};

export {queryAllVentas};