// check if there any data store in local storage
function HasProperty(propertyName) {
  return localStorage.getItem(propertyName) ? true : false;
}
export { HasProperty };
