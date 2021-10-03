import vision from '@google-cloud/vision';

const detectMultipleObjectsFromUrl = async (gcsUri) => {
  // Creates a client
  const client = new vision.ImageAnnotatorClient();
  const [result] = await client.objectLocalization(gcsUri);
  if (result.error !== null) throw result.error.message;

  const objects = result.localizedObjectAnnotations;
  const imageObjectNamesArray = [];
  objects.forEach((object) => {
    imageObjectNamesArray.push(object.name);
  });
  return imageObjectNamesArray;
};

export default detectMultipleObjectsFromUrl;

