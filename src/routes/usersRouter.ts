import express from 'express';
import {
  createUser,
  getAllUsers
} from '../controllers/userController';

const usersRouter = express.Router();
usersRouter.get('/', (getAllUsers));
usersRouter.post('/', (createUser));
// router.delete('/deleteUser', deleteUser);

export default usersRouter;
