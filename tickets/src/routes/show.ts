import express from 'express';
import showCtrl from '../controllers/show';
const router = express.Router();

router.get('/api/tickets/:id', showCtrl.showTicket);

export { router as showTicketRouter };
