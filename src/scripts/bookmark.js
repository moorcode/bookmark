import store from './store';
import item from './item.js';

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

const generateBookmarkItemsString = function (bookmarkList) {
  const items = bookmarkList.map((item) => generateItemElement(item));
  return items.join('');
};

const generateItemElement = function (item) {
  let starRating = [];
  for (let i = 0; i < item.rating; i++) {
    starRating.push('<i class="fas fa-star"></i>');
  }

  let bookmark = `
      <li class="bookmark-element js-bookmark-element" data-item-id="${item.id}">
        <span class="condensed">
          <label class="titleInput js-title-element">${item.title}</label>
          <label class="js-star-rating">${starRating}</label> 
        </span>
      </li>`;
           
  return `
  ${bookmark}`;
};

const handleCreate = function () {
  $('body').on('click', '.js-create-button', function (event) {
    event.preventDefault();
    $('.js-create-button').toggleClass('cancel').html('Cancel');
    const createForm =
      `<form class="create-form js-create-form">
        <label for="title">Title:</label>
        <input class="titleInput js-title-input" type="text" name="title" required />
        <label for="url">URL:</label>
        <input class="urlInput js-url-input" type="text" placeholder="www.address.com" name="url" required />
        <label>Description:</label>
        <textarea class="descriptionInput js-description-input"></textarea>
        <label class="star-rating js-current-star-rating"><i class="fas fa-star"></i></label>
        <select class="ratingInput">
          <option class="option" >1</option>
          <option class="option">2</option>
          <option class="option">3</option>
          <option class="option">4</option>
          <option class="option">5</option>
        </select>
        <button class="submit-button js-submit">Add Bookmark</button>
      </form>`;

    $('.js-create-form-div').html(createForm).slideDown();
  });
};

const handleCancel = function () {
  $('body').on('click', '.cancel', function () {
    $('.cancel').toggleClass('cancel');
    $(this).html('Create New Bookmark');
    $('.js-create-form-div').slideUp();
  });
};

const handleRating = function () {
  $('body').on('change', '.ratingInput', function () {
    const currentRating = $('.ratingInput').val();
    let starRating = [];
    for (let i = 0; i < currentRating; i++) {
      starRating.push('<i class="fas fa-star"></i>');
    }
    $('.js-current-star-rating').html(starRating);
  });
};

const handleSubmit = function () {
  $('body').on('click', '.js-submit', function (event) {
    event.preventDefault();
    const newTitle = $('.js-title-input').val();
    const newUrl = $('.js-url-input').val();
    const newDescription = $('.js-description-input').val();
    const newRating = $('.ratingInput').val();
    store.addItem(newTitle, newUrl, newDescription, newRating);
    render();
  });
};

const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.js-bookmark-element')
    .data('item-id');
};

const handleDetailed = function () {
  let starRating = [];
  for (let i = 0; i < item.rating; i++) {
    starRating.push('<i class="fas fa-star"></i>');
  }
  $('body').on('click', '.condensed', function () {
    let detailed = `
          <input class="titleInput js-title-element" type="text" value="${item.title}">
          <label class="js-star-rating">${starRating}</label> 
          <input class="urlInput js-url-element" type="text" value="${item.url}">
          <textarea class="descriptionInput js-description-input">${item.description}</textarea>
          <button class="delete js-delete">Delete</button>`;
    $('.js-bookmark-element').html(detailed);
  });
};

/**
 * Responsible for deleting a list item.
 * @param {string} id 
 */

const handleDelete = function () {
  $('body').on('click', '.js-delete', function (event) {
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    store.findAndDelete(id);
    render();
  });
};


const bindEventListeners = function () {
  handleCreate();
  handleCancel();
  handleRating();
  handleSubmit();
  handleDelete();
  handleDetailed();
};

export default {
  render,
  bindEventListeners
};