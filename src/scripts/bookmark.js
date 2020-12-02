import $ from 'jquery';
import store from './store';
import api from './api';
import templates from './templates';

const render = function () {
  renderError();
  let bookmarkList = [...store.storeData.bookmarkList];
  const root = templates.generateRoot();
  const bookmarkListString = templates.generateBookmarkListString(bookmarkList);
  $('#root').html(root);
  if (bookmarkList.length > 0) {
    $('.js-bookmark-list').html(bookmarkListString);
  } 

};

const renderError = function () {
  if (store.storeData.error) {
    const errorElement = templates.generateError(store.storeData.errorMessage);
    $('.js-error-container').html(errorElement);
  } else {
    $('.js-error-container').empty();
  }
};

const renderForm = function () {
  const bookmarkForm = templates.generateBookmarkForm();
  $('.js-create-button').toggleClass('cancel');
  $('.js-create-button').html('Cancel');
  $('.js-create-form-div').html(bookmarkForm).slideDown();
};

const renderRating = function () {
  const currentRating = $('.ratingInput').val();
  let starRating = templates.generateStarRating(currentRating);
  $('.js-current-star-rating').html(starRating);
};

const renderCancelForm = function () {
  $('.cancel').toggleClass('cancel');
  $('.js-create-button').html('Create New Bookmark');
  $('.js-create-form-div').slideUp();
};

const renderDetailed = function (event) {
  $(event.currentTarget).closest('.condensed').toggleClass('condensed detailed');
  $(event.currentTarget).find('.hidden').toggleClass('hidden');
};

const renderCondensed = function (event) {
  $(event.currentTarget).find('.js-url-element').toggleClass('hidden');
  $(event.currentTarget).find('.js-description-element').toggleClass('hidden');
  $(event.currentTarget).find('.js-bookmark-controls').toggleClass('hidden');
  $(event.currentTarget).toggleClass('detailed condensed');
};

const handleCloseError = function () {
  $('main').on('click', '#close-error', () => {
    store.setError(false);
    renderError();
  });
};

const handleCreate = function () {
  $('body').on('click', '.js-create-button', function () {
    renderForm();
  });
};

const handleCancel = function () {
  $('body').on('click', '.cancel', function () {
    renderCancelForm();
  });
};

const handleRate = function () {
  $('body').on('change', '.ratingInput', function () {
    renderRating();
  });
};

const handleSubmit = function () {
  $('body').on('submit', '.js-create-form', function (event) {
    event.preventDefault();
    const newTitle = $('.js-title-input').val();
    const newUrl = $('.js-url-input').val();
    const newDescription = $('.js-description-input').val();
    const newRating = $('.js-rating-input').val();    
    
    let newBookmark = {
      title: newTitle,
      url: newUrl,
      desc: newDescription,
      rating: newRating
    };
    
    newBookmark = JSON.stringify(newBookmark);
    api.addBookmark(newBookmark)
      .then((data) => {
        if (data.message) {
          store.setError(true);
          renderError();
        } else {
          store.setError(null);
          store.createBookmark(data);
          store.storeData.adding = !store.storeData.adding;
          render();
        }
      })
      .catch(() => {
        renderError();
      });
  });
};

const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.js-bookmark-element')
    .data('item-id');
};

const handleDetailed = function () {
  $('body').on('click', '.condensed', function (event) {
    renderDetailed(event);    
  });
};

const handleCondensed = function () {
  $('body').on('click', '.detailed', function (event) {
    renderCondensed(event);
  });
};

const handleEdit = function () {
  $('body').on('click', '.js-edit-button', function (event) {
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    const newTitle = $('.js-title-input').val();
    const newUrl = $('.js-url-input').val();
    const newDescription = $('.js-description-input').val();
    const newRating = $('.js-rating-input').val();    
    let updateData = {
      title: newTitle,
      url: newUrl,
      desc: newDescription,
      rating: newRating
    };
    api.updateBookmark(id, updateData)
      .then(() => {
        store.findAndUpdate(id);
        render();
      })
      .catch(() => {
        renderError();
      });
  });
};

const handleDelete = function () {
  $('body').on('click', '.js-delete-button', function (event) {
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    api.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch(() => {
        renderError();
      });
  });
};

const handleFilter = function () {
  $('body').on('change', '.js-filter-rating', function () {
    let filter = $('.js-filter-rating').val();
    store.storeData.filter = filter;
    render();
  });
};

const eventHandlers = function () {
  handleCloseError();
  handleCreate();
  handleCancel();
  handleRate();
  handleSubmit();
  handleDetailed();
  handleCondensed();
  handleEdit();
  handleDelete();
  handleFilter();
};

export default {
  render,
  renderForm,
  renderCancelForm,
  renderRating,
  renderDetailed,
  renderCondensed,
  eventHandlers
};