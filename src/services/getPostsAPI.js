import { primaryApiUrl } from '../static/apiUrls';

const getPosts = (start, limit) => fetch(`${primaryApiUrl}/posts`)
  .then(response => response.json());

export default getPosts;
