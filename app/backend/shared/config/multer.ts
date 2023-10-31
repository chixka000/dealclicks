import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "public/images");
  },
  filename: function (request, file, callback) {
    const generatedUUID = uuidv4();

    callback(null, generatedUUID + "-" + file.originalname);
  },
});

function fileFilter(
  request: any,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) {
  if (file.mimetype.includes("image")) callback(null, true);

  callback(null, false);
}

const upload = multer({
  storage,
  limits: {
    fieldSize: 1024 * 1024,
  },
  fileFilter,
});

export default upload;
