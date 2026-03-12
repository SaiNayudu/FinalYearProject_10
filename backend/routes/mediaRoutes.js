const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { uploadMedia, verifyHash } = require("../controllers/mediaController");

router.post("/upload", upload.single("image"), uploadMedia);
router.get("/verify/:hash", verifyHash);

module.exports = router;
