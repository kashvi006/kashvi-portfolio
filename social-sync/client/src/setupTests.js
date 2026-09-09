import "@testing-library/jest-dom";

const storage = {};

const localStorageMock = {
  getItem(key) {
    return Object.prototype.hasOwnProperty.call(storage, key)
      ? storage[key]
      : null;
  },

  setItem(key, value) {
    storage[key] = String(value);
  },

  removeItem(key) {
    delete storage[key];
  },

  clear() {
    Object.keys(storage).forEach((key) => {
      delete storage[key];
    });
  },

  get length() {
    return Object.keys(storage).length;
  },

  key(index) {
    return Object.keys(storage)[index] || null;
  },
};

Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  writable: true,
  configurable: true,
});