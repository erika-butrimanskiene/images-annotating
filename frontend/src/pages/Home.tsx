import { useState, useEffect } from 'react';
import './Home.css';
import ImageWithResults from '../components/ImageWithResults';
import Spinner from '../components/Spinner';

interface iLastAnnotatedImages {
  imageUrl: string;
  objectNamesArr: string[];
  _id?: string;
}

const Home = () => {
  //states
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [urlForAnnotate, setUrlForAnnotate] = useState<string>('');
  const [lastAnnotatedImages, setLastAnnotatedImages] = useState<
    iLastAnnotatedImages[]
  >([]);

  //functions
  const handleImageAnnotating = async () => {
    setErrorMsg('');
    setLoading(true);
    if (urlForAnnotate !== '') {
      const response = await fetch('http://localhost:5000/images/annotate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: urlForAnnotate }),
      });

      if (response.status === 200) {
        const imageAnnotatingResult = await response.json();
        updateLastAnnotatedImages(
          imageAnnotatingResult.imageUrl,
          imageAnnotatingResult.objectNamesArr,
        );
        setUrlForAnnotate('');
      } else {
        setErrorMsg('*Something went wrong, please double check your URL');
      }
    } else {
      setErrorMsg('*Please type URL');
    }
    setLoading(false);
  };

  const updateLastAnnotatedImages = (
    imageUrl: string,
    objectNamesArr: string[],
  ) => {
    const lastAnotatedImagesCopy = JSON.parse(
      JSON.stringify(lastAnnotatedImages),
    );

    lastAnotatedImagesCopy.unshift({ imageUrl, objectNamesArr });
    lastAnotatedImagesCopy.pop();
    setLastAnnotatedImages(lastAnotatedImagesCopy);
  };

  const getLastAnnotatedImages = async (number: string) => {
    const response = await fetch(`http://localhost:5000/lastImages/${number}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const lastAnnotatedImages = await response.json();
      setLastAnnotatedImages(lastAnnotatedImages);
    }
  };

  //effects
  useEffect(() => {
    getLastAnnotatedImages('5');
  }, []);

  return (
    <div className='home-page'>
      <div className='home-annotating-form'>
        <p className='home-annotating-form__heading'>Identify image content</p>
        <input
          className='home-annotating-form__input'
          type='text'
          placeholder='type image URL'
          value={urlForAnnotate}
          onChange={(e) => {
            setUrlForAnnotate(e.target.value);
          }}
        />
        {errorMsg !== '' && (
          <p className='home-annotating-form__message'>{errorMsg}</p>
        )}
        {loading ? (
          <Spinner />
        ) : (
          <button
            className='home-annotating-form__button'
            onClick={handleImageAnnotating}
          >
            Identify
          </button>
        )}
      </div>
      <div className='home-annotated-images'>
        <div className='home-annotated-images__select'>
          <select
            name='select'
            id='home-annotated-images__select-value'
            onChange={(e) => {
              getLastAnnotatedImages(e.target.value);
            }}
          >
            <option className='select-value' value='5'>
              5 images
            </option>
            <option className='select-value' value='10'>
              10 images
            </option>
            <option className='select-value' value='15'>
              15 images
            </option>
          </select>
        </div>
        {lastAnnotatedImages.map(
          (item: { imageUrl: string; objectNamesArr: string[] }, index) => (
            <ImageWithResults
              key={index}
              imageUrl={item.imageUrl}
              resultsArr={item.objectNamesArr}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default Home;
