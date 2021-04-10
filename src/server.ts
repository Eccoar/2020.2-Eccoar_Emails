import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import routers from './routes';
import handleErrors from './utils/errors';

const app = express();
const PORT = process.env.APP_PORT || 5000;

app.use(morgan('combined'));
app.use(express.json());
app.use(cors());
app.use(routers);
app.use(handleErrors);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});
