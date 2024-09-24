
/* external imports */

import express, {Application, Request, Response} from "express" ;

import morgan from "morgan";

/* internal imports */

import userRoutes from './routes/users';
import {authenticateKey} from './middleware/auth.middleware';

const PORT = process.env.PORT || 3000;

const app: Application = express();



app.use(morgan("tiny"));
app.use(express.json());

//app.use(authenticateKey); - all the routes below

app.get("/ping", async (_req : Request, res: Response) => {
    res.json({
    message: "hello from Una - has this changed",
    });
});


app.get('/bananas', async (_req : Request, res: Response) =>
  res.send('hello world, this is bananas - ha ha ha ha hda ha '));

app.use('/api/v1/users', authenticateKey, userRoutes)


app.listen(PORT, () => {
    console.log("Server is running on port  --", PORT);
    });


