const storeData = {
  bookmarkList: [],
  adding: false,
  error: null,
  filter: 0
};

const setError = function (value) {
  storeData.error = value;
};

const createBookmark = function (formData) {
  const bookmark = {
    isDetailed: false,
    inEditMode: false
  };
  storeData.bookmarkList.push(Object.assign(formData, bookmark));
};

const findAndDelete = function (id) {
  let index = storeData.bookmarkList.findIndex(item => item.id === id);
  storeData.bookmarkList.splice(index, 1);
};

function findAndUpdate(id, updateData) {
  let parsedData = JSON.parse(updateData);

  let foundItem = findBookmarkById(id);
  let index = storeData.bookmarks.findIndex(bookmark => bookmark.id === id);
  let mergedData = Object.assign(foundItem, parsedData);
  storeData.bookmarks.splice(index, 1, mergedData);
} 

function findBookmarkById(id) {
  let foundItem = storeData.bookmarks.find(bookmark => bookmark.id === id);
  return foundItem;
}

export default {
  storeData,
  setError,
  createBookmark,
  findAndDelete,
  findAndUpdate,
  findBookmarkById
};