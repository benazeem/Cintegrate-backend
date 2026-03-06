// import { Router } from 'express';
// import { validateBody } from '@validation/validateBody.js';
// import {
//   createVideoConfigSchema,
//   updateVideoConfigSchema,
//   updateNarrationConfigSchema,
//   updateCaptionsConfigSchema,
//   addSoundEffectSchema,
//   updateSoundEffectSchema,
//   updateSceneOrderSchema,
//   updateTransitionsSchema,
//   updateOutputSettingsSchema,
//   updateBackgroundAudioSchema,
//   updateWatermarkSchema,
//   cloneVideoConfigSchema,
//   applyTemplateSchema,
// } from '@validation/videoConfig.schema.js';
// import {
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
// } from './videoConfig.controller.js';
// import { asyncHandler } from '@utils/asyncHandler.js';

// const router = Router();

// router.post('/', validateBody(createVideoConfigSchema), asyncHandler(createVideoConfig));

// router.get('/', asyncHandler(getVideoConfigs));

// router.get('/templates', asyncHandler(getTemplates));

// router.post('/apply-template', validateBody(applyTemplateSchema), asyncHandler(applyTemplate));

// router.get('/:configId', asyncHandler(getVideoConfigById));

// router.patch('/:configId', validateBody(updateVideoConfigSchema), asyncHandler(updateVideoConfig));

// router.delete('/:configId', asyncHandler(deleteVideoConfig));

// router.patch(
//   '/:configId/narration',
//   validateBody(updateNarrationConfigSchema),
//   asyncHandler(updateNarrationConfig)
// );

// router.patch(
//   '/:configId/captions',
//   validateBody(updateCaptionsConfigSchema),
//   asyncHandler(updateCaptionConfig)
// );

// router.post('/:configId/sound-effects', validateBody(addSoundEffectSchema), asyncHandler(addSoundEffect));

// router.patch(
//   '/:configId/sound-effects/:index',
//   validateBody(updateSoundEffectSchema),
//   asyncHandler(updateSoundEffect)
// );

// router.delete('/:configId/sound-effects/:index', asyncHandler(removeSoundEffect));

// router.patch('/:configId/scene-order', validateBody(updateSceneOrderSchema), asyncHandler(updateSceneOrder));

// router.patch(
//   '/:configId/transitions',
//   validateBody(updateTransitionsSchema),
//   asyncHandler(updateTransitions)
// );

// router.patch(
//   '/:configId/output-settings',
//   validateBody(updateOutputSettingsSchema),
//   asyncHandler(updateOutputSettings)
// );

// router.patch(
//   '/:configId/background-audio',
//   validateBody(updateBackgroundAudioSchema),
//   asyncHandler(updateBackgroundAudio)
// );

// // Validate configuration for rendering
// router.post('/:configId/validate', asyncHandler(validateForRendering));

// // ============ Clone Routes ============

// // Clone a video configuration
// router.post('/:configId/clone', validateBody(cloneVideoConfigSchema), asyncHandler(cloneVideoConfig));

// export default router;
