/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';
import { fetchImages } from './js/fetchImages';
import { renderGallery } from './js/renderGallery';

const simpleLightBox = new SimpleLightbox('.gallery a');
const input = document.querySelector('#search-form input');
const searchBtn = document.querySelector('#search-button');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

let page = 1;
btnLoadMore.style.display = 'none';

function clearGallery() {
  gallery.innerHTML = '';
}

searchBtn.addEventListener('click', e => {
  e.preventDefault();
  clearGallery();
  const inputValue = input.value.trim();
  if (inputValue !== '') {
    fetchImages(inputValue, page).then(images => {
      if (images.data.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderGallery(images.data.hits).then(() => {
          Notify.success(`Hooray! We found ${images.data.totalHits} images.`);
          btnLoadMore.style.display = 'block';
          simpleLightBox.refresh();
        });
      }
    });
  }
});
btnLoadMore.addEventListener('click', e => {
  page += 1;
  const inputValue = input.value.trim();
  if (inputValue !== '') {
    fetchImages(inputValue, page).then(images => {
      if (images.data.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderGallery(images.data.hits).then(() => {
          Notify.success(`Hooray! We found ${images.data.totalHits} images.`);
          btnLoadMore.style.display = 'block';
          simpleLightBox.refresh();
        });
      }
    });
  }
});
function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
