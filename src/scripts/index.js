import $ from 'jquery';
import '../styles/index.css';

const handleSubmit = function () {
  $('.js-create-form').on('click', function (event) {
    event.preventDefault();
    const newItemName = $('.js-bookmark-entry').val();
    $('.js-book-entry').val('');
    store.addItem(newItemName);
    render();
  });
};

const handleCreate = function () {
  $('.js-create').on('click', function (event) {
    console.log('hello')
    event.preventDefault();
    const createForm = 
      `<form class="create-form js-create-form">
        <label>Title:</label>
        <input class="titleInput" type="text"/>
        <label>URL:</label>
        <input class="urlInput" type="text" placeholder="www.address.com"/>
        <label>Description:</label>
        <textarea class="descriptionInput"></textarea>
        <label class="rating"><i class="fas fa-star"></i></label>
        <select class="ratingInput">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <button class="js-submit">Add Bookmark</button>
      </form>`;
    $('.js-create-form-div').html(createForm).slideToggle(); //slideToggle gides div first :(
  });
};

const bindEventListeners = function () {
  handleCreate();
  handleSubmit();
  // handleItemCheckClicked();
  // handleDeleteItemClicked();
  // handleEditShoppingItemSubmit();
  // handleToggleFilterClick();
};

const main = function () {
  bindEventListeners();
};

$(main);