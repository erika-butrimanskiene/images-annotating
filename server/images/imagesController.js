const Image = require('./imagesModel');
const api = require('../utils/api')

const saveAnnotatedImage = async (req, res) => {
    let image = new Image(req.body)

    const imageObjectNamesArray = await api.detectMultipleObjectsFromUrl('https://images.pexels.com/photos/9247344/pexels-photo-9247344.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')
  
    try {
      image.objectNamesArr = imageObjectNamesArray;
      let savedImage = await image.save();
      res.json({ savedImage, success: true, msg: 'Image saved successfully.' });
    } catch (err) {
      res.status(400).json(err);
    }

};
  
module.exports = {
  saveAnnotatedImage
};