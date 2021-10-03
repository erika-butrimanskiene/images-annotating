import Image from './imagesModel.js';
import detectMultipleObjectsFromUrl from '../utils/api.js';


const saveAnnotatedImage = async (req, res) => {
  let image = new Image(req.body);
  try {
    const imageObjectNamesArray = await detectMultipleObjectsFromUrl(
      req.body.imageUrl,
    );
    image.objectNamesArr = imageObjectNamesArray;

    let savedImage = await image.save();
    res.json(savedImage);
  } catch (err) {
    res.statusMessage = err;
    res.status(400).end();
  }
};

const getLastAnnotatedImages = async (
  req,
  res
) => {
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

export default {
  saveAnnotatedImage,
  getLastAnnotatedImages,
};
