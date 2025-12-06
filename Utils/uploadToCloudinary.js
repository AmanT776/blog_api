const cloudinary = require("../Config/cloudinary");

const uploadToCloudinary = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.url;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = uploadToCloudinary;
