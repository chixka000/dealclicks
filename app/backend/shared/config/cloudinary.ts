import { v2 as cloudinary } from "cloudinary";
import { resolve } from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface UploadResult {
  public_id: string;
  url: string;
  signature: string;
  asset_id: string;
  version: number;
  version_id: string;
  width: number;
  height: number;
  format: string;
  resource_type: "image";
  bytes: number;
  secure_url: string;
  folder: string;
  original_filename: string;
}

const uploads = (file: string, folder: string): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        resource_type: "auto",
        folder,
      },
      (_, result: any) => {
        resolve({
          ...result,
        });
      }
    );
  });
};

const destroy = (publicId: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
};

const bulkUpload = (
  files: string[],
  folder: string
): Promise<UploadResult[]> => {
  const uploadPromises = files.map((file) => uploads(file, folder));
  return Promise.all(uploadPromises);
};
export { uploads, destroy, cloudinary, bulkUpload };
