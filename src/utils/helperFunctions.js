export const sliceArrayPiece = (array, start, end) => {
  const endIndex = start + end;
  const newArray = array.slice(start, endIndex);
  return newArray;
};

export const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

export const calculatePagesNumber = array => (
  (array.length < 10) ? 1 : Math.ceil(array.length / 10)
);

export const sortNumbersInAscendingOrder = (array, objectKey) => (
  [...array].sort((a, b) => a[objectKey] - b[objectKey])
);

export const sortNumbersInDescendingOrder = (array, objectKey) => (
  [...array].sort((a, b) => b[objectKey] - a[objectKey])
);

export const sortStringsInAscendingOrder = (array, objectKey) => [...array].sort((a, b) => {
  const valueA = a[objectKey].toUpperCase();
  const valueB = b[objectKey].toUpperCase();
  if (valueA < valueB) {
    return -1;
  }
  if (valueA > valueB) {
    return 1;
  }
  return 0;
});

export const sortStringsInDescendingOrder = (array, objectKey) => [...array].sort((a, b) => {
  const valueA = a[objectKey].toUpperCase();
  const valueB = b[objectKey].toUpperCase();
  if (valueA > valueB) {
    return -1;
  }
  if (valueA < valueB) {
    return 1;
  }
  return 0;
});
