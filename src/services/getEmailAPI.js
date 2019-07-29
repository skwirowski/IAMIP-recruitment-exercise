import { secondaryApiUrl } from '../static/apiUrls';

const getEmail = () => fetch(`${secondaryApiUrl}/?inc=email&nat=au,ca,gb,ie,us`)
  .then(response => response.json());

export default getEmail;
