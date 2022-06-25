import { Router } from 'express';
import * as controllers from '../../controllers/users.controllers';
import authentication from '../../middlewares/authentication.middleware';

const routes = Router();

routes.route('/').get(authentication, controllers.list).post(controllers.create);
routes.route('/:id').get(authentication, controllers.getUser).patch(authentication, controllers.updateUser).delete(authentication, controllers.deleteUser);
routes.route('/authenticate').post(controllers.authenticate);
export default routes;
