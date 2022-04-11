import { NotFoundError } from '@authentic48/common';
import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';

const route = express.Router();

route.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  return res.status(200).send(ticket);
});

export { route as showTicketRoute };
