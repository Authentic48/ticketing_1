import express, { Request, Response } from 'express';

const route = express.Router();

route.post('/api/users/logout', async (req: Request, res: Response) => {
  req.session = null;

  res.json({});
});

export { route as signOut };
