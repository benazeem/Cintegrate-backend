import { NotFoundError } from '@middleware/error/index.js';
import { AudioAsset, AudioAssetModel } from '@models/AudioAsset.js';
import { ClientSession } from 'mongoose';

export async function validateAudioAssetOwnership(
  userId: string,
  audioAssetId: string,
  session?: ClientSession
): Promise<AudioAsset> {
  const query = AudioAssetModel.findOne({
    _id: audioAssetId,
    userId,
  });

  if (session) query.session(session);

  const audioAsset = await query;
  if (!audioAsset) {
    throw new NotFoundError('Audio asset not found or access denied');
  }
  return audioAsset;
}
