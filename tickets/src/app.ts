import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@authentic48/common';

import { createTicketRouter } from './routes/new';
import { showTicketRoute } from './routes/show';
import { indexTicketRoute } from './routes/index';
import { updateTicketRoute } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRoute);
app.use(indexTicketRoute);
app.use(updateTicketRoute);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
