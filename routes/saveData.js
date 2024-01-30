const express = require("express");
const fs = require("fs");
const router = express.Router();
const multer = require("multer");
const { saveData } = require("../controllers/saveData");

const createFolder = (req, res, next) => {
  const path = "./files";
  fs.mkdir(path, (error) => {
    if (error) {
      next();
    } else {
      next();
    }
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./files");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", createFolder, upload.single("file"), saveData);

module.exports = router;
