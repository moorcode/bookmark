/* eslint-disable no-undef */

const render = function () {
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
  $('#root').html(root);
};

const handleCreate = function () {
  $('.js-form').on('click', '.js-create-button', function (event) {
    event.preventDefault();
    $('.js-create-button').toggleClass('cancel').html('Cancel');
    const createForm = 
      `<form class="create-form js-create-form">
        <label>Title:</label>
        <input class="titleInput" type="text"/>
        <label>URL:</label>
        <input class="urlInput" type="text" placeholder="www.address.com"/>
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

const displayRating = function () {
  $('.js-form').on('change', '.ratingInput', function () {
    const currentRating = $('.ratingInput').val();
    let starRating = [];
    for (let i = 0; i < currentRating; i++) {
      starRating.push('<i class="fas fa-star"></i>');
    }
    $('.js-star-rating').html(starRating);
  });

};

const bindEventListeners = function () {
  render();
  handleCreate();
  handleCancel();
  handleSubmit();
  displayRating();
  // handleItemCheckClicked();
  // handleDeleteItemClicked();
  // handleEditShoppingItemSubmit();
  // handleToggleFilterClick();
};

// This object contains the only exposed methods from this module:
export default {
  bindEventListeners
};