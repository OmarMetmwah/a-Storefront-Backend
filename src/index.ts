import express, { Request, Response, Application } from 'express';
import errorMiddleware from './middlewares/error.middleware';
import config from './config';
import db from './database';

const app: Application = express();
const port = config.port || 3000;

//middleware to pares incoming requests
app.use(express.json());

app.get('/', function (req: Request, res: Response) {
	db.connect().then(client => {
		client.query('select now()').then(r => {
			client.release();
			res.send(r.rows);
		}).catch(err=>{
			client.release();
			console.log(err);
		});
	});
});

app.use(errorMiddleware);

//Error handling for strange request from unkown endpoit
app.use((_req: Request, res: Response) => {
	res.status(404).json({
		message: 'Your are using wrong API. Please, read the API documentaion.',
	});
});

app.listen(port, function () {
	console.log(`starting app on: localhost:${port}`);
});

export default app;
