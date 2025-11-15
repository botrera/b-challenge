import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { UserTypeEnum } from '../enums';
import { middlewareService } from '../services';
import { authValidation, userValidation } from '../validations';

const router: Router = Router();

router.route('/login').post(authValidation.login, authController.login);

router.route('/logout').post(authValidation.login, authController.logout);

router.route('/restore-password').post(authController.restorePassword);

router
  .route('/change-password')
  .all(middlewareService.authorizeRoles([UserTypeEnum.USER]))
  .post(userValidation.changePassword, authController.changePassword);

router.route('/forgot-password').post(userValidation.forgotPassword, authController.forgotPassword);

export const authRouter: Router = router;
