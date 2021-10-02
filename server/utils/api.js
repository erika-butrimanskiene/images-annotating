const detectMultipleObjectsFromUrl = async (gcsUri) => {
// Imports the Google Cloud client libraries
    const vision = require('@google-cloud/vision');
// Creates a client
    const client = new vision.ImageAnnotatorClient();
/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
    const [result] = await client.objectLocalization(gcsUri);
    console.log(result);
    if (result.error !== null) throw result.error.message
    
    const objects = result.localizedObjectAnnotations;
    const imageObjectNamesArray = [];
    objects.forEach(object => {
        imageObjectNamesArray.push(object.name)
    });
    return imageObjectNamesArray
};

module.exports = {
    detectMultipleObjectsFromUrl
};


  
