import {Router} from 'express';

import {userController} from "../controllers/user.controller";
import {userMiddleware} from "../middlewares/user.middleware";

const router = Router();

router.get("/", userController.getAll);

router.get("/:userId", userMiddleware.getByIdAndThrow, userController.getById);

router.post("/", userMiddleware.createVerifyAndThrow, userController.create);

router.put("/:userId", userMiddleware.updateByIdVerifyAndThrow, userController.update);

router.delete("/:userId", userMiddleware.deleteByIdAndThrow, userController.delete);

export const userRouter = router;