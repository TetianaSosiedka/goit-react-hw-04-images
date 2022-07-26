import Container from './App.styled';

import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SearchApi } from '../../api/SearchApi.jsx';

import Searchbar from 'components/Searchbar';
import ButtonComponent from 'components/Button';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

export const App = () => {
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPege] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImg, setCurrentImg] = useState([]);
  const [showModal, setShowModal] = useState(false);

  //--------------------useEffect--------------------------------
  useEffect(() => {
    setPege(1);
  }, [name]);

  useEffect(() => {
    if (!name) {
      return;
    }
    setIsLoading(true);
    SearchApi(name, page)
      .then(({ hits, totalHits }) => {
        setTotalHits(totalHits);
        if (page === 1) {
          setImages([...hits]);
          return;
        }
        setImages(prev => [...prev, ...hits]);
      })
      .catch(error =>
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      )
      .finally(() => setIsLoading(false));
  }, [name, page]);

  useEffect(() => {
    if (images.length > totalHits) {
      toast('No more pictures for your request!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [totalHits, images.length]);

  //---------------------------------------------------

  const hendleLoadMore = () => {
    setPege(page + 1);
  };

  const getSearchName = name => {
    setName(name);
  };

  const hendleOupenModal = event => {
    setShowModal(true);
    setCurrentImg([event.target.alt, event.target.dataset.modal]);
  };

  const hendleCloseModal = () => {
    setShowModal(false);
  };

  const currentImgTag = currentImg[0];
  const currentImgLink = currentImg[1];

  return (
    <>
      <Searchbar onSubmit={getSearchName} />

      <Container onClick={hendleOupenModal}>
        <ImageGallery images={images} />

        {isLoading && <Loader />}
      </Container>

      {totalHits > images.length > 0 && !isLoading && (
        <ButtonComponent onLoadMore={hendleLoadMore}>Load more</ButtonComponent>
      )}

      {showModal && (
        <Modal onClouse={hendleCloseModal}>
          <img src={currentImgLink} alt={currentImgTag} />
        </Modal>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <ToastContainer />
    </>
  );
};
