import express, { Request, Response, Application } from 'express';
import routes from './routes';
import errorMiddleware from './middlewares/error.middleware';
import config from './config';
import cors from 'cors';
const app: Application = express();
const port = config.port || 3000;

//middleware to pares incoming requests
app.use(express.json());

app.use('/api', routes);

const corsOption = {
	optionsSuccessStatus: 200 // for some lagacy browsers
  };

  app.use(cors(corsOption));


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
