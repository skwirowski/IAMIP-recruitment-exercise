const getPosts = (start, end) => fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${end}`).then(
  response => response.json(),
);

export default getPosts;
