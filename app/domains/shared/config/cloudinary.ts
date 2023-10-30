import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface UploadResult {
  public_id: string;
  url: string;
}

const upload = (file: string, folder: string): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        resource_type: "auto",
        folder,
      },
      (result: any) => {
        resolve({ public_id: result.public_id, url: result.url });
      }
    );
  });
};

export { upload, cloudinary };
