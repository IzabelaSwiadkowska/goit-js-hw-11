/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-return */
/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-duplicates */
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/fetchImages';

const input = document.querySelector('#search-form input');
const searchBtn = document.querySelector('#search-button');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
const simpleLightBox = new SimpleLightbox('.gallery a');

let page = 1;
function clearGallery() {
  gallery.innerHTML = '';
  page = 1;
  btnLoadMore.style.display = 'none';
}

async function renderGallery(images) {
  const markup = await images
    .map(image => {
      return `<div class="photo-card">
    <a href="${image.largeImageURL}">
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br>${image.likes}
    </p>
    <p class="info-item">
      <b>Views</b><br> ${image.views}
    </p>
    <p class="info-item">
      <b>Comments</b><br>${image.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b><br>${image.downloads}
    </p>
  </div>
</div>`;
    })
    .join('');
  gallery.innerHTML = markup;
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
        renderGallery(images.data.hits);
        Notify.success(`Hooray! We found ${images.data.total} images.`);
        btnLoadMore.style.display = 'block';
        simpleLightBox.refresh();
      }
    });
  }
});
