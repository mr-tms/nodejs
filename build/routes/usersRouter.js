"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_1 = require("../controllers/userController");
var router = express_1.default.Router();
var usersRouter = router.route('/').get(userController_1.getAllUsers).post(userController_1.createUser);
// router.delete('/deleteUser', deleteUser);
exports.default = usersRouter;
