import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFileToStorage = async (
  file: Express.Multer.File,
  fileType: 'photo' | 'resume' | 'project' | 'certificate'
): Promise<string> => {
  const isCloudinaryConfigured =
    Boolean(process.env.CLOUDINARY_CLOUD_NAME) &&
    Boolean(process.env.CLOUDINARY_API_KEY) &&
    Boolean(process.env.CLOUDINARY_API_SECRET);

  if (isCloudinaryConfigured) {
    return new Promise((resolve, reject) => {
      const isPdf =
        file.mimetype === 'application/pdf' ||
        file.originalname.toLowerCase().endsWith('.pdf');
      const resourceType = fileType === 'resume' || (fileType === 'certificate' && isPdf) ? 'raw' : 'image';

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'portfolio_assets',
          resource_type: resourceType,
          public_id: `${fileType}_${Date.now()}`,
        },
        (error, result) => {
          if (error || !result) {
            console.error('Cloudinary upload error:', error);
            return reject(new Error('Cloudinary upload failed'));
          }
          resolve(result.secure_url);
        }
      );
      uploadStream.end(file.buffer);
    });
  } else {
    // Persistent Local Storage in uploads directory
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = `${fileType}-${uniqueSuffix}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    await fs.promises.writeFile(filePath, file.buffer);

    // Form absolute or root-relative URL for Express static serving
    const port = process.env.PORT || 5000;
    return `http://localhost:${port}/uploads/${filename}`;
  }
};
