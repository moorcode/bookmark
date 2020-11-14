import $ from 'jquery';

import '../styles/index.css';
import api from './api';

const handleNewClicked = function () {
  $('form').on('submit', event => {
    event.preventDefault();
    $('.main').addClass('hidden');
    $('.hidden').removeClass('hidden');
  });
};

const handleSubmit = function () {
  $('form').on('submit', event => {
    event.preventDefault();
    const title = $('.js-title').val();
    const url = $('.js-url').val();
    const description = $('.js-description').val();
    const rating = $('.js-rating').val();
    console.log(title, url, description, rating);
  });
};

const displayResults = function () {
  $('.js-item-list').append(``);
};

const main = function () {
  displayResults();
  handleNewClicked();
  handleSubmit();
};

$(main);