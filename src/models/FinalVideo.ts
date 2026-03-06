import { Schema, model, Document, Types } from 'mongoose';

export interface FinalVideo extends Document {
  userId: Types.ObjectId;
  projectId: Types.ObjectId;
  storyId: Types.ObjectId;
  videoUrl?: string;
  lastError?: { message: string; code?: number; count?: number };
  backgroundAudioAssetId?: Types.ObjectId;
  narrationAudioAssetId?: Types.ObjectId;
  sceneAssetIds: Types.ObjectId[];
  duration?: number;
  videoConfigId: Types.ObjectId;
  status: 'rendering' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const finalVideoSchema = new Schema<FinalVideo>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
    storyId: {
      type: Schema.Types.ObjectId,
      ref: 'Story',
      required: true,
      index: true,
    },
    videoUrl: {
      type: String,
    },
    lastError: {
      type: {
        message: String,
        code: Number,
        count: Number,
      },
    },
    backgroundAudioAssetId: {
      type: Schema.Types.ObjectId,
      ref: 'AudioAsset',
    },
    narrationAudioAssetId: {
      type: Schema.Types.ObjectId,
      ref: 'AudioAsset',
    },
    sceneAssetIds: {
      type: [{ type: Schema.Types.ObjectId, ref: 'SceneAsset' }],
      required: true,
    },
    videoConfigId: {
      type: Schema.Types.ObjectId,
      ref: 'VideoConfig', // Reference to VideoConfig model
      required: true,
    },
    status: {
      type: String,
      enum: ['rendering', 'completed', 'failed'],
      default: 'rendering',
      index: true,
    },
  },
  { timestamps: true }
);

finalVideoSchema.index({ userId: 1, status: 1 });

export const FinalVideoModel = model<FinalVideo>('FinalVideo', finalVideoSchema);
