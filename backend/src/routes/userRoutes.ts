import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  console.log(req)
  res.json({ message: 'List of users' });
});

export default router;