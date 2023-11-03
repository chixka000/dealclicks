import { IImageExtensions } from "../interfaces/file";
import { readFile, writeFile, unlink } from "fs/promises";
import path from "path";
import sharp from "sharp";
import { v4 as uuidV4 } from "uuid";
import { bulkUpload, destroy, uploads } from "../config/cloudinary";
import File from "../../file/models/file";
import { IUser } from "../../user/interfaces";
import { IFile } from "../../file/interfaces/file";

export default class FileUploadService {
  async ImageConversion(
    filePath: string,
    outputPath: string,
    type: IImageExtensions
  ): Promise<{ error: boolean; filePath?: string }> {
    try {
      // read file from client (as buffer)
      const imageBuffer = await readFile(filePath);

      // execute sharp image conversion and compressor
      await sharp(imageBuffer)[type]().toFile(outputPath);

      // retur success object
      return { error: false, filePath: outputPath };
    } catch (error) {
      // throw the error
      throw error;
    }
  }

  async TemporaryStorageUpload(file: File): Promise<{
    error: boolean;
    filePath?: string | undefined;
  }> {
    try {
      // transform the file to buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // initialize a uuid to use in file name of the file (to make it unique)
      const uuid = uuidV4();

      // create a temporary storage for the file
      const tempPath = path.join(
        process.cwd(),
        "public",
        "images",
        uuid + file.name
      );

      // create a temporary storage for converted file (webp)
      const outputPath = path.join(
        process.cwd(),
        "public",
        "images",
        uuid + "+" + file.name.split(".")[0] + ".webp"
      );

      // upload the file in the temporary storage
      await writeFile(tempPath, buffer);

      // convert the uploaded file to webp
      const convertedImage = await this.ImageConversion(
        tempPath,
        outputPath,
        "webp"
      );

      // delete the original file
      await unlink(tempPath);

      // return the uploaded file
      return convertedImage;
    } catch (error) {
      throw error;
    }
  }

  async UploadImage(clientFile: File, user: IUser): Promise<IFile> {
    try {
      // validate file
      if (!clientFile) throw new Error("File is missing.");

      // validate user
      if (!user)
        throw new Error("you dont have a permission to perform this action.");

      // upload file to temporary storage
      const uploadedFile = await this.TemporaryStorageUpload(clientFile);

      // cloudinary upload method
      const uploader = async (path: string) =>
        await uploads(path, "dealclicks/products");

      // upload to cloudinary
      const uploadedData = await uploader(uploadedFile.filePath!);

      // store to file collection

      console.log(uploadedData);

      const types = clientFile.type.split("/");

      const file = await File.create({
        fileName: clientFile.name.split(".")[0] + ".webp",
        size: clientFile.size,
        type: types[0],
        subtype: types[1],
        url: uploadedData.url,
        uploadedBy: user._id,
        signature: uploadedData.signature,
        publicId: uploadedData.public_id,
      });

      // delete the file in the temporary storage
      await unlink(uploadedFile.filePath!);

      // return the created document
      return file;
    } catch (error) {
      // throw the error
      throw error;
    }
  }

  async UploadImages(clientFiles: File[], user: IUser) {
    try {
      // validate user
      if (!user)
        throw new Error("you dont have a permission to perform this action.");

      // validate file
      if (!clientFiles || !clientFiles?.length)
        throw new Error("File is missing.");

      // upload every file in the temporary storage
      const imagePaths: string[] = [];

      for (const clientFile of clientFiles) {
        // upload file to temporary storage
        const uploadedFile = await this.TemporaryStorageUpload(clientFile);

        // push file path of the uploaded file
        imagePaths.push(uploadedFile.filePath!);
      }

      // cloudinary upload method
      const uploader = async (path: string[]) =>
        await bulkUpload(path, "dealclicks/products");

      // upload to cloudinary
      const uploadedData = await uploader(imagePaths);

      const formattedFile: IFile[] = uploadedData.map((item) => {
        return {
          fileName: item.original_filename.split("+")[1] + "." + item.format,
          size: item.bytes,
          type: item.resource_type,
          subtype: item.format,
          url: item.url,
          signature: item.signature,
          publicId: item.public_id,
          uploadedBy: user._id!,
        };
      });

      const files = await File.insertMany(formattedFile);
      // console.log(uploadedData);

      for (const imagePath of imagePaths) {
        await unlink(imagePath);
      }

      return files;
    } catch (error) {
      // throw the error
      throw error;
    }
  }

  async deleteImage(publicId: string, user: IUser) {
    try {
      // validate public ID
      if (!publicId) throw new Error("public ID is missing.");

      // validate user
      if (!user)
        throw new Error("you dont have a permission to perform this action.");

      // delete image in cloudinary method
      const destroyer = async (publicId: string) => await destroy(publicId);

      // execute destroyer method
      await destroyer(publicId);

      // delete the file in collection
      await File.deleteOne({ publicId: publicId });

      return true;
    } catch (error) {
      throw error;
    }
  }
}
