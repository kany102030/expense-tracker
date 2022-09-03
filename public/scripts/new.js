Date.prototype.toDateInputValue = (function () {
  let local = new Date(this);
  // local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
});

const dateInput = document.querySelector('.record-date')
dateInput.value = new Date().toDateInputValue()