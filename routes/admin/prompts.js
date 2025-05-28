const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const promptController = require('../../controllers/admin/promptController');
const isAdmin = require('../../middleware/authMiddleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/prompts/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.get('/', isAdmin, promptController.getPrompts);
router.get('/promptlist', promptController.getPromptslist);

router.post('/upload-prompt', upload.single('file'), promptController.uploadPrompt);
router.post('/upload-prompt', upload.single('file'), promptController.uploadPrompt);
module.exports = router;
