import $ from 'jquery';
import '../styles/index.css';
import bookmark from './bookmark.js';
import api from './api';
import store from './store';

const main = function () {
  api.getBookmarkList().then((bookmarkList) => {
    for (let i = 0; i < bookmarkList.length; i++) {
      store.createBookmark(bookmarkList[i]);
    }
    bookmark.render();
  });
  bookmark.eventHandlers();
};

$(main);