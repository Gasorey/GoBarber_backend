import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '@modules/users/services/CreateUserService';
import uploadConfig from '@config/upload';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { container } from 'tsyringe';
import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
