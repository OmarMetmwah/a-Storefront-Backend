"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
var config_1 = __importDefault(require("./config"));
var app = (0, express_1.default)();
var port = config_1.default.port || 3000;
//middleware to pares incoming requests
app.use(express_1.default.json());
// app.get('/', function (req: Request, res: Response) {
// 	db.connect().then(client => {
// 		client.query('select now()').then(r => {
// 			client.release();
// 			res.send(r.rows);
// 		}).catch(err=>{
// 			client.release();
// 			console.log(err);
// 		});
// 	});
// });
app.use("/api", routes_1.default);
app.use(error_middleware_1.default);
//Error handling for strange request from unkown endpoit
app.use(function (_req, res) {
    res.status(404).json({
        message: 'Your are using wrong API. Please, read the API documentaion.',
    });
});
app.listen(port, function () {
    console.log("starting app on: localhost:".concat(port));
});
exports.default = app;
