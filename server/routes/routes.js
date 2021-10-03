import express from 'express';

// Controllers
import ImagesController from '../images/imagesController.js';

const router = express.Router();

// Images routes
router.post('/images/annotate', ImagesController.saveAnnotatedImage);

router.get('/lastImages/:number', ImagesController.getLastAnnotatedImages);

// Export
export default router;
