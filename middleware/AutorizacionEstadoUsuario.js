import { getDB } from "../db/db.js";
import jwtDecode from "jwt-decode";
const AutorizacionEstadoUsuario = async(req, ress, next) => {

    //1: obtener el usuario desde el token

    const token = req.headers.authorization.split('Bearer')[1];
    const user = jwtDecode(token)['http://localhost/userData'];
    //2.consultar el usuario en la bd
    const basedatos = getDB();
    await basedatos.collection('usuario').findOne({ email: user.email }, async(err, res) => {


        if (res) {
            //3.verificar el estado del usuario.
            if (res.estado === 'No autorizado') {
                //si el usuario es No autorizado devolver  un error de autenticacion 
                ress.sendStatus(401);
                ress.end();



            } else {
                //4.si el usuario esta pentiente o habilitado ejecutar next

                console.log('habilitado');
                next();
            }
        } else {
            next();
        }
    });    
};
export default AutorizacionEstadoUsuario;