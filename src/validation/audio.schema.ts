import { z } from 'zod';
import {
  MAX_AUDIO_PROMPT_LENGTH,
  MAX_AUDIO_URL_LENGTH,
  audioTypes,
  audioGenerationSources,
  audioFormats,
  MIN_AUDIO_DURATION,
  MAX_AUDIO_DURATION,
  MAX_VOICE_ID_LENGTH,
} from '@constants/audioAssetConsts.js';

// PARAM SCHEMAS

export const audioAssetIdParamSchema = z
  .object({
    audioAssetId: z.string().length(24, 'Invalid audio asset ID'),
  })
  .strict();

export const narrationIdParamSchema = z
  .object({
    narrationId: z.string().length(24, 'Invalid narration ID'),
  })
  .strict();

export const audioAssetAndNarrationParamSchema = z
  .object({
    narrationId: z.string().length(24, 'Invalid narration ID'),
    audioAssetId: z.string().length(24, 'Invalid audio asset ID'),
  })
  .strict();

// BODY SCHEMAS

export const generateAudioAssetSchema = z
  .object({
    voiceId: z
      .string()
      .min(1, 'Voice ID is required')
      .max(MAX_VOICE_ID_LENGTH, `Voice ID cannot exceed ${MAX_VOICE_ID_LENGTH} characters`),
    prompt: z
      .string()
      .max(MAX_AUDIO_PROMPT_LENGTH, `Prompt cannot exceed ${MAX_AUDIO_PROMPT_LENGTH} characters`)
      .trim()
      .optional(),
  })
  .strict();

export const regenerateAudioAssetSchema = z
  .object({
    voiceId: z
      .string()
      .min(1, 'Voice ID is required')
      .max(MAX_VOICE_ID_LENGTH, `Voice ID cannot exceed ${MAX_VOICE_ID_LENGTH} characters`)
      .optional(),
    extraPrompt: z.string().max(500, 'Extra prompt is too long').optional(),
  })
  .strict();

export const uploadAudioAssetSchema = z
  .object({
    type: z.enum(audioTypes, { message: 'Audio type must be "narration", "background", or "effect"' }),
    duration: z
      .number()
      .min(MIN_AUDIO_DURATION, `Duration must be at least ${MIN_AUDIO_DURATION} seconds`)
      .max(MAX_AUDIO_DURATION, `Duration cannot exceed ${MAX_AUDIO_DURATION} seconds`)
      .optional(),
  })
  .strict();

export const updateAudioAssetSchema = z
  .object({
    prompt: z
      .string()
      .max(MAX_AUDIO_PROMPT_LENGTH, `Prompt cannot exceed ${MAX_AUDIO_PROMPT_LENGTH} characters`)
      .trim()
      .optional()
      .nullable(),
    voiceId: z
      .string()
      .max(MAX_VOICE_ID_LENGTH, `Voice ID cannot exceed ${MAX_VOICE_ID_LENGTH} characters`)
      .optional()
      .nullable(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });

export const setActiveAudioAssetSchema = z
  .object({
    audioAssetId: z.string().length(24, 'Invalid audio asset ID'),
  })
  .strict();

export const bulkDeleteAudioAssetsSchema = z
  .object({
    audioAssetIds: z
      .array(z.string().length(24, 'Invalid audio asset ID'))
      .min(1, 'At least one audio asset ID is required')
      .max(50, 'Cannot delete more than 50 audio assets at once'),
  })
  .strict();

export const bulkRestoreAudioAssetsSchema = z
  .object({
    audioAssetIds: z
      .array(z.string().length(24, 'Invalid audio asset ID'))
      .min(1, 'At least one audio asset ID is required')
      .max(50, 'Cannot restore more than 50 audio assets at once'),
  })
  .strict();

// Type exports
export type AudioAssetIdParam = z.infer<typeof audioAssetIdParamSchema>;
export type NarrationIdParam = z.infer<typeof narrationIdParamSchema>;
export type AudioAssetAndNarrationParam = z.infer<typeof audioAssetAndNarrationParamSchema>;
export type GenerateAudioAssetInput = z.infer<typeof generateAudioAssetSchema>;
export type RegenerateAudioAssetInput = z.infer<typeof regenerateAudioAssetSchema>;
export type UploadAudioAssetInput = z.infer<typeof uploadAudioAssetSchema>;
export type UpdateAudioAssetInput = z.infer<typeof updateAudioAssetSchema>;
export type SetActiveAudioAssetInput = z.infer<typeof setActiveAudioAssetSchema>;
export type BulkDeleteAudioAssetsInput = z.infer<typeof bulkDeleteAudioAssetsSchema>;
export type BulkRestoreAudioAssetsInput = z.infer<typeof bulkRestoreAudioAssetsSchema>;
