import item from './item.js';

const items = [];
const hideCheckedItems = false;

const addItem = function (title, url, description, rating) {
  try {
    item.validateForm(title, url);
    this.items.push(item.create(title, url, description='', rating));
  }
  catch (error) {
    console.log(`Cannot add item: ${error.message}`);
  }
};

const findAndDelete = function (id) {
  const index = this.items.findIndex(item => item.id === id);
  this.items.splice(index, 1);
};

const findById = function (id) {
  let item = this.items.find(item => item.id === id);
  return item;
};

const findAndToggleChecked = function (id) {
  const currentItem = this.findById(id);
  currentItem.checked = !currentItem.checked;
};

const findAndUpdateName = function (id, newName) {
  try {
    item.validateName(newName);
    const currentItem = this.findById(id);
    currentItem.name = newName;
  }
  catch (error) {
    console.log(`Cannot update name: ${error.message}`);
  }
};

const toggleCheckedFilter = function () {
  this.hideCheckedItems = !this.hideCheckedItems;
};


export default {
  addItem,
  items,
  hideCheckedItems,
  findById,
  findAndToggleChecked,
  findAndUpdateName,
  findAndDelete,
  toggleCheckedFilter
};
  