import store from './store';

const generateRoot = function () {
  return `
    <section class="form js-form">
      <button class="createButton js-create-button">Create New Bookmark</button>
      <div class="create-form-div js-create-form-div"></div>
      <select class="filterInput js-filter-rating" id="filter-rating">
        <option value='0' ${(store.storeData.filter === '0') ? 'selected' : ''}>No Filter</option>
        <option value='5' ${(store.storeData.filter === '5') ? 'selected' : ''}>&#8902  &#8902  &#8902  &#8902  &#8902</option>
        <option value='4' ${(store.storeData.filter === '4') ? 'selected' : ''}>&#8902  &#8902  &#8902  &#8902</option>
        <option value='3' ${(store.storeData.filter === '3') ? 'selected' : ''}>&#8902  &#8902  &#8902</option>
        <option value='2' ${(store.storeData.filter === '2') ? 'selected' : ''}>&#8902  &#8902</option>
        <option value='1' ${(store.storeData.filter === '1') ? 'selected' : ''}>&#8902</option>        
      </select>
      <ul class="bookmark-list js-bookmark-list">
        <li class="empty js-empty">Create a bookmark to display here</li>
      </ul>
    </section>`;
};

const generateBookmarkForm = function () {
  return `<form class="create-form js-create-form">
  <label for="title">Title:</label>
  <input class="titleInput js-title-input" type="text" id="title" required />
  <label for="url">URL:</label>
  <input class="urlInput js-url-input" type="url" placeholder="http://www.example.com" id="url" required />
  <label for="description">Description:</label>
  <textarea class="descriptionInput js-description-input" id="description"></textarea>
  <label class="starRating js-current-star-rating hidden">Rating</label>
  <span class="starRating js-current-star-rating"><i class="fas fa-star"></i></span>
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

const generateBookmarkElement = function (item) {
  let starRating = [];
  for (let i = 0; i < item.rating; i++) {
    starRating.push('<i class="fas fa-star"></i>');
  }
  const edit = '<i class="fas fa-pencil-alt"></i>';
  const trash = '<i class="fas fa-trash"></i>';

  let bookmark = `
      <li class="bookmark-element js-bookmark-element" data-item-id="${item.id}">
        <span class="condensed">
          <label class="titleElement js-title-element" aria-label="titleElement">${item.title}</label>
          <label class="starRatingElement js-star-rating" aria-label="starRatingElement">${starRating.join(' ')}</label> 
          <label class="descriptionElement js-description-element hidden" aria-label="descriptionElement">${item.desc}</label>
          <label class="urlElement js-url-element hidden" aria-label="urlElement"><a href="${item.url}" target="_blank">Click to visit</a></label>
          <span class="bookmarkControls js-bookmark-controls hidden">
            <button class="editButton js-edit-button">${edit}</button>
            <button class="deleteButton js-delete-button">${trash}</button>
          </span>
        </span>
      </li>`;
           
  if (item.rating >= store.storeData.filter) {
    return `${bookmark}`;
  }
};

const generateBookmarkListString = function (bookmarkList) {
  const items = bookmarkList.map((item) => generateBookmarkElement(item));
  return items.join('');
};

const generateEditForm = function (item) {
  let starRating = [];
  for (let i = 0; i < item.rating; i++) {
    starRating.push('<i class="fas fa-star"></i>');
  }
  const edit = '<i class="fas fa-pencil-alt"></i>';
  const trash = '<i class="fas fa-trash"></i>';
  
  return `
  <li class="bookmark-element js-bookmark-element" data-item-id="${item.id}">
    <span class="condensed">
      <label class="titleElement js-title-element">${item.title}</label>
      <label class="starRatingElement js-star-rating">${starRating.join(' ')}</label> 
      <label class="descriptionElement js-description-element hidden">${item.desc}</label>
      <label class="urlElement js-url-element hidden"><a href="#item.url}" target="_blank">${item.url}</a></label>
      <form class="bookmarkControls js-bookmark-controls hidden"
        <label for="js-edit-button"></label>
        <button class="editButton js-edit-button" name="js-title-element">${edit}</button>
        <label for="js-delete-button"></label>
        <button class="deleteButton js-delete-button" name="js-delete-button">${trash}</button>
      </form>
    </span>
  </li>`;
};

export default {
  generateRoot,
  generateBookmarkListString,
  generateBookmarkForm,
  generateStarRating, 
  generateEditForm
};
