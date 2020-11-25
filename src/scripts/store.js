const storeData = {
  bookmarkList: [],
  adding: false,
  error: null,
  errorMessage: '',
  filter: 0
};

const createBookmark = function (formData) {
  const bookmark = {
    isDetailed: false,
    inEditMode: false
  };
  storeData.bookmarkList.push(Object.assign(formData, bookmark));
};

const findBookmarkById = function (id) {
  let foundItem = storeData.bookmarkList.find((item) => item.id === id);
  return foundItem;
};

const findAndUpdateBookmark = function (id, updateData) {
  let parsedData = JSON.parse(updateData);
  let foundItem = findBookmarkById(id);
  let index = storeData.bookmarkList.findIndex(item => item.id === id);
  let mergedData = Object.assign(foundItem, parsedData);
  storeData.bookmarkList.splice(index, 1, mergedData);
};

const toggleIsDetailed = function (id) {
  let foundItem = findBookmarkById(id);
  foundItem.isDetailed = !foundItem.isDetailed;
};

const toggleInEditMode = function (id) {
  let foundItem = findBookmarkById(id);
  foundItem.inEditMode = !foundItem.inEditMode;
};

const findAndDelete = function (id) {
  let index = storeData.bookmarkList.findIndex(item => item.id === id);
  storeData.bookmarkList.splice(index, 1);
};

const setError = function (value) {
  storeData.error = value;
};

export default {
  storeData,
  setError,
  createBookmark,
  findAndDelete,
  toggleIsDetailed,
  toggleInEditMode,
  findAndUpdateBookmark
};