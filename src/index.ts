import express, { Request, Response, Application } from 'express';
import routes from './routes';
import errorMiddleware from './middlewares/error.middleware';
import config from './config';

const app: Application = express();
const port = config.port || 3000;

//middleware to pares incoming requests
app.use(express.json());

app.use('/api', routes);

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
