import { BadRequestError, ConflictError } from '@middleware/error/index.js';
import { AudioAsset } from '@models/AudioAsset.js';

export function assertAudioAssetNotDeleted(audioAsset: AudioAsset): void {
  if (audioAsset.deletedAt) {
    throw new ConflictError('Audio asset is already deleted');
  }
}

export function assertAudioAssetIsDeleted(audioAsset: AudioAsset): void {
  if (!audioAsset.deletedAt) {
    throw new ConflictError('Audio asset is not deleted');
  }
}

export function assertAudioAssetIsActive(audioAsset: AudioAsset): void {
  if (!audioAsset.activeNarration) {
    throw new BadRequestError('Audio asset is not the active narration');
  }
}

export function assertAudioAssetNotActive(audioAsset: AudioAsset): void {
  if (audioAsset.activeNarration) {
    throw new BadRequestError('Cannot perform this operation on the active audio asset. Please set another audio asset as active first.');
  }
}

export function assertHasDeletedAudioAssets(audioAssets: AudioAsset[]): void {
  if (!audioAssets.length) {
    throw new BadRequestError('No deleted audio assets found to restore');
  }
}

export function assertHasNonDeletedAudioAssets(audioAssets: AudioAsset[]): void {
  if (!audioAssets.length) {
    throw new BadRequestError('No audio assets found to delete');
  }
}

export function assertAudioAssetTypeIsNarration(audioAsset: AudioAsset): void {
  if (audioAsset.type !== 'narration') {
    throw new BadRequestError('This operation is only allowed for narration type audio assets');
  }
}
