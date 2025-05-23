import express from 'express';
import { body,query} from 'express-validator';
import  {authUser}  from '../middlewares/auth.middleware.js';
import { authCaptain } from '../middlewares/auth.middleware.js';
import { createRideController ,getfare,confirmride,startride,endride,getRideCoordinates,rateCaptain} from '../controllers/ride.controller.js';
const router = express.Router();


router.post('/create',
    authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type'),
    body('isCarpool').optional().isBoolean().withMessage('Invalid carpool flag'),
    body('availableSeats').optional().isInt({ min: 1, max: 6 }).withMessage('Invalid number of seats'),
    body('departureTime').optional().isISO8601().withMessage('Invalid departure time'),
    createRideController
);

router.get('/get-fare',
    authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
   getfare
)

router.post('/confirm',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    confirmride
)

router.get('/start-ride',
    authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    startride
)

router.post('/end-ride',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    endride
)
console.log("Hello from routes");
router.post('/review',
    rateCaptain
)
router.get('/coordinates/:rideId',
    getRideCoordinates
);

export default router;