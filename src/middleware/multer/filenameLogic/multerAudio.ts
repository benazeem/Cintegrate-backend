import { Request } from 'express';
import fs from 'fs';
import multer from 'multer';
import { BadRequestError } from '../../error/index.js';

const storage = multer.diskStorage({
  destination: function (
    _req: Request,
    _file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    const uploadPath = './temp/uploads/audio';
    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) {
        cb(err, uploadPath);
      } else {
        cb(null, uploadPath);
      }
    });
  },
  filename: function (
    _req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    const lastDotIndex = file.originalname.lastIndexOf('.');
    const fileExtension = lastDotIndex >= 0 ? file.originalname.substring(lastDotIndex).toLowerCase() : '';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});

const allowedExtensions = ['.mp3', '.wav', '.ogg', '.aac', '.m4a', '.flac', '.wma', '.opus'];
const allowedMimetypes = [
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/wave',
  'audio/x-wav',
  'audio/ogg',
  'audio/aac',
  'audio/mp4',
  'audio/x-m4a',
  'audio/flac',
  'audio/x-flac',
  'audio/x-ms-wma',
  'audio/opus',
];

const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  if (!allowedMimetypes.includes(file.mimetype)) {
    cb(new BadRequestError('Only audio files (mp3, wav, ogg, aac, m4a, flac, wma, opus) are allowed'));
    return;
  }
  const lastDotIndex = file.originalname.lastIndexOf('.');
  if (lastDotIndex < 0) {
    cb(new BadRequestError('Only audio files (mp3, wav, ogg, aac, m4a, flac, wma, opus) are allowed'));
    return;
  }
  const fileExtension = file.originalname.substring(lastDotIndex).toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    cb(new BadRequestError('Only audio files (mp3, wav, ogg, aac, m4a, flac, wma, opus) are allowed'));
    return;
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

export { upload };
