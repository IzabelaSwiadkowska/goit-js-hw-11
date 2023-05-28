/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';
import { fetchImages } from './fetchImages';
import { renderGallery } from './renderGallery';

const simpleLightBox = new SimpleLightbox('.gallery a');
const input = document.querySelector('#search-form input');
const searchBtn = document.querySelector('#search-button');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

btnLoadMore.style.display = 'none';
let page = 1;
let totalPages;

function clearGallery() {
  gallery.innerHTML = '';
}
function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

searchBtn.addEventListener('click', async e => {
  try {
    e.preventDefault();
    clearGallery();
    btnLoadMore.style.display = 'none';
    const inputValue = input.value.trim();
    if (inputValue === '') {
      Notify.info('This filed cannot be empty. Please enter someting');
    }
    if (inputValue !== '') {
      await fetchImages(inputValue, page).then(images => {
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
  } catch (error) {
    console.log(error.toString());
  }
});

btnLoadMore.addEventListener('click', async e => {
  try {
    btnLoadMore.style.display = 'block';
    page += 1;
    const inputValue = input.value.trim();
    if (inputValue !== '') {
      await fetchImages(inputValue, page).then(images => {
        totalPages = Math.ceil(images.data.totalHits / 40);
        renderGallery(images.data.hits).then(() => {
          Notify.success(`Hooray! We found ${images.data.totalHits} images.`);
          simpleLightBox.refresh();
          smoothScroll();
        });

        if (page === totalPages) {
          btnLoadMore.style.display = 'none';
          Notify.info(
            "We're sorry, but you've reached the end of search results.",
            { timeout: 8000, position: 'center-bottom' }
          );
        }
      });
    }
  } catch (error) {
    console.log(error.toString());
  }
});
