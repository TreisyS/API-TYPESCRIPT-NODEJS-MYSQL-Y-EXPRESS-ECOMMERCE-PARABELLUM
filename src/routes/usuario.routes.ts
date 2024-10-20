
//usuarios.routes.ts
import { Router } from 'express';
import { register, login, getUsuarios } from '../controllers/usuarios.controller'; 


const router = Router();

router.route('/register')
.post(register);
router.route('/login')
.post(login);

router.route('/')
  .get(getUsuarios) 


//router.post('/register', register);

// Ruta para hacer login de usuario
//router.post('/login', login);

// Ruta protegida de ejemplo para usuarios autenticados (requiere token)



export default router;
/*router.route('/')
  .get(getproductos)  // Obtención de productos disponible para todos
  .post(agregarproductos); */