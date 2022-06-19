import express, { Request, Response, Application } from 'express';

const app: Application = express();
const address = 'localhost:3000';

app.get('/', function (req: Request, res: Response) {
	res.send('Hello World!!');
});

app.listen(3000, function () {
	console.log(`starting app on: ${address}`);
});
