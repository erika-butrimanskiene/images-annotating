const detectMultipleObjectsFromUrl = async (gcsUri) => {
// Imports the Google Cloud client libraries
    const vision = require('@google-cloud/vision');
// Creates a client
    const client = new vision.ImageAnnotatorClient();
/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
    const [result] = await client.objectLocalization(gcsUri);
    const objects = result.localizedObjectAnnotations;
    const imageObjectNamesAarray = [];
    objects.forEach(object => {
        imageObjectNamesAarray.push(object.name)
    });
    return imageObjectNamesAarray
};

module.exports = {
    detectMultipleObjectsFromUrl
};


  
