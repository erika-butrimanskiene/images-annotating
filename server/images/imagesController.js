const Image = require('./imagesModel');
const api = require('../utils/api')

const saveAnnotatedImage = async (req, res, next) => {
    let image = new Image(req.body)
    try {
      const imageObjectNamesArray = await api.detectMultipleObjectsFromUrl(req.body.imageUrl)
      image.objectNamesArr = imageObjectNamesArray;
      
      let savedImage = await image.save();
      res.json(savedImage);
    } catch (err) {
      res.statusMessage = err;
      res.status(400).end();
    }
};

const getLastAnnotatedImages = async (req, res) => {
  let number = req.params.number;
  try {
    let annotatedImages = await Image.find({});
    let lastAnnotatedImages = annotatedImages.slice(-number);

    res.json(lastAnnotatedImages.reverse());
  } catch (err) {
    res.statusMessage = err;
    res.status(400).end();
  }
};
  
module.exports = {
  saveAnnotatedImage,
  getLastAnnotatedImages
};