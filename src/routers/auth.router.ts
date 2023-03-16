import { Router } from "express";

import { authController } from "../controllers";
import { authMiddleware, userMiddleware } from "../middlewares";

const router = Router();

router.post(
  "/register",
  userMiddleware.isValidCreate,
  userMiddleware.getDynamicallyAndThrow("email", "body"),
  authController.register
);

router.post(
  "/login",
  userMiddleware.isValidLogin,
  userMiddleware.getDynamicallyOrThrow("email", "body"),
  authController.login
);

router.post(
  "/password/change",
  userMiddleware.isValidChangePassword,
  authMiddleware.checkedAccessToken,
  authController.changePassword
);

router.post(
  "/refresh",
  authMiddleware.checkedRefreshToken,
  authController.refresh
);

export const authRouter = router;
