// backend/middlewares/uploadMiddleware.js
import multer from 'multer';

const storage = multer.memoryStorage(); // required for Azure blob upload
const upload = multer({ storage });

export default upload;
