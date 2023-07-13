import { Router } from "express";

import { userController } from "../controllers/user.conroller";
import { commonMiddleware } from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.get("/", userController.findAll);
router.post(
  "/",
  commonMiddleware.isBodyValid(UserValidator.create),
  userController.create
);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.findById
);

router.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.update),
  userController.updatedById
);

router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.deleteById
);

export const userRouter = router;
