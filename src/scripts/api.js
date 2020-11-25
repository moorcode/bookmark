const BASE_URL = "https://thinkful-list-api.herokuapp.com/christina/bookmarks";

const listApiFetch = function (...inputs) {
  let error;
  return fetch(...inputs)
    .then((response) => {
      if (!response.ok) {
        error = true;
      }
      return response.json();
    })
    .then((data) => {
      if (!error) {
        return data;
      } else {
        return data;
      }
    });
};

const getBookmarkList = function () {
  return listApiFetch(`${BASE_URL}`);
};

const addBookmark = function (bookmarkData) {
  return listApiFetch(`${BASE_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: bookmarkData,
  });
};

const updateBookmark = function (id, updateData) {
  return listApiFetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: updateData,
  });
};

const deleteBookmark = function (id) {
  return listApiFetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
};

export default {
  getBookmarkList,
  addBookmark,
  deleteBookmark,
  updateBookmark,
};
