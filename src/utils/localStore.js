import { VERSION, APP_NAME } from 'src/conf'

import fakeLocalStorage from './localStoreFake'
// Example of how to use it
if (typeof window.localStorage === 'object') {
  // Safari will throw a fit if we try to use localStorage.setItem in private browsing mode.
  try {
    localStorage.setItem('localStorageTest', 1)
    localStorage.removeItem('localStorageTest')
  } catch (e) {
    fakeLocalStorage()
  }
}
else {
  // Use fake localStorage for any browser that does not support it.
  fakeLocalStorage()
}

const getKey = (key) => key + '_' + APP_NAME

export function save(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  localStorage.setItem(getKey(key), val)
}

export function get(key, needJSON = true) {
  let val = localStorage.getItem(getKey(key))
  if (val && needJSON && val !== 'undefined') {
    val = JSON.parse(val)
  }
  return val
}

export function remove(key) {
  localStorage.removeItem(getKey(key))
}

export function isNewVersion() {
  const VERSION_NAME = 'VERSION'
  const ver = get(VERSION_NAME, false)
  if (ver === VERSION) return

  localStorage.clear()
  save(VERSION_NAME, VERSION)
}
