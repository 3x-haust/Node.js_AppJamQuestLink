import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import questRoute from './routes/questRoute';
import userRoute from './routes/userRoute';
import rankRoute from './routes/rankRoute';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use('/api', questRoute);
app.use('/api', userRoute);
app.use('/api', rankRoute);


export default app;