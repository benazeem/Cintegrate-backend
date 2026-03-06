// Audio Asset validation constants
export const MAX_AUDIO_PROMPT_LENGTH = 2000;
export const MAX_AUDIO_URL_LENGTH = 2048;
export const MAX_AUDIO_ASSETS_PER_NARRATION = 50;

// Audio types
export const audioTypes = ['narration', 'background', 'effect'] as const;
export type AudioType = (typeof audioTypes)[number];

// Generation sources
export const audioGenerationSources = ['ai', 'user'] as const;
export type AudioGenerationSource = (typeof audioGenerationSources)[number];

// Supported audio formats
export const audioFormats = ['mp3', 'wav', 'ogg', 'aac', 'm4a', 'flac', 'wma', 'opus'] as const;
export type AudioFormat = (typeof audioFormats)[number];

// Duration constraints
export const MIN_AUDIO_DURATION = 0.1;
export const MAX_AUDIO_DURATION = 7200; // 2 hours max

// File size constraints (in bytes)
export const MAX_AUDIO_FILE_SIZE = 100 * 1024 * 1024; // 100MB

// Voice ID constraints
export const MAX_VOICE_ID_LENGTH = 100;

// Version constraints
export const AUDIO_VERSION_GAP = 1;
export const MIN_AUDIO_VERSION = 1;
