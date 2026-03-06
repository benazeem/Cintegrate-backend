import { Request, Response } from "express";
import {
  createContextProfileService,
  getContextProfileService,
  listContextProfilesService,
} from "./contextProfile.service.js";
import { CreateContextProfileInput } from "@validation/contextProfile.schema.js";

export async function createContextProfileController(req: Request, res: Response) {
  const payload = req.validatedBody as CreateContextProfileInput;
  const context = await createContextProfileService(req.user!.id, payload);

  res.status(201).json({ data: context });
}

export async function getContextProfileController(req: Request, res: Response) {
  const context = await getContextProfileService(
    req.user!.id,
    req.params.contextId
  );

  res.json({ data: context });
}

export async function listContextProfilesController(
  req: Request,
  res: Response
) {
  const contexts = await listContextProfilesService(req.user!.id, req.query);

  res.json({ data: contexts });
}
