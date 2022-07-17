const Branch = require("../models/branchModel");
const globalFuctions = require("../utils/globalFuctions");
const admin = require("firebase-admin");
const uuid = require("uuid-v4");
const dotenv = require("dotenv");
const fs = require("fs");
const Auth = require("../models/authModel");

dotenv.config();
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SECRET)),
  storageBucket: "gs://cpet-2093a.appspot.com",
});

const bucket = admin.storage().bucket();

async function uploadFile(fileName) {
  try {
    const metadata = {
      metadata: {
        // This line is very important. It's to create a download token.
        firebaseStorageDownloadTokens: uuid(),
      },
      contentType: "image/png",
      cacheControl: "public, max-age=31536000",
    };

    // Uploads a local file to the bucket
    let data = await bucket.upload(fileName, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      metadata: metadata,
    });
    fs.unlinkSync(fileName);
    return data;
  } catch (error) {
    console.log(error);
  }
}

exports.createBranch = async (req, res) => {
  try {
    let uploadData = await uploadFile(
      `${__dirname + "/uploads/" + req.file.filename}`
    );

    let data = await Branch.create({
      ...req.body,
      image: uploadData[1].mediaLink,
    });
    let user = await Auth.create({ ...req.body, branch: data._id });
    res.status(200).json({
      data,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.editBranch = async (req, res) => {
  try {
    let uploadData = null;
    if (req.file) {
      let data = await uploadFile(
        `${__dirname + "/uploads/" + req.file.filename}`
      );
      uploadData = data[1].mediaLink;
    } else {
      uploadData = req.body.image;
    }

    let data = await Branch.findByIdAndUpdate(req.params.id, {
      ...req.body,
      image: uploadData,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.getBranch = globalFuctions.getOne(Branch);
exports.getAllBranches = globalFuctions.getAll(Branch);
exports.deleteBranch = globalFuctions.deleteStatus(Branch);
