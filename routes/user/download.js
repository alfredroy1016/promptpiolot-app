const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Serve download page (EJS rendering)
// Show the download page using query param (no DB lookup)
router.get('/download-page', (req, res) => {
  let file = req.query.file;
  if (!file) return res.status(400).send('No file specified');

  // Ensure .pdf extension is added if missing
  if (!file.endsWith('.pdf')) {
    file += '.pdf';
  } 

  res.render('user/download', { prompt: { file } });
});


// Download file
// Updated: safer, clearer download path
router.get('/download-file/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../../uploads/prompts', filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('❌ File not found:', filePath);
      return res.status(404).send('File not found.');
    }

    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('❌ Download error:', err);
        res.status(500).send('Error downloading file.');
      }
    });
  });
});


module.exports = router;
