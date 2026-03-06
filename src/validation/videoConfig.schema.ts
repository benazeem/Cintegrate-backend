import { z } from 'zod';
import {
  MIN_VOLUME,
  MAX_VOLUME,
  MIN_FADE_DURATION,
  MAX_FADE_DURATION,
  MIN_SOUND_EFFECT_USE_PERCENTAGE,
  MAX_SOUND_EFFECT_USE_PERCENTAGE,
  MAX_SOUND_EFFECTS_PER_CONFIG,
  MIN_CAPTION_FONT_SIZE,
  MAX_CAPTION_FONT_SIZE,
  MAX_CAPTION_OFFSET,
  MIN_TRANSITION_DURATION,
  MAX_TRANSITION_DURATION,
  MAX_NARRATION_START_OFFSET,
  MAX_NARRATION_END_OFFSET,
  MIN_WATERMARK_OPACITY,
  MAX_WATERMARK_OPACITY,
  MIN_WATERMARK_SIZE,
  MAX_WATERMARK_SIZE,
  MAX_WATERMARK_TEXT_LENGTH,
} from '../constants/videoConfigConsts.js';

const objectIdSchema = z.string().regex(/^[a-fA-F0-9]{24}$/);

const volumeSchema = z.number().min(MIN_VOLUME).max(MAX_VOLUME);

const fadeDurationSchema = z.number().min(MIN_FADE_DURATION).max(MAX_FADE_DURATION);

const verticalPositionSchema = z.enum(['top', 'middle', 'bottom']);

const horizontalPositionSchema = z.enum(['left', 'center', 'right']);

const easingSchema = z.enum(['linear', 'ease-in', 'ease-out', 'ease-in-out', 'bounce']);

const narrationConfigSchema = z.object({
  narrationId: objectIdSchema,
  audioAssetId: objectIdSchema.optional(),
  volume: volumeSchema.default(100),
  startOffset: z.number().min(0).max(MAX_NARRATION_START_OFFSET).default(0),
  endOffset: z.number().min(0).max(MAX_NARRATION_END_OFFSET).default(0),
  fadeInDuration: fadeDurationSchema.default(0),
  fadeOutDuration: fadeDurationSchema.default(0),
  enabled: z.boolean().default(true),
});

const captionStyleSchema = z.object({
  fontSize: z.number().min(MIN_CAPTION_FONT_SIZE).max(MAX_CAPTION_FONT_SIZE).default(24),
  fontFamily: z.string().max(100).default('Arial'),
  fontColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .default('#FFFFFF'),
  fontWeight: z.enum(['normal', 'bold', 'light']).default('bold'),
  backgroundColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .default('#000000'),
  backgroundOpacity: volumeSchema.default(50),
  textShadow: z.boolean().default(true),
  textOutline: z.boolean().default(false),
  outlineColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .default('#000000'),
  outlineWidth: z.number().min(0).max(10).default(2),
});

const captionAnimationSchema = z.object({
  type: z.enum(['none', 'fade', 'slide', 'typewriter', 'bounce']).default('fade'),
  duration: z.number().min(0).max(5).default(0.3),
});

const captionConfigSchema = z.object({
  enabled: z.boolean().default(true),
  position: z.object({
    vertical: verticalPositionSchema.default('bottom'),
    horizontal: horizontalPositionSchema.default('center'),
  }),
  offset: z.object({
    x: z.number().min(-MAX_CAPTION_OFFSET).max(MAX_CAPTION_OFFSET).default(0),
    y: z.number().min(-MAX_CAPTION_OFFSET).max(MAX_CAPTION_OFFSET).default(0),
  }),
  style: captionStyleSchema,
  animation: captionAnimationSchema,
});

const soundEffectConfigSchema = z.object({
  audioAssetId: objectIdSchema,
  name: z.string().trim().max(200),
  startTime: z.number().min(0),
  duration: z.number().min(0).optional(),
  volume: volumeSchema.default(100),
  trimStart: z.number().min(0).default(0),
  usePercentage: z
    .number()
    .min(MIN_SOUND_EFFECT_USE_PERCENTAGE)
    .max(MAX_SOUND_EFFECT_USE_PERCENTAGE)
    .default(100),
  loop: z.boolean().default(false),
  loopCount: z.number().min(1).optional(),
  fadeInDuration: fadeDurationSchema.default(0),
  fadeOutDuration: fadeDurationSchema.default(0),
  enabled: z.boolean().default(true),
});

const transitionConfigSchema = z.object({
  fromSceneIndex: z.number().min(0),
  toSceneIndex: z.number().min(0),
  type: z
    .enum([
      'none',
      'fade',
      'dissolve',
      'wipe_left',
      'wipe_right',
      'wipe_up',
      'wipe_down',
      'slide_left',
      'slide_right',
      'zoom_in',
      'zoom_out',
      'blur',
    ])
    .default('fade'),
  duration: z.number().min(MIN_TRANSITION_DURATION).max(MAX_TRANSITION_DURATION).default(0.5),
  easing: easingSchema.default('ease-in-out'),
});

const sceneTimingConfigSchema = z.object({
  sceneId: objectIdSchema,
  order: z.number().min(0),
  startTime: z.number().min(0),
  duration: z.number().min(0),
  customDuration: z.number().min(0).optional(),
});

const resolutionSchema = z.object({
  width: z.number().min(320).max(7680).default(1920),
  height: z.number().min(240).max(4320).default(1080),
  preset: z.enum(['720p', '1080p', '1440p', '4k', 'custom']).default('1080p'),
});

const outputSettingsSchema = z.object({
  resolution: resolutionSchema,
  aspectRatio: z.enum(['16:9', '9:16', '1:1', '4:3', '21:9', 'custom']).default('16:9'),
  frameRate: z
    .enum({
      '24': 24,
      '30': 30,
      '60': 60,
    })
    .default(30),
  quality: z.enum(['low', 'medium', 'high', 'ultra']).default('high'),
  format: z.enum(['mp4', 'webm', 'mov']).default('mp4'),
  bitrate: z.number().min(500).max(100000).optional(),
});

const backgroundAudioConfigSchema = z.object({
  audioAssetId: objectIdSchema.optional(),
  volume: volumeSchema.default(30),
  fadeInDuration: fadeDurationSchema.default(2),
  fadeOutDuration: fadeDurationSchema.default(2),
  loop: z.boolean().default(true),
  enabled: z.boolean().default(false),
});

const watermarkConfigSchema = z.object({
  enabled: z.boolean().default(false),
  imageUrl: z.string().url().max(2000).optional(),
  text: z.string().max(MAX_WATERMARK_TEXT_LENGTH).optional(),
  position: z.object({
    vertical: verticalPositionSchema.default('bottom'),
    horizontal: horizontalPositionSchema.default('right'),
  }),
  offset: z.object({
    x: z.number().default(10),
    y: z.number().default(10),
  }),
  opacity: z.number().min(MIN_WATERMARK_OPACITY).max(MAX_WATERMARK_OPACITY).default(70),
  size: z.number().min(MIN_WATERMARK_SIZE).max(MAX_WATERMARK_SIZE).default(10),
});

export const createVideoConfigSchema = z.object({
  storyId: objectIdSchema,
  projectId: objectIdSchema,
  name: z.string().trim().min(1).max(200),
  description: z.string().trim().max(1000).optional(),
  soundEffects: z.array(soundEffectConfigSchema).max(MAX_SOUND_EFFECTS_PER_CONFIG).optional(),
  transitions: z.array(transitionConfigSchema).optional(),
  backgroundAudio: backgroundAudioConfigSchema.optional(),
  outputSettings: outputSettingsSchema.optional(),
  isTemplate: z.boolean().default(false),
  templateName: z.string().trim().max(100).optional(),
});

export const updateVideoConfigSchema = z
  .object({
    name: z.string().trim().min(1).max(200).optional(),
    description: z.string().trim().max(1000).optional(),
    sceneOrder: z.array(objectIdSchema).min(1).optional(),
    sceneTiming: z.array(sceneTimingConfigSchema).optional(),
    narration: narrationConfigSchema.optional(),
    captions: captionConfigSchema.optional(),
    soundEffects: z.array(soundEffectConfigSchema).max(MAX_SOUND_EFFECTS_PER_CONFIG).optional(),
    transitions: z.array(transitionConfigSchema).optional(),
    backgroundAudio: backgroundAudioConfigSchema.optional(),
    watermark: watermarkConfigSchema.optional(),
    outputSettings: outputSettingsSchema.optional(),
    isTemplate: z.boolean().optional(),
    templateName: z.string().trim().max(100).optional(),
  })
  .strict();

export const updateNarrationConfigSchema = narrationConfigSchema;
export const updateCaptionsConfigSchema = captionConfigSchema;
export const addSoundEffectSchema = soundEffectConfigSchema;

export const updateSoundEffectSchema = z.object({
  index: z.number().min(0),
  soundEffect: soundEffectConfigSchema,
});

export const updateSceneOrderSchema = z.object({
  sceneOrder: z.array(objectIdSchema).min(1),
  sceneTiming: z.array(sceneTimingConfigSchema).optional(),
});

export const updateTransitionsSchema = z.object({
  transitions: z.array(transitionConfigSchema),
});

export const updateOutputSettingsSchema = outputSettingsSchema;
export const updateBackgroundAudioSchema = backgroundAudioConfigSchema;
export const updateWatermarkSchema = watermarkConfigSchema;

export const getVideoConfigsQuerySchema = z.object({
  storyId: objectIdSchema.optional(),
  projectId: objectIdSchema.optional(),
  isTemplate: z.boolean().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.enum(['createdAt', 'updatedAt', 'name', 'totalDuration']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const validateForRenderingSchema = z.object({
  configId: objectIdSchema,
});

export const cloneVideoConfigSchema = z.object({
  name: z.string().trim().min(1).max(200),
  description: z.string().trim().max(1000).optional(),
});

export const applyTemplateSchema = z.object({
  templateId: objectIdSchema,
  storyId: objectIdSchema,
  projectId: objectIdSchema,
  name: z.string().trim().min(1).max(200),
});

export type CreateVideoConfigType = z.infer<typeof createVideoConfigSchema>;
