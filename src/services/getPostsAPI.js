import { primaryApiUrl } from '../static/apiUrls';

const getPosts = (start, limit) => fetch(`${primaryApiUrl}/posts?_start=${start}&_limit=${limit}`)
  .then(response => response.json());

export default getPosts;
