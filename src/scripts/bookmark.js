/* eslint-disable no-undef */
import store from './store';
import item from './item.js';

const generateItemElement = function (item) {
  let bookmark = `
      <li class="bookmark-element" data-item-id="${item.id}">
        <form class="js-edit>
          <label>Title:</label>
          <input class="titleInput js-title-input" type="text" value="${item.title}">
          <label>URL:</label>
          <input class="urlInput js-url-input" type="text" placeholder="www.address.com" value="${item.url}">
          <label>Description:</label>
          <textarea class="descriptionInput js-description-input">${item.description}</textarea>
          <label class="star-rating js-star-rating"><i class="fas fa-star"></i></label>
        </form>  
        <button class="delete js-delete">
          <span class="button-label">delete</span>
        </button>
      </li>`;

  return `
  ${bookmark}`;
};

const render = function () {
  let items = [...store.items];
  const root = `
    <header class="main">
      <h1>Bookmark List</h1>
    </header>
    <main >
      <section class="form js-form">
        <button class="create-button js-create-button">Create New Bookmark</button>
        <div class="create-form-div js-create-form-div"></div>
        <ul class="bookmark-list js-bookmark-list">
          <li class="empty js-empty">Create a bookmark to display here</li>
        </ul>
      </section>
    </main>`;
  const bookmarkItemsString = generateBookmarkItemsString(items);
  $('#root').html(root);
  if (items.length !== 0) {
    $('.js-bookmark-list').html(bookmarkItemsString);
  }  
};

const handleCreate = function () {
  $('.js-form').on('click', '.js-create-button', function (event) {
    event.preventDefault();
    $('.js-create-button').toggleClass('cancel').html('Cancel');
    const createForm = 
      `<form class="create-form js-create-form">
        <label for="title">Title:</label>
        <input class="titleInput" type="text" name="title" required>
        <label for="url">URL:</label>
        <input class="urlInput" type="text" placeholder="www.address.com" name="url" required>
        <label>Description:</label>
        <textarea class="descriptionInput"></textarea>
        <label class="star-rating js-star-rating"><i class="fas fa-star"></i></label>
        <select class="ratingInput">
          <option class="option" >1</option>
          <option class="option">2</option>
          <option class="option">3</option>
          <option class="option">4</option>
          <option class="option">5</option>
        </select>
        <button class="js-submit">Add Bookmark</button>
      </form>`;
    $('.js-create-form-div').html(createForm).slideDown();
  });
};

const handleCancel = function () {
  $('.js-form').on('click', '.cancel', function () {
    $('.cancel').toggleClass('cancel');
    $(this).html('Create New Bookmark');
    $('.js-create-form-div').slideUp();
  });
};

const handleSubmit = function () {
  $('.js-form').on('click', '.js-submit', function (event) {
    event.preventDefault();
    const newTitle = $('.titleInput').val();
    const newUrl = $('.urlInput').val();
    const newDescription = $('.descriptionInput').val();
    const newRating = $('.ratingInput').val();
    store.addItem(newTitle, newUrl, newDescription, newRating);
    render();
  });
};

const handleRating = function () {
  $('.js-form').on('change', '.ratingInput', function () {
    const currentRating = $('.ratingInput').val();
    let starRating = [];
    for (let i = 0; i < currentRating; i++) {
      starRating.push('<i class="fas fa-star"></i>');
    }
    $('.js-star-rating').html(starRating);
  });
};

const generateBookmarkItemsString = function (bookmarkList) {
  const items = bookmarkList.map((item) => generateItemElement(item));
  return items.join('');
};



const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.js-item-element')
    .data('item-id');
};

/**
 * Responsible for deleting a list item.
 * @param {string} id 
 */

const handleDelete = function () {
  $('.js-bookmark-list').on('click', '.js-item-delete', event => {
    const id = getItemIdFromElement(event.currentTarget);
    store.findAndDelete(id);
    render();
  });
};


const bindEventListeners = function () {
  handleCreate();
  handleCancel();
  handleSubmit();
  handleRating();
  handleDelete();
};

export default {
  render,
  bindEventListeners
};