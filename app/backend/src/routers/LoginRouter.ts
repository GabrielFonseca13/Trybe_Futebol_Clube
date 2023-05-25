import { Router } from 'express';
import LoginValidations from '../middlewares/LoginValidations';
import LoginController from '../controllers/LoginController';

const LoginRouter = Router();

LoginRouter.post('/', LoginValidations, LoginController.login);

export default LoginRouter;
