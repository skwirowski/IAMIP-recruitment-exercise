import { secondaryApiUrl } from '../static/apiUrls';

const getEmail = () => fetch(`${secondaryApiUrl}/?inc=email`)
  .then(response => response.json());

export default getEmail;
