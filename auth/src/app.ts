import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@authentic48/common';

import { signUp } from './routes/signup';
import { signIn } from './routes/signin';
import { signOut } from './routes/signout';
import { currentUser } from './routes/current-user';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(signUp);
app.use(signIn);
app.use(signOut);
app.use(currentUser);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
