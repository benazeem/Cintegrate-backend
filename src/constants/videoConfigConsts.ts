export const MIN_VIDEO_DURATION = 1;
export const MAX_VIDEO_DURATION = 60 * 60 * 1000;
export const DEFAULT_SCENE_DURATION = 5;

export const MAX_NARRATION_START_OFFSET = 60;
export const MAX_NARRATION_END_OFFSET = 60;

export const MIN_VOLUME = 0;
export const MAX_VOLUME = 100;
export const DEFAULT_NARRATION_VOLUME = 100;
export const DEFAULT_SOUND_EFFECT_VOLUME = 70;
export const DEFAULT_BACKGROUND_AUDIO_VOLUME = 30;

export const MIN_SOUND_EFFECT_USE_PERCENTAGE = 1;
export const MAX_SOUND_EFFECT_USE_PERCENTAGE = 100;
export const DEFAULT_SOUND_EFFECT_USE_PERCENTAGE = 90;
export const MAX_SOUND_EFFECTS_PER_CONFIG = 50;

export const MAX_VIDEO_EFFECTS_PER_CONFIG = 100;
export const MIN_EFFECT_INTENSITY = 0;
export const MAX_EFFECT_INTENSITY = 100;
export const DEFAULT_EFFECT_INTENSITY = 50;

export const MIN_FADE_DURATION = 0;
export const MAX_FADE_DURATION = 10;
export const DEFAULT_FADE_IN_DURATION = 0.5;
export const DEFAULT_FADE_OUT_DURATION = 0.5;

export const MIN_TRANSITION_DURATION = 0;
export const MAX_TRANSITION_DURATION = 5;
export const DEFAULT_TRANSITION_DURATION = 0.5;

export const MIN_CAPTION_FONT_SIZE = 8;
export const MAX_CAPTION_FONT_SIZE = 120;
export const DEFAULT_CAPTION_FONT_SIZE = 24;
export const MAX_CAPTION_OFFSET = 500;

export const RESOLUTION_PRESETS = {
  '480p': { width: 854, height: 480 },
  '720p': { width: 1280, height: 720 },
  '1080p': { width: 1920, height: 1080 },
  '1440p': { width: 2560, height: 1440 },
  '4k': { width: 3840, height: 2160 },
} as const;

export const ASPECT_RATIO_VALUES = {
  '16:9': 16 / 9,
  '9:16': 9 / 16,
  '1:1': 1,
  '4:3': 4 / 3,
  '21:9': 21 / 9,
} as const;

export const SUPPORTED_FRAME_RATES = [24, 30, 60] as const;
export const SUPPORTED_FORMATS = ['mp4', 'webm', 'mov'] as const;
export const SUPPORTED_QUALITY_LEVELS = ['low', 'medium', 'high', 'ultra'] as const;

export const QUALITY_BITRATE_MAP = {
  low: 2500,
  medium: 5000,
  high: 10000,
  ultra: 20000,
} as const;

export const VIDEO_EFFECT_TYPES = [
  'blur',
  'zoom',
  'pan',
  'fade',
  'overlay',
  'color_filter',
  'vignette',
  'shake',
  'glitch',
  'slow_motion',
  'speed_up',
  'ken_burns',
  'picture_in_picture',
  'split_screen',
  'custom',
] as const;

export const TRANSITION_TYPES = [
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
] as const;

export const VERTICAL_POSITIONS = ['top', 'middle', 'bottom'] as const;
export const HORIZONTAL_POSITIONS = ['left', 'center', 'right'] as const;

export const CAPTION_ANIMATION_TYPES = ['none', 'fade', 'slide', 'typewriter', 'bounce'] as const;

export const EASING_FUNCTIONS = ['linear', 'ease-in', 'ease-out', 'ease-in-out', 'bounce'] as const;

export const FONT_WEIGHTS = ['normal', 'bold', 'light'] as const;

export const DEFAULT_FONTS = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia',
  'Verdana',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
] as const;

export const MIN_WATERMARK_OPACITY = 0;
export const MAX_WATERMARK_OPACITY = 100;
export const DEFAULT_WATERMARK_OPACITY = 70;
export const MIN_WATERMARK_SIZE = 1;
export const MAX_WATERMARK_SIZE = 100;
export const DEFAULT_WATERMARK_SIZE = 10;
export const MAX_WATERMARK_TEXT_LENGTH = 100;

export const ANCHOR_POINTS = [
  'top-left',
  'top-center',
  'top-right',
  'center-left',
  'center',
  'center-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const;

export const VIDEO_CONFIG_ERROR_MESSAGES = {
  NOT_FOUND: 'Video configuration not found',
  UNAUTHORIZED: 'You are not authorized to access this video configuration',
  INVALID_STORY: 'Invalid story reference',
  INVALID_PROJECT: 'Invalid project reference',
  INVALID_NARRATION: 'Invalid narration reference',
  INVALID_SCENE_ORDER: 'Invalid scene order configuration',
  INVALID_TIMING: 'Invalid timing configuration',
  INVALID_SOUND_EFFECT: 'Invalid sound effect configuration',
  INVALID_VIDEO_EFFECT: 'Invalid video effect configuration',
  DURATION_EXCEEDED: 'Video duration exceeds maximum allowed',
  TOO_MANY_SOUND_EFFECTS: `Maximum ${MAX_SOUND_EFFECTS_PER_CONFIG} sound effects allowed`,
  TOO_MANY_VIDEO_EFFECTS: `Maximum ${MAX_VIDEO_EFFECTS_PER_CONFIG} video effects allowed`,
  NOT_READY: 'Video configuration is not ready for rendering',
} as const;
