import { Router } from "express";
import { 
  createContextProfileController,
  getContextProfileController,
  listContextProfilesController,
} from "./contextProfile.controller.js";
import { asyncHandler } from "@utils/asyncHandler.js";
import { validateBody } from "@validation/validateBody.js";
import { createContextProfileSchema } from "@validation/contextProfile.schema.js";

const router = Router();
 
router.post("/", validateBody(createContextProfileSchema), asyncHandler(createContextProfileController));
// router.post("/:contextId/clone", cloneContextProfileController);
 
router.get("/:contextId", asyncHandler(getContextProfileController));
 
router.get("/", asyncHandler(listContextProfilesController));

export default router;
