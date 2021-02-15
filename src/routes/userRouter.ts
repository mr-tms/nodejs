import express from 'express';
import {
  createUser,
  getAllUsers
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(createUser);
// router.delete('/deleteUser', deleteUser);

export default userRouter;
