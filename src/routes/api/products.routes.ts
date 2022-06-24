import { Router } from 'express';
import * as controllers from '../../controllers/products.controllers';

const routes = Router();

routes.route('/').get(controllers.list).post(controllers.create);
routes.route('/:id').get(controllers.getProduct).patch(controllers.updateProduct).delete(controllers.deleteProduct);

export default routes;
