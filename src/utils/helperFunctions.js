const newNumber = 9;
const exampleArray = [1, 2, 3];

const objArr = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
];

export const setNumberToArray = (num, array) => {
  const checkForDuplicates = array.indexOf(num);
  const newArray = array;

  if (checkForDuplicates === -1) {
    newArray.push(num);
  } else {
    newArray.splice(checkForDuplicates, 1);
  }

  return newArray;
};

export const placeholder = (array, ids) => (
  array.map(item => (
    (ids.indexOf(item.id) === -1) ? { ...item, isChecked: true } : item
  ))
);

// console.log(placeholder(objArr, exampleArray));
