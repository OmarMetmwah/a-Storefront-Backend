import { Router } from 'express';
import * as controllers from '../../controllers/orders.controllers';

const routes = Router();

routes.route('/').get(controllers.list).post(controllers.create);
routes.route('/:id').get(controllers.getOrder).patch(controllers.updateOrder).delete(controllers.deleteorder);

export default routes;
