import express from 'express';
const router = express.Router();

// Controllers
import ImagesController from '../images/imagesController.js';

// Images routes
router.post('/images/annotate', ImagesController.saveAnnotatedImage);

router.get('/lastImages/:number', ImagesController.getLastAnnotatedImages);

// Export
export default router;
