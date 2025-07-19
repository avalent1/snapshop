// middleware/cloudinaryStorage.ts
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from '../utils/cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'snaphop_photos',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });

export default upload;
