import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
} from '@ticketing-pro/common';
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Order } from '../models/orders';
const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validationResult,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError('cannot pay for cancelled order');
    }
    res.send({ status: 'success' });
  }
);

export { router as createChargeRouter };
