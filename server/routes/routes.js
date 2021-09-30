const router = require('express').Router();

// Controllers
const ImagesController = require('../images/imagesController');

// Images routes
router.post(
    '/images/annotate',
    ImagesController.saveAnnotatedImage
  );

// Export
module.exports = router;