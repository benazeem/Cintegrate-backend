import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { upload } from './filenameLogic/multerAudio.js';
import { BadRequestError, PayloadTooLargeError } from '../error/index.js';

export const audioAssetUpload = (req: Request, res: Response, next: NextFunction) => {
  upload.single('audioFile')(req, res, (err) => {
    if (!err) return next();

    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(new PayloadTooLargeError('Audio file size exceeds the 100MB limit', err));
      }
      return next(new BadRequestError('Multer error during audio upload', { cause: err }));
    }
    return next(err);
  });
};
