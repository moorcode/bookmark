import item from './item.js';

const items = [];
const hideCheckedItems = false;


const addItem = function (field) {
  try {
    item.validateField(field);
    this.items.push(item.create(name));
  }
  catch (error) {
    console.log(`Cannot add item: ${error.message}`);
  }
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

const findAndDelete = function (id) {
  const index = this.items.findIndex(item => item.id === id);
  this.items.splice(index, 1);
};

const toggleCheckedFilter = function () {
  this.hideCheckedItems = !this.hideCheckedItems;
};

export default {
  items,
  hideCheckedItems,
  findById,
  addItem,
  findAndToggleChecked,
  findAndUpdateName,
  findAndDelete,
  toggleCheckedFilter
};
  