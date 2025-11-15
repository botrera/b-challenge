import { Router } from 'express';
import { config } from '../config';
import { userController } from '../controllers/user.controller';
import { UserTypeEnum } from '../enums';
import { middlewareService, uploadFile } from '../services';
import { userValidation } from '../validations';

const router: Router = Router();

router.route('/restore-password').get(userController.renderRestorePassword);

if (['LOCAL', 'DEV', 'QA', 'TEST'].includes(config.env)) {
  router.route('/signup').post(userValidation.signupUser, userController.signup);
}

router
  .route('/:userId')
  .all(middlewareService.authorizeRoles([UserTypeEnum.USER]))
  .get(userController.getUserById)
  .patch(userController.updateUser);

router
  .route('/:userId/profile')
  .all(middlewareService.authorizeRoles([UserTypeEnum.USER]))
  .post(uploadFile.uploadUserPhoto, userController.uploadProfilePic);

export const userRouter: Router = router;
