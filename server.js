import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from './db/db.js';
import rutasProducto from './views/productos/rutas.js';
import rutasUsuario from './views/usuarios/rutas.js';
import rutasVenta from './views/ventas/rutas.js';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import AutorizacionEstadoUsuario from './middleware/AutorizacionEstadoUsuario.js';
dotenv.config({ path: './.env' });
const app = Express();
app.use(Express.json());
app.use(Cors());

//este jwtcheck protege las rutas y solo son accedidas las que
//contienen el token de validacion en el header de los axios 
//en los header de los axios de cada ruta hay un header que tiene  Authorization: getToken()
//--------------falta colocarlo a las otras rutas que falta agregar en util/api.js

const JwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://mintic-proyecto.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'api-autenticacion-almacen-mintic',
    issuer: 'https://mintic-proyecto.us.auth0.com/',
    algorithms: ['RS256']
});
//4 Y 5 EVIARLE EL TOKEN A AUTH0 PARA QUE DEVULVA SI EL VALIDO O NO 
app.use(JwtCheck);

app.use(AutorizacionEstadoUsuario);
app.use(rutasProducto);
app.use(rutasUsuario);
app.use(rutasVenta);
const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`escuchando puerto ${process.env.PORT}`);
    });
};


conectarBD(main);