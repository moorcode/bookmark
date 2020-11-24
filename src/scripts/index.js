/* eslint-disable no-unused-vars */
import $ from 'jquery';
import '../styles/index.css';
import bookmark from './bookmark.js';


const main = function () {
  bookmark.render();
  bookmark.bindEventListeners();
};

$(main);