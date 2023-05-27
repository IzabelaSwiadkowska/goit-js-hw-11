/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { Notify } from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';

async function fetchImages(inputValue, page) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: '36775906-ed808f9769460bb0dab61703f',
        q: inputValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: page,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export { fetchImages };
