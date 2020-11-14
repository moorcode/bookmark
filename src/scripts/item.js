function validateField(field) {
  if (field === ''){
    throw new TypeError('Field must not be blank');
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
  validateField,
  create
};