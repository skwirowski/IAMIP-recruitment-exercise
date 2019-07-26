const newNumber = 9;
const exampleArray = [1, 2, 3, 4, 5, 6, 7];

export const addNumberToArray = (num, array) => {
  const checkForDuplicates = array.indexOf(num);
  const newArray = array;

  if (checkForDuplicates === -1) {
    newArray.push(num);
  }

  return newArray;
};

export const placeholder = () => 5;
