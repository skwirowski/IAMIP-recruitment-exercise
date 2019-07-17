const getPosts = (start, limit) => fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`).then(
  response => response.json(),
);

export default getPosts;
