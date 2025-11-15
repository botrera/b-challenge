import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { config, s3 } from '../config';
import { logger } from '../lib';

const FILE_EXTENSION = /\.([a-z,A-z,0-9]+$)/;

const multerGeneric = multer({
  storage: multer.memoryStorage(),
});

interface MulterFile {
  originalname: string;
  fieldname: string;
}

const multerS3Config = multer({
  storage: multerS3({
    s3,
    bucket: config.aws.s3bucketName || '',
    metadata: (req: Request, file: MulterFile, cb: any) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req: Request, file: MulterFile, cb: any) => {
      try {
        const dirName: string = uuidv4();

        const fileExtension: string[] = FILE_EXTENSION.exec(file.originalname);

        let newFileName = `${dirName}/${file.fieldname}`;

        if (fileExtension.length === 2) {
          newFileName += `.${fileExtension[1]}`;
        }

        cb(null, newFileName);
      } catch (err) {
        logger.error({ err }, 'multer_err');
        cb(err);
      }
    },
  }),
});

const uploadUserPhoto = multerS3Config.fields([
  {
    name: 'photo',
    maxCount: 1,
  },
]);

const uploadCSV = multerGeneric.single('csv');

export const uploadFile = { uploadUserPhoto , uploadCSV };
