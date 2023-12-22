const multer = require('multer');
const { uploadToStorage } = require('./handler');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const handleFileUpload = async (req, res, next) => {
  try {
    const file = req.file;
    const imageUrl = await uploadToStorage(file);
    req.imageUrl = imageUrl;
    next();
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};