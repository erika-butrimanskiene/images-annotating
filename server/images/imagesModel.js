const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  objectNamesArr: {
    type: Array,
    default: [],
  },
});


const Image = mongoose.model('Image', ImageSchema);
module.exports = Image;