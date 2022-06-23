import { Router,Request,Response } from "express";
import * as controllers from "../../controllers/users.controllers";

const routes = Router();

routes.route('/').get(controllers.list).post(controllers.create);
routes.route("/:id").get(controllers.getUser).patch(controllers.updateUser).delete(controllers.deleteUser);

export default routes;