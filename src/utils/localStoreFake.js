export default function fakeLocalStorage() {
  var fakeLocalStorage = {}
  var storage

  if (window.Storage && window.localStorage) {
    storage = window.Storage.prototype
  }
  else {
    // We don't bother implementing a fake Storage object
    window.localStorage = {}
    storage = window.localStorage
  }

  // For older IE
  if (!window.location.origin) {
    window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
  }

  var dispatchStorageEvent = function(key, newValue) {
    var oldValue = (key == null) ? null : storage.getItem(key) // `==` to match both null and undefined
    var url = location.href.substr(location.origin.length)
    var storageEvent = document.createEvent('StorageEvent') // For IE, http://stackoverflow.com/a/25514935/1214183

    storageEvent.initStorageEvent('storage', false, false, key, oldValue, newValue, url, null)
    window.dispatchEvent(storageEvent)
  }

  storage.key = function(i) {
    var key = Object.keys(fakeLocalStorage)[i]
    return typeof key === 'string' ? key : null
  }

  storage.getItem = function(key) {
    return typeof fakeLocalStorage[key] === 'string' ? fakeLocalStorage[key] : null
  }

  storage.setItem = function(key, value) {
    dispatchStorageEvent(key, value)
    fakeLocalStorage[key] = String(value)
  }

  storage.removeItem = function(key) {
    dispatchStorageEvent(key, null)
    delete fakeLocalStorage[key]
  }

  storage.clear = function() {
    dispatchStorageEvent(null, null)
    fakeLocalStorage = {}
  }
}