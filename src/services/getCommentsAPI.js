import { primaryApiUrl } from '../static/apiUrls';

const getComments = id => fetch(`${primaryApiUrl}/comments?postId=${id}`)
  .then(response => response.json());

export default getComments;
