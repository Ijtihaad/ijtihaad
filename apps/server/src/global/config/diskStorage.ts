import multer from 'multer';
import path from 'node:path';

export const uploadDir = path.join(process.cwd(), 'uploads');

export default multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split('.').pop();
    const fileName = file.originalname
      .replace(`.${extension}`, '')
      .replace(' ', '-')
      .trim();
    const modifiedName = `${fileName}-${uniqueSuffix}.${extension}`;
    req.body['files'] = [...(req.body['files'] ?? []), modifiedName];
    cb(null, modifiedName);
  },
});
