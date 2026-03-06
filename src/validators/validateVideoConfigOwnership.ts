import { Types } from 'mongoose';
import VideoConfig, { IVideoConfig } from '@models/VideoConfig.js';
import { VIDEO_CONFIG_ERROR_MESSAGES } from '@constants/videoConfigConsts.js';
import { NotFoundError, UnauthorizedError } from '@middleware/error/index.js';

interface ValidateVideoConfigOwnershipResult {
  videoConfig: IVideoConfig;
}

export async function validateVideoConfigOwnership(
  configId: string | Types.ObjectId,
  userId: string | Types.ObjectId,
  options: {
    populate?: string | string[];
  } = {}
): Promise<ValidateVideoConfigOwnershipResult> {
  const { populate } = options;

  let query = VideoConfig.findById(configId);

  if (populate) {
    if (Array.isArray(populate)) {
      populate.forEach((field) => {
        query = query.populate(field);
      });
    } else {
      query = query.populate(populate);
    }
  }

  const videoConfig = await query.exec();

  if (!videoConfig) {
    throw new NotFoundError(VIDEO_CONFIG_ERROR_MESSAGES.NOT_FOUND);
  }

  // Check ownership
  const configUserId = videoConfig.userId.toString();
  const requestUserId = userId.toString();

  if (configUserId !== requestUserId) {
    throw new UnauthorizedError(VIDEO_CONFIG_ERROR_MESSAGES.UNAUTHORIZED);
  }

  return { videoConfig };
}

export default validateVideoConfigOwnership;
