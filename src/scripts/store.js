/* eslint-disable no-console */
import item from './item';

const items = [];

const addItem = function (title, url, description, rating) {
  try {
    item.validateForm(title, url);
    this.items.push(item.create(title, url, description='', rating));
  }
  catch (error) {
    console.log(`Cannot add item: ${error.message}`);
  }
};

const findById = function (id) {
  let item = this.items.find(item => item.id === id);
  return item;
};


export default {
  items,
  addItem,
  findById,
};
  