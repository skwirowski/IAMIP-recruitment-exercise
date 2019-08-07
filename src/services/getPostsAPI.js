import { primaryApiUrl } from '../static/apiUrls';

const getPosts = () => fetch(`${primaryApiUrl}/posts`)
  .then(response => response.json());

export default getPosts;
