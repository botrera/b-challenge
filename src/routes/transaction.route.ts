import { Router } from 'express';
import { transactionController } from '../controllers/transaction.controller';

const router: Router = Router();

router
  .route('/')
  .get(transactionController.getTransactionsByUserId)
  .post(transactionController.createTransaction);

router.patch('/:id/approve', transactionController.approveTransaction);

router.patch('/:id/reject', transactionController.rejectTransaction);

export const transactionRouter: Router = router;
