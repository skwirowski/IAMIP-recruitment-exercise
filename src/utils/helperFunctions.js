export const sliceArrayPiece = (array, start, end) => {
  const endIndex = start + end;
  const newArray = array.slice(start, endIndex);
  return newArray;
};

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

export const setCommentsToPost = (post, comments) => {
  const newObject = post;

  for (let i = 0; i < comments.length; i += 1) {
    if (newObject.id === comments[i].postId) {
      newObject.comments.push(comments[i]);
    }
  }
  return newObject;
};

export const func = (array1, array2) => {
  const postsArray = array1;
  const commentsArray = array2;
  postsArray.map((item) => {
    for (let i = 0; i < commentsArray.length; i += 1) {
      if (item.id === array2[i].postId) {
        item.comments.push(array2[i]);
        commentsArray.splice(i, 1);
        i = -1;
      }
    }
  });
  return postsArray;
};
