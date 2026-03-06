// import { Request, Response, NextFunction } from 'express';
// import { Types } from 'mongoose';
// import videoConfigService, { createVideoConfig } from './videoConfig.service.js';
// import { asyncHandler } from '@utils/asyncHandler.js';
// import { CreateVideoConfigType } from '@validation/videoConfig.schema.js';

// // ============ Create Video Config ============

// export const createVideoConfigController = async (req: Request, res: Response) => {
//   const userId = req.user?.id;
//   const requestInput = req.validatedBody as CreateVideoConfigType 

//   const videoConfig = await createVideoConfig({
//     userId,
//     ...requestInput
    
//   });

//   res.status(201).json({
//     success: true,
//     message: 'Video configuration created successfully',
//     data: videoConfig,
//   });
// });

// // ============ Get Video Config By ID ============

// export const getVideoConfigById = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
//   const userId = new Types.ObjectId(req.user!._id);
//   const configId = new Types.ObjectId(req.params.configId);

//   const populate = req.query.populate ? (req.query.populate as string).split(',') : undefined;

//   const videoConfig = await videoConfigService.getVideoConfigById(configId, userId, populate);

//   res.status(200).json({
//     success: true,
//     data: videoConfig,
//   });
// });

// // ============ Get Video Configs ============

// export const getVideoConfigs = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
//   const userId = new Types.ObjectId(req.user!._id);

//   const result = await videoConfigService.getVideoConfigs({
//     userId,
//     storyId: req.query.storyId ? new Types.ObjectId(req.query.storyId as string) : undefined,
//     projectId: req.query.projectId ? new Types.ObjectId(req.query.projectId as string) : undefined,
//     isTemplate: req.query.isTemplate !== undefined ? req.query.isTemplate === 'true' : undefined,
//     page: parseInt(req.query.page as string) || 1,
//     limit: parseInt(req.query.limit as string) || 20,
//     sortBy: req.query.sortBy as string,
//     sortOrder: req.query.sortOrder as 'asc' | 'desc',
//   });

//   res.status(200).json({
//     success: true,
//     data: result.data,
//     pagination: result.pagination,
//   });
// });

// // ============ Update Video Config ============

// export const updateVideoConfig = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
//   const userId = new Types.ObjectId(req.user!._id);
//   const configId = new Types.ObjectId(req.params.configId);

//   // Transform ObjectId strings if present
//   const updates = { ...req.body };
//   if (updates.sceneOrder) {
//     updates.sceneOrder = updates.sceneOrder.map((id: string) => new Types.ObjectId(id));
//   }
//   if (updates.narration?.narrationId) {
//     updates.narration.narrationId = new Types.ObjectId(updates.narration.narrationId);
//   }
//   if (updates.narration?.audioAssetId) {
//     updates.narration.audioAssetId = new Types.ObjectId(updates.narration.audioAssetId);
//   }

//   const videoConfig = await videoConfigService.updateVideoConfig(configId, userId, updates);

//   res.status(200).json({
//     success: true,
//     message: 'Video configuration updated successfully',
//     data: videoConfig,
//   });
// });

// // ============ Delete Video Config ============

// export const deleteVideoConfig = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
//   const userId = new Types.ObjectId(req.user!._id);
//   const configId = new Types.ObjectId(req.params.configId);

//   await videoConfigService.deleteVideoConfig(configId, userId);

//   res.status(200).json({
//     success: true,
//     message: 'Video configuration deleted successfully',
//   });
// });

// // ============ Update Narration Config ============

// export const updateNarrationConfig = asyncHandler(
//   async (req: Request, res: Response, _next: NextFunction) => {
//     const userId = new Types.ObjectId(req.user!._id);
//     const configId = new Types.ObjectId(req.params.configId);

//     const narrationConfig = {
//       ...req.body,
//       narrationId: new Types.ObjectId(req.body.narrationId),
//       audioAssetId: req.body.audioAssetId ? new Types.ObjectId(req.body.audioAssetId) : undefined,
//     };

//     const videoConfig = await videoConfigService.updateNarrationConfig(configId, userId, narrationConfig);

//     res.status(200).json({
//       success: true,
//       message: 'Narration configuration updated successfully',
//       data: videoConfig,
//     });
//   }
// );

// // ============ Update Caption Config ============

// export const updateCaptionConfig = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
//   const userId = new Types.ObjectId(req.user!._id);
//   const configId = new Types.ObjectId(req.params.configId);

//   const videoConfig = await videoConfigService.updateCaptionConfig(configId, userId, req.body);

//   res.status(200).json({
//     success: true,
//     message: 'Caption configuration updated successfully',
//     data: videoConfig,
//   });
// });

// // ============ Add Sound Effect ============

// export const addSoundEffect = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
//   const userId = new Types.ObjectId(req.user!._id);
//   const configId = new Types.ObjectId(req.params.configId);

//   const soundEffect = {
//     ...req.body,
//     audioAssetId: new Types.ObjectId(req.body.audioAssetId),
//   };

//   const videoConfig = await videoConfigService.addSoundEffect(configId, userId, soundEffect);

//   res.status(201).json({
//     success: true,
//     message: 'Sound effect added successfully',
//     data: videoConfig,
//   });
// });

// // ============ Update Sound Effect ============

// export const updateSoundEffect = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
//   const userId = new Types.ObjectId(req.user!._id);
//   const configId = new Types.ObjectId(req.params.configId);
//   const index = parseInt(req.params.index);

//   const soundEffect = {
//     ...req.body.soundEffect,
//     audioAssetId: new Types.ObjectId(req.body.soundEffect.audioAssetId),
//   };

//   const videoConfig = await videoConfigService.updateSoundEffect(configId, userId, index, soundEffect);

//   res.status(200).json({
//     success: true,
//     message: 'Sound effect updated successfully',
//     data: videoConfig,
//   });
// });

// // ============ Remove Sound Effect ============

// export const removeSoundEffect = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
//   const userId = new Types.ObjectId(req.user!._id);
//   const configId = new Types.ObjectId(req.params.configId);
//   const index = parseInt(req.params.index);

//   const videoConfig = await videoConfigService.removeSoundEffect(configId, userId, index);

//   res.status(200).json({
//     success: true,
//     message: 'Sound effect removed successfully',
//     data: videoConfig,
//   });
// });

// // ============ Update Scene Order ============

// export const updateSceneOrder = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
//   const userId = new Types.ObjectId(req.user!._id);
//   const configId = new Types.ObjectId(req.params.configId);

//   const sceneOrder = req.body.sceneOrder.map((id: string) => new Types.ObjectId(id));
//   const sceneTiming = req.body.sceneTiming?.map((timing: { sceneId: string }) => ({
//     ...timing,
//     sceneId: new Types.ObjectId(timing.sceneId),
//   }));

//   const videoConfig = await videoConfigService.updateSceneOrder(configId, userId, sceneOrder, sceneTiming);

//   res.status(200).json({
//     success: true,
//     message: 'Scene order updated successfully',
//     data: videoConfig,
//   });
// });

// // ============ Update Transitions ============

// export const updateTransitions = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
//   const userId = new Types.ObjectId(req.user!._id);
//   const configId = new Types.ObjectId(req.params.configId);

//   const videoConfig = await videoConfigService.updateTransitions(configId, userId, req.body.transitions);

//   res.status(200).json({
//     success: true,
//     message: 'Transitions updated successfully',
//     data: videoConfig,
//   });
// });

// // ============ Update Output Settings ============

// export const updateOutputSettings = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
//   const userId = new Types.ObjectId(req.user!._id);
//   const configId = new Types.ObjectId(req.params.configId);

//   const videoConfig = await videoConfigService.updateOutputSettings(configId, userId, req.body);

//   res.status(200).json({
//     success: true,
//     message: 'Output settings updated successfully',
//     data: videoConfig,
//   });
// });

// // ============ Update Background Audio ============

// export const updateBackgroundAudio = asyncHandler(
//   async (req: Request, res: Response, _next: NextFunction) => {
//     const userId = new Types.ObjectId(req.user!._id);
//     const configId = new Types.ObjectId(req.params.configId);

//     const backgroundAudio = {
//       ...req.body,
//       audioAssetId: req.body.audioAssetId ? new Types.ObjectId(req.body.audioAssetId) : undefined,
//     };

//     const videoConfig = await videoConfigService.updateBackgroundAudio(configId, userId, backgroundAudio);

//     res.status(200).json({
//       success: true,
//       message: 'Background audio updated successfully',
//       data: videoConfig,
//     });
//   }
// );

// // ============ Update Watermark ============

// export const updateWatermark = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
//   const userId = new Types.ObjectId(req.user!._id);
//   const configId = new Types.ObjectId(req.params.configId);

//   const videoConfig = await videoConfigService.updateWatermark(configId, userId, req.body);

//   res.status(200).json({
//     success: true,
//     message: 'Watermark updated successfully',
//     data: videoConfig,
//   });
// });

// // ============ Validate For Rendering ============

// export const validateForRendering = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
//   const userId = new Types.ObjectId(req.user!._id);
//   const configId = new Types.ObjectId(req.params.configId);

//   const result = await videoConfigService.validateForRendering(configId, userId);

//   res.status(200).json({
//     success: true,
//     data: result,
//   });
// });

// // ============ Clone Video Config ============

// export const cloneVideoConfig = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
//   const userId = new Types.ObjectId(req.user!._id);
//   const configId = new Types.ObjectId(req.params.configId);

//   const videoConfig = await videoConfigService.cloneVideoConfig(
//     configId,
//     userId,
//     req.body.name,
//     req.body.description
//   );

//   res.status(201).json({
//     success: true,
//     message: 'Video configuration cloned successfully',
//     data: videoConfig,
//   });
// });

// // ============ Get Templates ============

// export const getTemplates = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
//   const userId = new Types.ObjectId(req.user!._id);
//   const page = parseInt(req.query.page as string) || 1;
//   const limit = parseInt(req.query.limit as string) || 20;

//   const result = await videoConfigService.getTemplates(userId, page, limit);

//   res.status(200).json({
//     success: true,
//     data: result.data,
//     pagination: result.pagination,
//   });
// });

// // ============ Apply Template ============

// export const applyTemplate = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
//   const userId = new Types.ObjectId(req.user!._id);

//   const videoConfig = await videoConfigService.applyTemplate(
//     new Types.ObjectId(req.body.templateId),
//     userId,
//     new Types.ObjectId(req.body.storyId),
//     new Types.ObjectId(req.body.projectId),
//     req.body.name
//   );

//   res.status(201).json({
//     success: true,
//     message: 'Template applied successfully',
//     data: videoConfig,
//   });
// });

// export default {
//   createVideoConfig,
//   getVideoConfigById,
//   getVideoConfigs,
//   updateVideoConfig,
//   deleteVideoConfig,
//   updateNarrationConfig,
//   updateCaptionConfig,
//   addSoundEffect,
//   updateSoundEffect,
//   removeSoundEffect,
//   updateSceneOrder,
//   updateTransitions,
//   updateOutputSettings,
//   updateBackgroundAudio,
//   updateWatermark,
//   validateForRendering,
//   cloneVideoConfig,
//   getTemplates,
//   applyTemplate,
// };
