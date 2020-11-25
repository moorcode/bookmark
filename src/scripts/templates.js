const generateRoot = function () {
  return `
    <section class="form js-form">
      <button class="createButton js-create-button">Create New Bookmark</button>
      <div class="create-form-div js-create-form-div"></div>
      <ul class="bookmark-list js-bookmark-list">
        <li class="empty js-empty">Create a bookmark to display here</li>
      </ul>
    </section>`;
};

const generateError = function (message) {
  return `
      <section class="error-message">
        <p>${message}</p>
        <button class="close-error">Close</button>
      </section> 
    `;
};

const generateBookmarkListString = function (bookmarkList) {
  const items = bookmarkList.map((item) => generateBookmarkElement(item));
  return items.join('');
};

const generateBookmarkElement = function (item) {
  let starRating = [];
  for (let i = 0; i < item.rating; i++) {
    starRating.push('<i class="fas fa-star"></i>');
  }

  let bookmark = `
      <li class="bookmark-element js-bookmark-element" data-item-id="${item.id}">
        <span class="condensed">
          <label class="titleElement js-title-element">${item.title}</label>
          <label class="starRatingElement js-star-rating">${starRating.join(' ')}</label> 
          <label class="urlElement js-url-element hidden" type="text">${item.url}</label> 
          <label class="descriptionElement js-description-element hidden">${item.desc}</label>
          <button class="deleteButton js-delete-button hidden">Delete</button>
        </span>
      </li>`;
           
  return `
  ${bookmark}`;
};

const generateBookmarkForm = function () {
  return `<form class="create-form js-create-form">
  <label for="title">Title:</label>
  <input class="titleInput js-title-input" type="text" name="title" required />
  <label for="url">URL:</label>
  <input class="urlInput js-url-input" type="url" placeholder="http://www.example.com" name="url" required />
  <label for="description">Description:</label>
  <textarea class="descriptionInput js-description-input" name="description"></textarea>
  <label class="starRating js-current-star-rating"><i class="fas fa-star"></i></label>
  <select class="ratingInput js-rating-input">
    <option class="option" >1</option>
    <option class="option">2</option>
    <option class="option">3</option>
    <option class="option">4</option>
    <option class="option">5</option>
  </select>
  <button class="submitButton js-submit-button">Add Bookmark</button>
</form>`;
};

const generateStarRating = function (currentRating) {
  let starRating = [];
  for (let i = 0; i < currentRating; i++) {
    starRating.push('<i class="fas fa-star"></i>');
  }
  return starRating;
};
export default {
  generateError,
  generateRoot,
  generateBookmarkListString,
  generateBookmarkForm,
  generateStarRating
};
