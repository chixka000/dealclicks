import { IImageExtensions } from "../interfaces/file";
import { readFile, writeFile, unlink } from "fs/promises";
import path from "path";
import sharp from "sharp";
import { v4 as uuidV4 } from "uuid";
import { uploads } from "../config/cloudinary";
import File from "../../file/models/file";
import { IUser } from "../../user/interfaces";
import { IFIle } from "../../file/interfaces/file";

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

  async UploadFile(clientFile: File, user: IUser): Promise<IFIle> {
    try {
      // validate user
      if (!user)
        throw new Error("you dont have a permission to perform this action.");

      // transform the file to buffer
      const bytes = await clientFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // initial a uuid to use in file name of the file (to make it unique)
      const uuid = uuidV4();

      // create a temporary storage for the file
      const tempPath = path.join(
        process.cwd(),
        "public",
        "images",
        uuid + clientFile.name
      );

      // create a temporary storage for converted file (webp)
      const outputPath = path.join(
        process.cwd(),
        "public",
        "images",
        uuid + ".webp"
      );

      // upload the file in the temporary storage
      await writeFile(tempPath, buffer);

      const result = await this.ImageConversion(tempPath, outputPath, "webp");

      // cloudinary upload method
      const uploader = async (path: string) =>
        await uploads(path, "dealclicks/products");

      // upload to cloudinary
      const uploadedData = await uploader(result.filePath!);

      // store to file collection

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
      await unlink(tempPath);
      await unlink(outputPath);

      // return the created document
      return file;
    } catch (error) {
      // throw the error
      throw error;
    }
  }
}
