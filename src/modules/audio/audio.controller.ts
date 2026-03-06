import { Request, Response } from 'express';
import {
  getAllAudioAssetsForNarration,
  getAllDeletedAudioAssets,
  getAudioAssetById,
  getAudioAssetCount,
  getActiveAudioAssetForNarration,
  generateAudioAsset,
  regenerateAudioAsset,
  uploadNarrationAudioAsset,
  setActiveAudioAsset,
  softDeleteAudioAsset,
  permanentDeleteAudioAsset,
  forceDeleteActiveAudioAsset,
  restoreAudioAsset,
  softDeleteAllAudioAssetsForNarration,
  permanentDeleteAllAudioAssetsForNarration,
  restoreAllDeletedAudioAssets,
  softBulkDeleteAudioAssets,
  permanentBulkDeleteAudioAssets,
  bulkRestoreAudioAssets,
} from './audio.service.js';
import type {
  GenerateAudioAssetInput,
  RegenerateAudioAssetInput,
  UploadAudioAssetInput,
  SetActiveAudioAssetInput,
  UpdateAudioAssetInput,
  BulkDeleteAudioAssetsInput,
  BulkRestoreAudioAssetsInput,
} from '@validation/audio.schema.js';
import { paginationResponse } from '@utils/paginationResponse.js';

// ==================== ALL OPERATIONS ====================

export const getAllAudioAssetsController = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { narrationId } = req.params;
  const pagination = req?.pagination!;
  const sorting = req?.sorting!;

  const [audioAssets, total] = await getAllAudioAssetsForNarration(userId, narrationId, pagination, sorting);

  const paginationRes = paginationResponse(pagination, total as number);

  res.status(200).json({
    message: 'Audio assets retrieved successfully',
    data: audioAssets,
    pagination: paginationRes,
  });
};

export const getAllDeletedAudioAssetsController = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { narrationId } = req.params;
  const pagination = req?.pagination!;
  const sorting = req?.sorting!;

  const [audioAssets, total] = await getAllDeletedAudioAssets(userId, narrationId, pagination, sorting);

  const paginationRes = paginationResponse(pagination, total as number);

  res.status(200).json({
    message: 'Deleted audio assets retrieved successfully',
    data: audioAssets,
    pagination: paginationRes,
  });
};

export const restoreAllDeletedAudioAssetsController = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { narrationId } = req.params;

  const result = await restoreAllDeletedAudioAssets(userId, narrationId);

  res.status(200).json({
    message: 'All deleted audio assets restored successfully',
    restoredCount: result.restoredCount,
  });
};

export const softDeleteAllAudioAssetsController = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { narrationId } = req.params;

  const result = await softDeleteAllAudioAssetsForNarration(userId, narrationId);

  res.status(200).json({
    message: 'All audio assets soft deleted successfully',
    deletedCount: result.deletedCount,
  });
};

export const permanentDeleteAllAudioAssetsController = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { narrationId } = req.params;

  const result = await permanentDeleteAllAudioAssetsForNarration(userId, narrationId);

  res.status(200).json({
    message: 'All audio assets permanently deleted successfully',
    deletedCount: result.deletedCount,
  });
};

export const getAudioAssetCountController = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { narrationId } = req.params;

  const count = await getAudioAssetCount(userId, narrationId);

  res.status(200).json({
    message: 'Audio asset count retrieved successfully',
    count,
  });
};

// ==================== BULK OPERATIONS ====================

export const softBulkDeleteAudioAssetsController = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { narrationId } = req.params;
  const { audioAssetIds } = req.validatedBody as BulkDeleteAudioAssetsInput;

  const result = await softBulkDeleteAudioAssets(userId, narrationId, audioAssetIds);

  res.status(200).json({
    message: 'Audio assets soft deleted successfully',
    deletedCount: result.deletedCount,
  });
};

export const permanentBulkDeleteAudioAssetsController = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { narrationId } = req.params;
  const { audioAssetIds } = req.validatedBody as BulkDeleteAudioAssetsInput;

  const result = await permanentBulkDeleteAudioAssets(userId, narrationId, audioAssetIds);

  res.status(200).json({
    message: 'Audio assets permanently deleted successfully',
    deletedCount: result.deletedCount,
  });
};

export const bulkRestoreAudioAssetsController = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { narrationId } = req.params;
  const { audioAssetIds } = req.validatedBody as BulkRestoreAudioAssetsInput;

  const result = await bulkRestoreAudioAssets(userId, narrationId, audioAssetIds);

  res.status(200).json({
    message: 'Audio assets restored successfully',
    data: result,
  });
};

// ==================== SINGLE OPERATIONS ====================

export const getAudioAssetByIdController = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { audioAssetId } = req.params;

  const audioAsset = await getAudioAssetById(userId, audioAssetId);

  res.status(200).json({
    message: 'Audio asset retrieved successfully',
    data: audioAsset,
  });
};

export const getActiveAudioAssetController = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { narrationId } = req.params;

  const audioAsset = await getActiveAudioAssetForNarration(userId, narrationId);

  if (!audioAsset) {
    return res.status(200).json({
      message: 'No active audio asset found for this narration',
      data: null,
    });
  }

  res.status(200).json({
    message: 'Active audio asset retrieved successfully',
    data: audioAsset,
  });
};

export const generateAudioAssetController = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { narrationId } = req.params;
  const { voiceId, prompt } = req.validatedBody as GenerateAudioAssetInput;

  const audioAsset = await generateAudioAsset(userId, narrationId, voiceId, prompt);

  res.status(201).json({
    message: 'Audio asset generated successfully',
    data: audioAsset,
  });
};

export const regenerateAudioAssetController = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { audioAssetId } = req.params;
  const { voiceId, extraPrompt } = req.validatedBody as RegenerateAudioAssetInput;

  const audioAsset = await regenerateAudioAsset(userId, audioAssetId, voiceId, extraPrompt);

  res.status(201).json({
    message: 'Audio asset regenerated successfully',
    data: audioAsset,
  });
};

export const uploadAudioAssetController = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { narrationId } = req.params;

  if (!req.file) {
    return res.status(400).json({
      message: 'No file uploaded',
    });
  }

  const audioAsset = await uploadNarrationAudioAsset(userId, narrationId, req.file.path);

  res.status(201).json({
    message: 'Audio asset uploaded successfully',
    data: audioAsset,
  });
};

export const setActiveAudioAssetController = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { narrationId } = req.params;
  const { audioAssetId } = req.validatedBody as SetActiveAudioAssetInput;

  const audioAsset = await setActiveAudioAsset(userId, narrationId, audioAssetId);

  res.status(200).json({
    message: 'Audio asset set as active successfully',
    data: audioAsset,
  });
};

export const softDeleteAudioAssetController = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { audioAssetId } = req.params;

  await softDeleteAudioAsset(userId, audioAssetId);

  res.status(200).json({
    message: 'Audio asset soft deleted successfully',
  });
};

export const permanentDeleteAudioAssetController = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { audioAssetId } = req.params;

  await permanentDeleteAudioAsset(userId, audioAssetId);

  res.status(200).json({
    message: 'Audio asset permanently deleted successfully',
  });
};

export const forceDeleteActiveAudioAssetController = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { audioAssetId } = req.params;

  await forceDeleteActiveAudioAsset(userId, audioAssetId);

  res.status(200).json({
    message: 'Active audio asset force deleted successfully',
  });
};

export const restoreAudioAssetController = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { narrationId, audioAssetId } = req.params;

  const audioAsset = await restoreAudioAsset(userId, narrationId, audioAssetId);

  res.status(200).json({
    message: 'Audio asset restored successfully',
    data: audioAsset,
  });
};
