/* eslint-disable no-unused-vars */
import $ from 'jquery';
import '../styles/index.css';
import bookmark from './bookmark.js';
import store from './store.js';
import item from './item.js';

const main = function () {
  bookmark.bindEventListeners();
  bookmark.render();
};

$(main);