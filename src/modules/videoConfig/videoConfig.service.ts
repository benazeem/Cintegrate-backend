// import { Types, FilterQuery, SortOrder } from 'mongoose';
// import VideoConfig, {
//   IVideoConfig,
//   ISoundEffectConfig,
//   ISceneTimingConfig,
//   ITransitionConfig,
//   INarrationConfig,
//   ICaptionConfig,
//   IOutputSettings,
//   IBackgroundAudioConfig,
//   IWatermarkConfig,
// } from '@models/VideoConfig.js';
// import { AppError } from '../../middleware/error/appError';
// import { VIDEO_CONFIG_ERROR_MESSAGES, MAX_SOUND_EFFECTS_PER_CONFIG } from '../../constants/videoConfigConsts';
// import { validateVideoConfigOwnership } from '../../validators/validateVideoConfigOwnership';

// // ============ Types ============

// interface CreateVideoConfigInput {
//   userId: Types.ObjectId;
//   storyId: Types.ObjectId;
//   projectId: Types.ObjectId;
//   name: string;
//   description?: string;
//   sceneOrder: Types.ObjectId[];
//   sceneTiming?: ISceneTimingConfig[];
//   narration: INarrationConfig;
//   captions?: ICaptionConfig;
//   soundEffects?: ISoundEffectConfig[];
//   transitions?: ITransitionConfig[];
//   backgroundAudio?: IBackgroundAudioConfig;
//   watermark?: IWatermarkConfig;
//   outputSettings?: IOutputSettings;
//   isTemplate?: boolean;
//   templateName?: string;
// }

// interface UpdateVideoConfigInput {
//   name?: string;
//   description?: string;
//   sceneOrder?: Types.ObjectId[];
//   sceneTiming?: ISceneTimingConfig[];
//   narration?: INarrationConfig;
//   captions?: ICaptionConfig;
//   soundEffects?: ISoundEffectConfig[];
//   transitions?: ITransitionConfig[];
//   backgroundAudio?: IBackgroundAudioConfig;
//   watermark?: IWatermarkConfig;
//   outputSettings?: IOutputSettings;
//   isTemplate?: boolean;
//   templateName?: string;
// }

// interface GetVideoConfigsQuery {
//   userId: Types.ObjectId;
//   storyId?: Types.ObjectId;
//   projectId?: Types.ObjectId;
//   isTemplate?: boolean;
//   page?: number;
//   limit?: number;
//   sortBy?: string;
//   sortOrder?: 'asc' | 'desc';
// }

// interface PaginatedResult<T> {
//   data: T[];
//   pagination: {
//     total: number;
//     page: number;
//     limit: number;
//     totalPages: number;
//     hasNextPage: boolean;
//     hasPrevPage: boolean;
//   };
// }

// // ============ Service Functions ============

// /**
//  * Create a new video configuration
//  */
// export async function createVideoConfig(input: CreateVideoConfigInput): Promise<IVideoConfig> {
//   const {
//     userId,
//     storyId,
//     projectId,
//     name,
//     description,
//     sceneOrder,
//     sceneTiming,
//     narration,
//     captions,
//     soundEffects,
//     transitions,
//     backgroundAudio,
//     watermark,
//     outputSettings,
//     isTemplate,
//     templateName,
//   } = input;

//   // Validate sound effects count
//   if (soundEffects && soundEffects.length > MAX_SOUND_EFFECTS_PER_CONFIG) {
//     throw new AppError(VIDEO_CONFIG_ERROR_MESSAGES.TOO_MANY_SOUND_EFFECTS, 400);
//   }

//   // Generate scene timing if not provided
//   let finalSceneTiming = sceneTiming;
//   if (!finalSceneTiming || finalSceneTiming.length === 0) {
//     finalSceneTiming = sceneOrder.map((sceneId, index) => ({
//       sceneId,
//       order: index,
//       startTime: index * 5, // Default 5 seconds per scene
//       duration: 5,
//     }));
//   }

//   // Calculate total duration from scene timing
//   const totalDuration = calculateTotalDuration(finalSceneTiming);

//   const videoConfig = new VideoConfig({
//     userId,
//     storyId,
//     projectId,
//     name,
//     description,
//     sceneOrder,
//     sceneTiming: finalSceneTiming,
//     totalDuration,
//     narration,
//     captions: captions || {},
//     soundEffects: soundEffects || [],
//     videoEffects: [], // Video effects are stored but not used yet
//     transitions: transitions || generateDefaultTransitions(sceneOrder.length),
//     backgroundAudio: backgroundAudio || {},
//     watermark: watermark || {},
//     outputSettings: outputSettings || {},
//     isTemplate: isTemplate || false,
//     templateName,
//   });

//   await videoConfig.save();
//   return videoConfig;
// }

// /**
//  * Get a video configuration by ID
//  */
// export async function getVideoConfigById(
//   configId: Types.ObjectId | string,
//   userId: Types.ObjectId | string,
//   populate?: string[]
// ): Promise<IVideoConfig> {
//   const { videoConfig } = await validateVideoConfigOwnership(configId, userId, {
//     populate,
//   });
//   return videoConfig;
// }

// /**
//  * Get all video configurations for a user with pagination
//  */
// export async function getVideoConfigs(query: GetVideoConfigsQuery): Promise<PaginatedResult<IVideoConfig>> {
//   const {
//     userId,
//     storyId,
//     projectId,
//     isTemplate,
//     page = 1,
//     limit = 20,
//     sortBy = 'createdAt',
//     sortOrder = 'desc',
//   } = query;

//   // Build filter
//   const filter: FilterQuery<IVideoConfig> = { userId };

//   if (storyId) filter.storyId = storyId;
//   if (projectId) filter.projectId = projectId;
//   if (isTemplate !== undefined) filter.isTemplate = isTemplate;

//   // Build sort
//   const sort: Record<string, SortOrder> = {
//     [sortBy]: sortOrder === 'asc' ? 1 : -1,
//   };

//   // Calculate skip
//   const skip = (page - 1) * limit;

//   // Execute query
//   const [data, total] = await Promise.all([
//     VideoConfig.find(filter).sort(sort).skip(skip).limit(limit).lean(),
//     VideoConfig.countDocuments(filter),
//   ]);

//   const totalPages = Math.ceil(total / limit);

//   return {
//     data: data as IVideoConfig[],
//     pagination: {
//       total,
//       page,
//       limit,
//       totalPages,
//       hasNextPage: page < totalPages,
//       hasPrevPage: page > 1,
//     },
//   };
// }

// /**
//  * Update a video configuration
//  */
// export async function updateVideoConfig(
//   configId: Types.ObjectId | string,
//   userId: Types.ObjectId | string,
//   updates: UpdateVideoConfigInput
// ): Promise<IVideoConfig> {
//   const { videoConfig } = await validateVideoConfigOwnership(configId, userId);

//   // Validate sound effects count if provided
//   if (updates.soundEffects && updates.soundEffects.length > MAX_SOUND_EFFECTS_PER_CONFIG) {
//     throw new AppError(VIDEO_CONFIG_ERROR_MESSAGES.TOO_MANY_SOUND_EFFECTS, 400);
//   }

//   // Apply updates
//   Object.assign(videoConfig, updates);

//   // Recalculate total duration if scene timing changed
//   if (updates.sceneTiming) {
//     videoConfig.totalDuration = calculateTotalDuration(updates.sceneTiming);
//   }

//   await videoConfig.save();
//   return videoConfig;
// }

// /**
//  * Delete a video configuration
//  */
// export async function deleteVideoConfig(
//   configId: Types.ObjectId | string,
//   userId: Types.ObjectId | string
// ): Promise<void> {
//   await validateVideoConfigOwnership(configId, userId);
//   await VideoConfig.findByIdAndDelete(configId);
// }

// /**
//  * Update narration configuration
//  */
// export async function updateNarrationConfig(
//   configId: Types.ObjectId | string,
//   userId: Types.ObjectId | string,
//   narrationConfig: INarrationConfig
// ): Promise<IVideoConfig> {
//   const { videoConfig } = await validateVideoConfigOwnership(configId, userId);

//   videoConfig.narration = narrationConfig;

//   await videoConfig.save();
//   return videoConfig;
// }

// /**
//  * Update caption configuration
//  */
// export async function updateCaptionConfig(
//   configId: Types.ObjectId | string,
//   userId: Types.ObjectId | string,
//   captionConfig: ICaptionConfig
// ): Promise<IVideoConfig> {
//   const { videoConfig } = await validateVideoConfigOwnership(configId, userId);

//   videoConfig.captions = captionConfig;

//   await videoConfig.save();
//   return videoConfig;
// }

// /**
//  * Add a sound effect to a video configuration
//  */
// export async function addSoundEffect(
//   configId: Types.ObjectId | string,
//   userId: Types.ObjectId | string,
//   soundEffect: ISoundEffectConfig
// ): Promise<IVideoConfig> {
//   const { videoConfig } = await validateVideoConfigOwnership(configId, userId);

//   // Check max sound effects
//   if (videoConfig.soundEffects.length >= MAX_SOUND_EFFECTS_PER_CONFIG) {
//     throw new AppError(VIDEO_CONFIG_ERROR_MESSAGES.TOO_MANY_SOUND_EFFECTS, 400);
//   }

//   // Validate start time is within video duration
//   if (soundEffect.startTime > videoConfig.totalDuration) {
//     throw new AppError(
//       `Sound effect start time (${soundEffect.startTime}s) exceeds video duration (${videoConfig.totalDuration}s)`,
//       400
//     );
//   }

//   videoConfig.soundEffects.push(soundEffect);
//   await videoConfig.save();
//   return videoConfig;
// }

// /**
//  * Update a sound effect in a video configuration
//  */
// export async function updateSoundEffect(
//   configId: Types.ObjectId | string,
//   userId: Types.ObjectId | string,
//   index: number,
//   soundEffect: ISoundEffectConfig
// ): Promise<IVideoConfig> {
//   const { videoConfig } = await validateVideoConfigOwnership(configId, userId);

//   if (index < 0 || index >= videoConfig.soundEffects.length) {
//     throw new AppError('Sound effect index out of range', 400);
//   }

//   videoConfig.soundEffects[index] = soundEffect;
//   await videoConfig.save();
//   return videoConfig;
// }

// /**
//  * Remove a sound effect from a video configuration
//  */
// export async function removeSoundEffect(
//   configId: Types.ObjectId | string,
//   userId: Types.ObjectId | string,
//   index: number
// ): Promise<IVideoConfig> {
//   const { videoConfig } = await validateVideoConfigOwnership(configId, userId);

//   if (index < 0 || index >= videoConfig.soundEffects.length) {
//     throw new AppError('Sound effect index out of range', 400);
//   }

//   videoConfig.soundEffects.splice(index, 1);
//   await videoConfig.save();
//   return videoConfig;
// }

// /**
//  * Update scene order and timing
//  */
// export async function updateSceneOrder(
//   configId: Types.ObjectId | string,
//   userId: Types.ObjectId | string,
//   sceneOrder: Types.ObjectId[],
//   sceneTiming?: ISceneTimingConfig[]
// ): Promise<IVideoConfig> {
//   const { videoConfig } = await validateVideoConfigOwnership(configId, userId);

//   videoConfig.sceneOrder = sceneOrder;

//   if (sceneTiming) {
//     videoConfig.sceneTiming = sceneTiming;
//     videoConfig.totalDuration = calculateTotalDuration(sceneTiming);
//   } else {
//     // Generate new timing based on new order
//     videoConfig.sceneTiming = sceneOrder.map((sceneId, index) => ({
//       sceneId,
//       order: index,
//       startTime: index * 5,
//       duration: 5,
//     }));
//     videoConfig.totalDuration = calculateTotalDuration(videoConfig.sceneTiming);
//   }

//   await videoConfig.save();
//   return videoConfig;
// }

// /**
//  * Update transitions
//  */
// export async function updateTransitions(
//   configId: Types.ObjectId | string,
//   userId: Types.ObjectId | string,
//   transitions: ITransitionConfig[]
// ): Promise<IVideoConfig> {
//   const { videoConfig } = await validateVideoConfigOwnership(configId, userId);

//   videoConfig.transitions = transitions;
//   await videoConfig.save();
//   return videoConfig;
// }

// /**
//  * Update output settings
//  */
// export async function updateOutputSettings(
//   configId: Types.ObjectId | string,
//   userId: Types.ObjectId | string,
//   outputSettings: IOutputSettings
// ): Promise<IVideoConfig> {
//   const { videoConfig } = await validateVideoConfigOwnership(configId, userId);

//   videoConfig.outputSettings = outputSettings;
//   await videoConfig.save();
//   return videoConfig;
// }

// /**
//  * Update background audio
//  */
// export async function updateBackgroundAudio(
//   configId: Types.ObjectId | string,
//   userId: Types.ObjectId | string,
//   backgroundAudio: IBackgroundAudioConfig
// ): Promise<IVideoConfig> {
//   const { videoConfig } = await validateVideoConfigOwnership(configId, userId);

//   videoConfig.backgroundAudio = backgroundAudio;
//   await videoConfig.save();
//   return videoConfig;
// }

// /**
//  * Update watermark settings
//  */
// export async function updateWatermark(
//   configId: Types.ObjectId | string,
//   userId: Types.ObjectId | string,
//   watermark: IWatermarkConfig
// ): Promise<IVideoConfig> {
//   const { videoConfig } = await validateVideoConfigOwnership(configId, userId);

//   videoConfig.watermark = watermark;
//   await videoConfig.save();
//   return videoConfig;
// }

// /**
//  * Validate a video configuration for rendering
//  */
// export async function validateForRendering(
//   configId: Types.ObjectId | string,
//   userId: Types.ObjectId | string
// ): Promise<{ isValid: boolean; errors: string[] }> {
//   const { videoConfig } = await validateVideoConfigOwnership(configId, userId, {
//     populate: ['sceneOrder'],
//   });

//   const errors: string[] = [];

//   // Check scene order
//   if (!videoConfig.sceneOrder || videoConfig.sceneOrder.length === 0) {
//     errors.push('At least one scene is required');
//   }

//   // Check narration
//   if (!videoConfig.narration?.narrationId) {
//     errors.push('Narration is required');
//   }

//   // Check total duration
//   if (videoConfig.totalDuration <= 0) {
//     errors.push('Total duration must be greater than 0');
//   }

//   // Check sound effects timing
//   for (let i = 0; i < videoConfig.soundEffects.length; i++) {
//     const effect = videoConfig.soundEffects[i];
//     if (effect.enabled && effect.startTime > videoConfig.totalDuration) {
//       errors.push(`Sound effect "${effect.name}" starts after video ends`);
//     }
//   }

//   // Check narration timing
//   const narration = videoConfig.narration;
//   if (narration.enabled) {
//     const effectiveStart = narration.startOffset;
//     const effectiveEnd = videoConfig.totalDuration - narration.endOffset;

//     if (effectiveStart >= effectiveEnd) {
//       errors.push('Narration start offset and end offset overlap');
//     }
//   }

//   const isValid = errors.length === 0;

//   return { isValid, errors };
// }

// /**
//  * Clone a video configuration
//  */
// export async function cloneVideoConfig(
//   configId: Types.ObjectId | string,
//   userId: Types.ObjectId | string,
//   newName: string,
//   newDescription?: string
// ): Promise<IVideoConfig> {
//   const { videoConfig } = await validateVideoConfigOwnership(configId, userId);

//   const clonedConfig = new VideoConfig({
//     userId: videoConfig.userId,
//     storyId: videoConfig.storyId,
//     projectId: videoConfig.projectId,
//     name: newName,
//     description: newDescription || videoConfig.description,
//     sceneOrder: [...videoConfig.sceneOrder],
//     sceneTiming: videoConfig.sceneTiming.map((t) => ({ ...t })),
//     totalDuration: videoConfig.totalDuration,
//     narration: { ...videoConfig.narration },
//     captions: { ...videoConfig.captions },
//     soundEffects: videoConfig.soundEffects.map((s) => ({ ...s })),
//     videoEffects: videoConfig.videoEffects.map((v) => ({ ...v })),
//     transitions: videoConfig.transitions.map((t) => ({ ...t })),
//     backgroundAudio: { ...videoConfig.backgroundAudio },
//     watermark: { ...videoConfig.watermark },
//     outputSettings: { ...videoConfig.outputSettings },
//     isTemplate: false,
//     version: 1,
//   });

//   await clonedConfig.save();
//   return clonedConfig;
// }

// /**
//  * Get templates for a user
//  */
// export async function getTemplates(
//   userId: Types.ObjectId | string,
//   page = 1,
//   limit = 20
// ): Promise<PaginatedResult<IVideoConfig>> {
//   return getVideoConfigs({
//     userId: new Types.ObjectId(userId),
//     isTemplate: true,
//     page,
//     limit,
//   });
// }

// /**
//  * Apply a template to create a new video configuration
//  */
// export async function applyTemplate(
//   templateId: Types.ObjectId | string,
//   userId: Types.ObjectId | string,
//   storyId: Types.ObjectId | string,
//   projectId: Types.ObjectId | string,
//   name: string
// ): Promise<IVideoConfig> {
//   const { videoConfig: template } = await validateVideoConfigOwnership(templateId, userId);

//   if (!template.isTemplate) {
//     throw new AppError('The specified configuration is not a template', 400);
//   }

//   const newConfig = new VideoConfig({
//     userId: new Types.ObjectId(userId),
//     storyId: new Types.ObjectId(storyId),
//     projectId: new Types.ObjectId(projectId),
//     name,
//     description: template.description,
//     sceneOrder: [], // Will be populated separately
//     sceneTiming: [],
//     totalDuration: 0,
//     narration: { ...template.narration, narrationId: undefined, audioAssetId: undefined },
//     captions: { ...template.captions },
//     soundEffects: [], // Sound effects need to be re-added
//     videoEffects: template.videoEffects.map((v) => ({ ...v })),
//     transitions: template.transitions.map((t) => ({ ...t })),
//     backgroundAudio: { ...template.backgroundAudio, audioAssetId: undefined },
//     watermark: { ...template.watermark },
//     outputSettings: { ...template.outputSettings },
//     isTemplate: false,
//     version: 1,
//   });

//   await newConfig.save();
//   return newConfig;
// }

// // ============ Helper Functions ============

// /**
//  * Calculate total duration from scene timing
//  */
// function calculateTotalDuration(sceneTiming: ISceneTimingConfig[]): number {
//   if (!sceneTiming || sceneTiming.length === 0) {
//     return 0;
//   }

//   return sceneTiming.reduce((maxEnd, scene) => {
//     const sceneEnd = scene.startTime + (scene.customDuration || scene.duration);
//     return Math.max(maxEnd, sceneEnd);
//   }, 0);
// }

// /**
//  * Generate default transitions between scenes
//  */
// function generateDefaultTransitions(sceneCount: number): ITransitionConfig[] {
//   const transitions: ITransitionConfig[] = [];

//   for (let i = 0; i < sceneCount - 1; i++) {
//     transitions.push({
//       fromSceneIndex: i,
//       toSceneIndex: i + 1,
//       type: 'fade',
//       duration: 0.5,
//       easing: 'ease-in-out',
//     });
//   }

//   return transitions;
// }

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
