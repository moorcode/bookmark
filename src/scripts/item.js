function validateForm(title, url) {
  if (title === ''){
    throw new TypeError('Title must not be blank');
  }
  if (url === ''){
    throw new TypeError('URL must not be blank');
  }
}

const create = (title, url, description, rating) => {
  return {
    id: cuid(),
    title: title,
    url: url,
    description: description,
    rating: rating
  };
};

export default {
  validateForm,
  create
};