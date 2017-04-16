export function collectFromArray(array, callback, initialValue = {}) {
  iterateArray(array, (value, index) => {
    callback(initialValue, value, index, array);
  });

  return initialValue;
}

export function findInArray(array, callback) {
  for (let i = 0, length = array.length; i < length; i++) {
    const value = array[i];

    if (callback(value, i, array)) {
      return {
        key: i,
        value
      };
    }
  }
}

export function iterateArray(array, callback) {
  for (let i = 0, length = array.length; i < length; i++) {
    callback(array[i], i, array);
  }
}

export function removeArrayElem(array, elem) {
  const index = array.indexOf(elem);

  if (index !== -1) {
    array.splice(index, 1);
  }
}

export function toObjectKeys(array) {
  return collectFromArray(array, addKey);
}

function addKey(vars, variable) {
  vars[variable] = true;
}
