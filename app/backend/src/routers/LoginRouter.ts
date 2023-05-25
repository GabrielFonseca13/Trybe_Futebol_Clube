import { Router } from 'express';
import LoginValidations from '../middlewares/LoginValidations';
import LoginController from '../controllers/LoginController';
import authToken from '../middlewares/authToken';

const LoginRouter = Router();

LoginRouter.post('/', LoginValidations, LoginController.login);
LoginRouter.get('/role', authToken, LoginController.getRole);
export default LoginRouter;
