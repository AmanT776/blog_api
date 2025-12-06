const cloudinary = require("../Config/cloudinary");
const fs = require("fs");

const uploadToCloudinary = async (fileBuffer) => {
  try {
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream((error, uploadResult) => {
          if (error) {
            return reject(error);
          }
          return resolve(uploadResult);
        })
        .end(fileBuffer);
    });
    return uploadResult.url;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
module.exports = uploadToCloudinary;
