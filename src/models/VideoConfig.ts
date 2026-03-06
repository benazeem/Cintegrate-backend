import mongoose, { Document, Schema, Types } from 'mongoose';

// ============ Sub-document Interfaces ============

export interface INarrationConfig {
  narrationId: Types.ObjectId;
  audioAssetId?: Types.ObjectId;
  volume: number;
  startOffset: number;
  endOffset: number;
  fadeInDuration: number;
  fadeOutDuration: number;
  enabled: boolean;
}

export interface ICaptionConfig {
  enabled: boolean;
  position: {
    vertical: 'top' | 'middle' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  offset: {
    x: number;
    y: number;
  };
  style: {
    fontSize: number;
    fontFamily: string;
    fontColor: string;
    fontWeight: 'normal' | 'bold' | 'light';
    backgroundColor: string;
    backgroundOpacity: number;
    textShadow: boolean;
    textOutline: boolean;
    outlineColor: string;
    outlineWidth: number;
  };
  animation: {
    type: 'none' | 'fade' | 'slide' | 'typewriter' | 'bounce';
    duration: number;
  };
}

export interface ISoundEffectConfig {
  audioAssetId: Types.ObjectId;
  name: string;
  startTime: number;
  duration?: number;
  volume: number;
  trimStart: number;
  usePercentage: number;
  loop: boolean;
  loopCount?: number;
  fadeInDuration: number;
  fadeOutDuration: number;
  enabled: boolean;
}

export interface IVideoEffectConfig {
  effectId: string;
  effectType:
    | 'blur'
    | 'zoom'
    | 'pan'
    | 'fade'
    | 'overlay'
    | 'color_filter'
    | 'vignette'
    | 'shake'
    | 'glitch'
    | 'slow_motion'
    | 'speed_up'
    | 'ken_burns'
    | 'picture_in_picture'
    | 'split_screen'
    | 'custom';
  name: string;
  startTime: number;
  duration: number;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
    anchorPoint:
      | 'top-left'
      | 'top-center'
      | 'top-right'
      | 'center-left'
      | 'center'
      | 'center-right'
      | 'bottom-left'
      | 'bottom-center'
      | 'bottom-right';
  };
  intensity: number;
  easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'bounce';
  parameters: Record<string, unknown>;
  enabled: boolean;
}

export interface ITransitionConfig {
  fromSceneIndex: number;
  toSceneIndex: number;
  type:
    | 'none'
    | 'fade'
    | 'dissolve'
    | 'wipe_left'
    | 'wipe_right'
    | 'wipe_up'
    | 'wipe_down'
    | 'slide_left'
    | 'slide_right'
    | 'zoom_in'
    | 'zoom_out'
    | 'blur';
  duration: number;
  easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

export interface ISceneTimingConfig {
  sceneId: Types.ObjectId;
  order: number;
  startTime: number;
  duration: number;
  customDuration?: number;
}

export interface IOutputSettings {
  resolution: {
    width: number;
    height: number;
    preset: '480p' | '720p' | '1080p' | '1440p' | '4k' | 'custom';
  };
  aspectRatio: '16:9' | '9:16' | '1:1' | '4:3' | '21:9' | 'custom';
  frameRate: 24 | 30 | 60;
  quality: 'low' | 'medium' | 'high' | 'ultra';
  format: 'mp4' | 'webm' | 'mov';
  bitrate?: number;
}

export interface IBackgroundAudioConfig {
  audioAssetId?: Types.ObjectId;
  volume: number;
  fadeInDuration: number;
  fadeOutDuration: number;
  loop: boolean;
  enabled: boolean;
}

export interface IWatermarkConfig {
  enabled: boolean;
  imageUrl?: string;
  text?: string;
  position: {
    vertical: 'top' | 'middle' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  offset: {
    x: number;
    y: number;
  };
  opacity: number;
  size: number;
}

// ============ Main Interface ============

export interface IVideoConfig extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  storyId: Types.ObjectId;
  projectId: Types.ObjectId;
  name: string;
  description?: string;

  sceneOrder: Types.ObjectId[];
  sceneTiming: ISceneTimingConfig[];

  totalDuration: number;

  narration: INarrationConfig;

  captions: ICaptionConfig;

  soundEffects: ISoundEffectConfig[];

  videoEffects: IVideoEffectConfig[];

  transitions: ITransitionConfig[];

  backgroundAudio: IBackgroundAudioConfig;

  watermark: IWatermarkConfig;

  outputSettings: IOutputSettings;

  version: number;
  isTemplate: boolean;
  templateName?: string;

  createdAt: Date;
  updatedAt: Date;
}

const NarrationConfigSchema = new Schema<INarrationConfig>(
  {
    narrationId: { type: Schema.Types.ObjectId, ref: 'Narration', required: true },
    audioAssetId: { type: Schema.Types.ObjectId, ref: 'AudioAsset' },
    volume: { type: Number, min: 0, max: 100, default: 100 },
    startOffset: { type: Number, min: 0, default: 0 },
    endOffset: { type: Number, min: 0, default: 0 },
    fadeInDuration: { type: Number, min: 0, default: 0 },
    fadeOutDuration: { type: Number, min: 0, default: 0 },
    enabled: { type: Boolean, default: true },
  },
  { _id: false }
);

const CaptionConfigSchema = new Schema<ICaptionConfig>(
  {
    enabled: { type: Boolean, default: true },
    position: {
      vertical: { type: String, enum: ['top', 'middle', 'bottom'], default: 'bottom' },
      horizontal: { type: String, enum: ['left', 'center', 'right'], default: 'center' },
    },
    offset: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
    },
    style: {
      fontSize: { type: Number, min: 8, max: 120, default: 24 },
      fontFamily: { type: String, default: 'Arial' },
      fontColor: { type: String, default: '#FFFFFF' },
      fontWeight: { type: String, enum: ['normal', 'bold', 'light'], default: 'bold' },
      backgroundColor: { type: String, default: '#000000' },
      backgroundOpacity: { type: Number, min: 0, max: 100, default: 50 },
      textShadow: { type: Boolean, default: true },
      textOutline: { type: Boolean, default: false },
      outlineColor: { type: String, default: '#000000' },
      outlineWidth: { type: Number, min: 0, max: 10, default: 2 },
    },
    animation: {
      type: { type: String, enum: ['none', 'fade', 'slide', 'typewriter', 'bounce'], default: 'fade' },
      duration: { type: Number, min: 0, default: 0.3 },
    },
  },
  { _id: false }
);

const SoundEffectConfigSchema = new Schema<ISoundEffectConfig>(
  {
    audioAssetId: { type: Schema.Types.ObjectId, ref: 'AudioAsset', required: true },
    name: { type: String, required: true, trim: true },
    startTime: { type: Number, min: 0, required: true },
    duration: { type: Number, min: 0 },
    volume: { type: Number, min: 0, max: 100, default: 100 },
    trimStart: { type: Number, min: 0, default: 0 },
    usePercentage: { type: Number, min: 1, max: 100, default: 100 },
    loop: { type: Boolean, default: false },
    loopCount: { type: Number, min: 1 },
    fadeInDuration: { type: Number, min: 0, default: 0 },
    fadeOutDuration: { type: Number, min: 0, default: 0 },
    enabled: { type: Boolean, default: true },
  },
  { _id: false }
);

const VideoEffectConfigSchema = new Schema<IVideoEffectConfig>(
  {
    effectId: { type: String, required: true },
    effectType: {
      type: String,
      enum: [
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
      ],
      required: true,
    },
    name: { type: String, required: true, trim: true },
    startTime: { type: Number, min: 0, required: true },
    duration: { type: Number, min: 0, required: true },
    position: {
      x: { type: Number, min: 0, max: 100, default: 0 },
      y: { type: Number, min: 0, max: 100, default: 0 },
      width: { type: Number, min: 0, max: 100, default: 100 },
      height: { type: Number, min: 0, max: 100, default: 100 },
      anchorPoint: {
        type: String,
        enum: [
          'top-left',
          'top-center',
          'top-right',
          'center-left',
          'center',
          'center-right',
          'bottom-left',
          'bottom-center',
          'bottom-right',
        ],
        default: 'center',
      },
    },
    intensity: { type: Number, min: 0, max: 100, default: 50 },
    easing: {
      type: String,
      enum: ['linear', 'ease-in', 'ease-out', 'ease-in-out', 'bounce'],
      default: 'linear',
    },
    parameters: { type: Schema.Types.Mixed, default: {} },
    enabled: { type: Boolean, default: true },
  },
  { _id: false }
);

const TransitionConfigSchema = new Schema<ITransitionConfig>(
  {
    fromSceneIndex: { type: Number, required: true, min: 0 },
    toSceneIndex: { type: Number, required: true, min: 0 },
    type: {
      type: String,
      enum: [
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
      ],
      default: 'fade',
    },
    duration: { type: Number, min: 0, max: 5, default: 0.5 },
    easing: { type: String, enum: ['linear', 'ease-in', 'ease-out', 'ease-in-out'], default: 'ease-in-out' },
  },
  { _id: false }
);

const SceneTimingConfigSchema = new Schema<ISceneTimingConfig>(
  {
    sceneId: { type: Schema.Types.ObjectId, ref: 'Scene', required: true },
    order: { type: Number, required: true, min: 0 },
    startTime: { type: Number, required: true, min: 0 },
    duration: { type: Number, required: true, min: 0 },
    customDuration: { type: Number, min: 0 },
  },
  { _id: false }
);

const OutputSettingsSchema = new Schema<IOutputSettings>(
  {
    resolution: {
      width: { type: Number, min: 320, max: 7680, default: 1920 },
      height: { type: Number, min: 240, max: 4320, default: 1080 },
      preset: { type: String, enum: ['480p', '720p', '1080p', '1440p', '4k', 'custom'], default: '1080p' },
    },
    aspectRatio: { type: String, enum: ['16:9', '9:16', '1:1', '4:3', '21:9', 'custom'], default: '16:9' },
    frameRate: { type: Number, enum: [24, 30, 60], default: 30 },
    quality: { type: String, enum: ['low', 'medium', 'high', 'ultra'], default: 'high' },
    format: { type: String, enum: ['mp4', 'webm', 'mov'], default: 'mp4' },
    bitrate: { type: Number, min: 500, max: 100000 },
  },
  { _id: false }
);

const BackgroundAudioConfigSchema = new Schema<IBackgroundAudioConfig>(
  {
    audioAssetId: { type: Schema.Types.ObjectId, ref: 'AudioAsset' },
    volume: { type: Number, min: 0, max: 100, default: 30 },
    fadeInDuration: { type: Number, min: 0, default: 2 },
    fadeOutDuration: { type: Number, min: 0, default: 2 },
    loop: { type: Boolean, default: true },
    enabled: { type: Boolean, default: false },
  },
  { _id: false }
);

const WatermarkConfigSchema = new Schema<IWatermarkConfig>(
  {
    enabled: { type: Boolean, default: false },
    imageUrl: { type: String },
    text: { type: String, maxlength: 100 },
    position: {
      vertical: { type: String, enum: ['top', 'middle', 'bottom'], default: 'bottom' },
      horizontal: { type: String, enum: ['left', 'center', 'right'], default: 'right' },
    },
    offset: {
      x: { type: Number, default: 10 },
      y: { type: Number, default: 10 },
    },
    opacity: { type: Number, min: 0, max: 100, default: 70 },
    size: { type: Number, min: 1, max: 100, default: 10 },
  },
  { _id: false }
);

// ============ Main Schema ============

const VideoConfigSchema = new Schema<IVideoConfig>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    storyId: { type: Schema.Types.ObjectId, ref: 'Story', required: true, index: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, trim: true, maxlength: 1000 },

    sceneOrder: [{ type: Schema.Types.ObjectId, ref: 'Scene' }],
    sceneTiming: [SceneTimingConfigSchema],

    totalDuration: { type: Number, min: 0, default: 0 },

    narration: { type: NarrationConfigSchema, required: true },

    captions: { type: CaptionConfigSchema, default: () => ({}) },

    soundEffects: { type: [SoundEffectConfigSchema], default: [] },

    videoEffects: { type: [VideoEffectConfigSchema], default: [] },

    transitions: { type: [TransitionConfigSchema], default: [] },

    backgroundAudio: { type: BackgroundAudioConfigSchema, default: () => ({}) },

    watermark: { type: WatermarkConfigSchema, default: () => ({}) },

    outputSettings: { type: OutputSettingsSchema, default: () => ({}) },

    version: { type: Number, default: 1 },
    isTemplate: { type: Boolean, default: false, index: true },
    templateName: { type: String, trim: true, maxlength: 100 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ============ Indexes ============

VideoConfigSchema.index({ userId: 1, storyId: 1 });
VideoConfigSchema.index({ userId: 1, projectId: 1 });
VideoConfigSchema.index({ userId: 1, isTemplate: 1 });
VideoConfigSchema.index({ createdAt: -1 });

// ============ Virtual Fields ============

VideoConfigSchema.virtual('sceneCount').get(function () {
  return this.sceneOrder?.length || 0;
});

VideoConfigSchema.virtual('soundEffectCount').get(function () {
  return this.soundEffects?.filter((s) => s.enabled).length || 0;
});

VideoConfigSchema.virtual('videoEffectCount').get(function () {
  return this.videoEffects?.filter((v) => v.enabled).length || 0;
});

VideoConfigSchema.virtual('formattedDuration').get(function () {
  const totalSeconds = this.totalDuration || 0;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

const VideoConfig = mongoose.model<IVideoConfig>('VideoConfig', VideoConfigSchema);

export default VideoConfig;
